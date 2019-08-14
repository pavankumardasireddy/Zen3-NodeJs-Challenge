var express = require("express");
var cors = require('cors');
var app = express();
app.use(cors());
const port = 3002;

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port} `);
});

