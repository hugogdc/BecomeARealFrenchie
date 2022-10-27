const express = require('express');
const cookieParser  = require('cookie-parser');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { json } = require('express');
const app = express();


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
app.post('/signup', async (req, res) => {
    console.log(req.body);
    try{
        const salt = bcrypt.salt()
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
        //if email exist then :
        var sql = `select exists(select iduser from user where (password = '${req.body.password}' and email = '${req.body.email}'));`;
        console.log(sql);
        con.query(sql, function (err, result){
            if(err) throw err;
            else {
                JSON.parse(JSON.stringify(result));
                console.log(result);
            }
        });

        // var sql2 = `select iduser from user where (password = '${hashedPassword}');`;
        // console.log(sql2);
        // con.query(sql2, function (err, result){
        //     if(err) throw err;
        //     else console.log("result 2 : " + JSON.stringify(result));
        // });
        // bcrypt.compare(req.body.password, result, function(err, res) {
        //     if (err){
        //       // handle error
        //     }
        //     if (res) {
        //       // Send JWT
        //     } else {
        //       // response is OutgoingMessage object that server response http request
        //       return response.json({success: false, message: 'passwords do not match'});
        //     }
        //   });

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

