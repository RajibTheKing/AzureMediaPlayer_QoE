
const express = require('express')
var cors = require('cors')
const bodyParser = require("body-parser")


const app = express()
const port = 3010


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/statistics', (req, res) => {
  //console.log("req.body: ", req.body);
  let current_bitratechanged = req.body.data.bitratechanged;
  let current_bufferstats = req.body.data.bufferstats;
  current_bufferstats.forEach(element => {
    console.log(element);
  });

  let ans = {
    TOO_MANY_BITRATE_SWITCHES : isTooManyBitrateSwitches(current_bitratechanged),
    TOO_MANY_BUFFERING: isTooManyBuffering(current_bufferstats),
  }

  console.log("Warning Calculation: ", ans);
  res.send(ans);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function isTooManyBitrateSwitches(bitrateChangedTimestamps)
{

  if (bitrateChangedTimestamps.length < 3) {
    return false;
  }

  let slidingWindow = [];

  slidingWindow.push(bitrateChangedTimestamps[0]);
  slidingWindow.push(bitrateChangedTimestamps[1]);
  slidingWindow.push(bitrateChangedTimestamps[2]);
  if (slidingWindow[2] - slidingWindow[0] <= 10 * 1000 /*10seconds*/) {
    return true;
  }
  let i = 3;
  for (i; i < bitrateChangedTimestamps.length; i++) {
    slidingWindow = slidingWindow.splice(1);
    slidingWindow.push(bitrateChangedTimestamps[i]);
    console.log(slidingWindow);
    if (slidingWindow[2] - slidingWindow[0] <= 10 * 1000 /*10seconds*/) {
      return true;
    }
  }

  return false;


}



function isTooManyBuffering(bufferstats)
{

  let slidingWindow = [];
  let i = 0;

  for (i; i < bufferstats.length; i++) {
    if(bufferstats[i].duration >= 1000 /*1 second*/){
      return true;
    }

    if(slidingWindow.length < 4){
      if(bufferstats[i].duration >= 500){
        slidingWindow.push(bufferstats[i].startTime);
      }

      if(slidingWindow.length == 4){
        if(slidingWindow[3] - slidingWindow[0] >= 30 * 1000 /*30Seconds*/){
          return true;
        }
      }

    }else{
      if(bufferstats[i].duration >= 500){
        slidingWindow = slidingWindow.splice(1);
        slidingWindow.push(bufferstats[i].startTime);
      }
      
      if(slidingWindow[3] - slidingWindow[0] >= 30 * 1000 /*30Seconds*/){
        return true;
      }
    }
  }

  return false;
}

