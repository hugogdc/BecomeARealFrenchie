const express = require('express');
const cookieParser  = require('cookie-parser');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { json } = require('express');

const { send } = require('process');

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


app.get('/module1', (req, res) => {
    // get the name from the request
    var name = req.query.name; // http://localhost:3000/module1?name=mayeul
    console.log(name);
    // ask the data base for the actual level where the user is
    // get the data for this specific level
    // send back this data (json) with the module1.html
    res.sendFile(path.join(__dirname, "html", "module1.html"));
});
app.post('/module1', (req, res) => {
    // geet the name and the score from the request
    // insert the new score to the database
    res.redirect("/");
});


// signup
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "html", "signup.html"))
});
app.post('/signup', (req, res) => {
    console.log(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    try{
        //if email exist then :
        var sql = `select * from user where (email = '${req.body.email}');`;
        console.log(sql);
        con.query(sql, function (err, result){
            if(result !=""){
                console.log(JSON.parse(JSON.stringify(result[0])).password)
                console.log("this email is already used for an account")
                res.json({message:"this email is already used for an account"});
                return;
            }
            if(err) throw err;
            else {
                const hashedPassword = bcrypt.hashSync(req.body.password, 10);
                let sql = `insert into user (pseudo, email, password) value ('${req.body.name}', '${req.body.email}', '${hashedPassword}');`;
                con.query(sql, function (err, result){
                    if(err)throw err;

                });
                console.log(req.body.password , hashedPassword)
                if(bcrypt.compareSync(req.body.password, hashedPassword)){
                    res.cookie("logedin", true);
                    res.cookie("email", req.body.email);
                    res.cookie("password", hashedPassword);
                    res.redirect("/");
                }          
            }
        });

    }catch{
        res.json("").redirect("/login");
    }
});


// login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "html", "login.html"))
});
app.post('/login', (req, res) => {
    console.log(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    console.log("exemple de hash de mot de passe", hashedPassword);
    try{
        //if email exist then :
        var sql = `select password from user where (email = '${req.body.email}');`;
        console.log(sql);
        con.query(sql, function (err, result){
            if(result ==""){
                console.log("no user associated to the email sent")
                res.json({message:"the email is not associated to an account"});
                return;
            }
            if(err) throw err;
            else { 
                const hashedPassword = JSON.parse(JSON.stringify(result[0])).password;
                console.log(req.body.password , hashedPassword)
                if(bcrypt.compareSync(req.body.password, hashedPassword)){
                    res.cookie("logedin", true);
                    res.cookie("email", req.body.email);
                    res.cookie("password", hashedPassword);
                    res.redirect("/");
                }          
            }
        });

    }catch{
        res.json("").redirect("/login");
    }
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

