
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
  console.log("req.body: ", req.body);   
  res.send(res);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
