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


app.get('/user', (req, res) => {
    console.log(req.cookies.email);
    res.sendFile(path.join(__dirname, "html", "user.html"));
});
app.get('/user/data', (req, res) => {
    var sql = `select iduser from user where (email = '${req.cookies.email}' and password = '${req.cookies.password}');`;
        console.log(sql);
        try {
            var email = req.cookies.email;
            var password = req.cookies.password;
            var lvl = 0;
                var sql = `select * from lvlscore where iduser = (select iduser from user where (email = '${email}' and password = '${password}'));`;
                con.query(sql, function (err, result){
                    if (err) console.log(err);
                    if (result == ""){
                        lvl = 1
                    }
                    else{
                        lvl = 1
                        for (i = 0; i<result.length; i++){
                            console.log("\nlvlscore "+i+" : \n" + JSON.stringify(result[i]));
                            if (result[i].modulenumber == 1){
                                if (result[i].score == 100 && lvl <= result[i].lvlnumber){
                                    lvl = result[i].lvlnumber;
                                }
                            }
                        }
                        console.log("lvl number : " + lvl)
                        // get module1lvl where lvlnumber = highestLvl
                    }    
                res.json({"module1" : lvl, "module2" : null, "module3" : null});
                });   

        } catch (error) {
            console.log(error)
        }
    });



app.get('/module3', (req, res) => {
    res.sendFile(path.join(__dirname, "html", "module3.html"));
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
    res.sendFile(path.join(__dirname, "html", "module1.html"));
});
app.get('/module1/data', (req, res) => {
    var email = req.cookies.email;
    var password = req.cookies.password;
    var lvl = 0;
    try {
        var sql = `select * from lvlscore where iduser = (select iduser from user where (email = '${email}' and password = '${password}'));`;
        con.query(sql, function (err, result){
            if (err) console.log(err);
            if (result == ""){
                //create new lvlscore row with lvlnumber = 1 and scoe = 0
                sql = `insert into lvlscore (modulenumber, lvlnumber, iduser) values (1, 1, (select iduser from user where (email = '${req.cookies.email}' and password = '${req.cookies.password}')));`
                console.log(sql);
                con.query(sql, function (err, result2){
                    if(err)console.log(err);
                    console.log(result2[0]);
                });
                lvl = 1
            }
            else{
                lvl = 1
                for (i = 0; i<result.length; i++){
                    console.log("\nlvlscore "+i+" : \n" + JSON.stringify(result[i]));
                    if (result[i].modulenumber == 1){
                        if (result[i].score == 100 && lvl <= result[i].lvlnumber){
                            lvl = result[i].lvlnumber;
                        }
                    }
                }
                console.log("lvl number to send : " + lvl)
                // get module1lvl where lvlnumber = highestLvl
                
            }
            if(lvl !=0){
                sql = `select idioms from module1lvl where (idmodule1lvl = ${lvl});`;
                con.query(sql, function (err, result3){
                    if (err) console.log(err);
                    res.json(result3)
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
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
                    res.cookie("pseudo", req.body.name)
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
    var email = req.body.email;
    var password = req.body.password;
    try{
        //if email exist then :
        var sql = `select password, pseudo, iduser from user where (email = '${email}');`;
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
                const pseudo = JSON.parse(JSON.stringify(result[0])).pseudo;
                console.log(password , hashedPassword)
                if(bcrypt.compareSync(password, hashedPassword)){
                    res.cookie("pseudo", pseudo)
                    res.cookie("logedin", true);
                    res.cookie("email", req.body.email);
                    res.cookie("password", hashedPassword);
                    res.redirect("/");
                    return;
                }
                else res.redirect("/login"); 
            }
        });

    }catch{
        res.redirect("/login");
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

