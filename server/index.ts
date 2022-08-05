
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

  //list of pairs bitratechanged: [{changedtime: number, changebitrate: number}
  let current_bitratechanged = req.body.data.bitratechanged;

  //list of bufferstats: [{startTime: number, duration: number}]
  let current_bufferstats = req.body.data.bufferstats;

  console.log('bitrate changed timestamps: ', current_bitratechanged);
  
  current_bufferstats.forEach(element => {
    console.log(element);
  });

  let ans = {
    TOO_MANY_BITRATE_SWITCHES : isTooManyBitrateSwitches(current_bitratechanged),
    TOO_MANY_BUFFERING: isTooManyBuffering(current_bufferstats),
  }

  console.log("Warning Index: ", ans);
  res.send(ans);
  
})


/*
HIGHEST_BITRATE_POSSIBLE: It warns out if the bitrate chosen by the player is meant for a smaller player frame size
Heuristic Profile:
  1) Hybrid : It takes the width and height of the player into account when switching bitrates. 
  2) HighQuality: It does not take the width and height of the player into account when switching bitrates.
  3) LowLatency: If low latency is not enabled on the stream, this heuristic profile will not yield a latency improvement.
  4) QuickStart: It also takes the width and height of the player into account when switching bitrates.

  Only Hybrid and QuickStart Heuristic profile is responsible for this case
*/

app.post('/selectedbitrate', (req, res) => {
  console.log("selected Bitrate req.body: ", req.body);
  let selectedBitrate = req.body.data.currentbitrate;
  let maxbitratePossible = req.body.data.maxbitrate;
  let profile = req.body.data.selectedprofile;
  
  let highestBitratePossible = false;
  if(profile !== 'HighQuality' && selectedBitrate < maxbitratePossible){
    highestBitratePossible = true;
  }
  let ans = {
    HIGHEST_BITRATE_POSSIBLE : highestBitratePossible,
  }
  console.log("Warning Index: ", ans);
  res.send(ans);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



/*
Detect too many bitrate switches
TOO_MANY_BITRATE_SWITCHES: It warns out if the number of bitrate switches is higher than 2 every 10 secs

//how the algorithm will work
3 7 14 18 27 33 34 48 
slidingwindow: [3][7][17]  initializing window
And then move window forwards
*/

function isTooManyBitrateSwitches(bitrateChangedTimestamps)
{

  if (bitrateChangedTimestamps.length < 3) {
    return false;
  }

  let slidingWindow = [];

  slidingWindow.push(bitrateChangedTimestamps[0].changedtime);
  slidingWindow.push(bitrateChangedTimestamps[1].changedtime);
  slidingWindow.push(bitrateChangedTimestamps[2].changedtime);
  if (slidingWindow[2] - slidingWindow[0] <= 10 * 1000 /*10seconds*/) {
    return true;
  }
  let i = 3;
  for (i; i < bitrateChangedTimestamps.length; i++) {
    slidingWindow = slidingWindow.splice(1);
    slidingWindow.push(bitrateChangedTimestamps[i].changedtime);
    if (slidingWindow[2] - slidingWindow[0] <= 10 * 1000 /*10seconds*/) {
      return true;
    }
  }

  return false;


}


/*
Detect Too Many Bufferings
TOO_MANY_BUFFERING: It warns out if the number of buffering events longer than 500ms is higher than 3 per 30 secs or if there is
any buffering event longer than 1s

//how the algorithm will work
{3, 300},  {7, 503} {18, 786} {33, 300} {34, 877},  {48, 655}, {51, 776}, {55, 568}

Case 1: if any of the buffering >= 1000  then return true
Case 2: if it's >=500 then push into sliding window until window size is 4

slidingwindow: [7][18][33][48]  initializing window by checking buffering time
And then move window forwards
*/


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

