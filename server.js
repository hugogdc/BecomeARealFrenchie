const express = require('express');
const cookieParser  = require('cookie-parser');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();
const jsonData= require('./public/data.json'); 


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.static('public'));



// Create connection to our AWS RDS mySQL Database
const con = mysql.createConnection({
    host : 'frenchiedb.ckyp42t7iyjr.us-west-2.rds.amazonaws.com',
    user : 'Root',
    password : 'rrroooooottt',
    database: 'frenchiedb'
})
// connect to the database
con.connect((err) => {
    if (err) throw err;
    console.log('AWS mySQL Database connected !');
})



// serve the index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "html", "index.html"));
    console.log();
});
app.get('/module3', (req, res) => {
    res.sendFile(path.join(__dirname, "html", "module3.html"));
    console.log();
});
app.get('/getFact', function(req, res){
    console.log(req.query);
    var reqJson = req.query.number;
    var x = Math.floor(Math.random() * jsonData.data.length);
    console.log(x);
    var result = jsonData.data[x].fact;
    console.log("Sending : " + result);
    console.log("button pressed");
    res.send(JSON.stringify(result));
});


// signup
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "html", "signup.html"))
});
app.post('/signup', async (req, res) => {
    console.log(req.body);
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    }catch{
    }
    res.status(200);
});


// login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "html", "login.html"))
});
app.post('/login', (req, res) => {
    console.log(req.body);
    try{
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        let sql = `select iduser from user where (password = '${hashedPassword}');`;
        console.log("")
        console.log(sql);
        con.query(sql, function (err, result){
            if(err) throw err;
            else console.log(result);
        });
    }catch{
        res.redirect("/login");
    }
    res.redirect("/login");

});


// MySQL
app.get('/dbquery', (req, res) => {
    let sql = 'select * from user';
    con.query(sql, function (err, result){
        if (err)throw err;
        
    });
    res.send(result);
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





var port = 3000;
app.listen(port, function(){
    console.debug("Server listening in port : " + port);
})

