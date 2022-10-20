const express = require('express');
const path = require("path");
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "module1.html"));
    console.log();
});
app.get('/module1.htm/?', (req, res) => {
    res.sendFile(path.join(__dirname, "module1.html"));
    console.log();
});
app.get('/module1.js', (req, res) => {
    res.sendFile(path.join(__dirname,"module1.js"))
    
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, "style.css"));
    console.log();
});


var port = 3010;
app.listen(port, function(){
    console.debug("Server listening in port : " + port);

})