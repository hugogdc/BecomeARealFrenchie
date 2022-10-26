var express = require('express');
var app = express();
const path = require("path");
const port = 3000;

//app.use(express.static('public'));

const jsonData= require('./data.json'); 

app.get('')
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/getFact', function(req, res){
    console.log(req.query);
    var reqJson = req.query.number;
    var x = Math.floor(Math.random() * jsonData.data.length);
    var result = "";
    result += jsonData.data[i].fact;

        //result+= 'Fact: ' + (i+1) + ' "' + jsonData.data[i].fact + '",\n';
    console.log("Sending : " + result);
    res.send(JSON.stringify(result));
});

app.listen(port, function(){
    console.log(`Example app listening on port ${port}!`);
});