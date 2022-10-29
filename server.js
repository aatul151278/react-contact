const express = require('express');
const dotenv =require('dotenv');
dotenv.config()
const path = require('path');

const app = express();
app.use(express.static(__dirname + '/build'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});
var port = process.env.PORT || 8000;

app.listen(port,function(){
  console.log("Front started",port)
});