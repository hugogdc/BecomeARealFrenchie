const express = require('express');
const cookieParser  = require('cookie-parser');
const path = require('path');
const mysql = require('mysql');

// Create connection
const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'hugohugothink',
    database : 'webprojecttest'
})

// con.connect((err) => {
//     if(err){
//         throw err;
//     }
//     console.log('mySQL Database connected ! ')
// })

const app = express();


app.use(cookieParser());

// serve the static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "html", "index.html"));
    console.log();
});
app.get('/homeLogo', (req, res) => {
    res.sendFile(path.join(__dirname, "img", "homeLogo.png"));
    console.log();
});
app.get('/accountImg', (req, res) => {
    res.sendFile(path.join(__dirname, "img", "accountImg.png"));
    console.log();
});
app.get('/firstPage', (req, res) => {
    res.sendFile(path.join(__dirname, "img", "firstPage.jpg"));
    console.log();
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, "css", "style.css"))
});
app.get('/script', (req, res) => {
    res.sendFile(path.join(__dirname, "js", "script.js"))
});
app.get('/module1', (req, res) => {
    res.sendFile(path.join(__dirname, "js", "module1.js"))
});
app.get('/module2', (req, res) => {
    res.sendFile(path.join(__dirname, "js", "module2.js"))
});
app.get('/module3', (req, res) => {
    res.sendFile(path.join(__dirname, "js", "module3.js"))
});
app.get('/login', (req, res) => {
    console.log(req.query)
    res.sendFile(path.join(__dirname, "html", "login.html"))
});


// MySQL
app.get('/dbquery', (req, res) => {
    let sql = 'select * from user';
})

// COOKIES
app.get('/set-cookie', (req, res) => {
    res.cookie('user', req.query.user)
    res.send('server set cookies : ' + JSON.stringify(req.cookies))
})
app.get('/get-cookie', (req, res) => {
    console.log(req.cookies);
    res.send('got cookies : ' + JSON.stringify(req.cookies))
})
app.get('/del-cookie', (req, res) => {
    res.clearCookie('user')
    res.send();
})




// serve the json info with the lenght associated to the sent name
// app.get('/getLength', function(req, res) {
//     console.log(req.query);
//     var reqJson = req.query.name;
//     var result = JSON.stringify({name:reqJson, lenght:reqJson.length});
//     console.log("Sending  : " + result);
//     res.send(result);
// });


var port = 3000;
app.listen(port, function(){
    console.debug("Server listening in port : " + port);

})

