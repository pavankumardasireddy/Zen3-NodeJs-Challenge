var express = require("express");
const path = require('path')
const fs = require('fs') 
const envfile = require('envfile')
var cors = require('cors');
var app = express();
app.use(cors());
const port = 3002;

app.get("/getEnvironment/:process", (req, res) => {
  const sourcePath = path.resolve(__dirname, `${req.params.process}/.env`)
  if(sourcePath){
    res.json(envfile.parseFileSync(sourcePath))
  }
  else {
    res.json({"status":"Process name is wrong."})
  }
});

app.get("/setEnvironment/:process/:key/:value", (req, res) => {
  const sourcePath = path.resolve(__dirname, `${req.params.process}/.env`)
  if(sourcePath){
    let parsedFile = envfile.parseFileSync(sourcePath);
    parsedFile[req.params.key] = req.params.value;
    fs.writeFileSync(sourcePath, envfile.stringifySync(parsedFile)); 
    envfile.stringifySync(parsedFile)
    res.json(envfile.parseFileSync(sourcePath));
  }
  else {
    res.json({"status":"Process name is wrong."})
  }
});

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port} `);
});

