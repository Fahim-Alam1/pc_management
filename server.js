// Importing express module 
const express = require("express");
const app = express();
const session = require('express-session');
const mysql = require('mysql2')
const path = require('path');
const fs = require('node:fs');
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.use(express.json());

// Handling GET / request 
//app.use("/:page", (req, res, next) => {
//    const page = req.params.page
 //   fs.readFile("./"+page+".html", "utf8", (err, html) => {
 //       if(err){
  //          return res.send(page)
  //      }
   //     console.log("page loaded")
   //     return res.send(html)
 //   })
//})

// Handling GET /data request 
/*
app.get("/athlete_data", (req, res) => {
    const name = req.query.name
    const need = req.query.need
	fs.readFile("athlete_pages/athlete_data/" + name + "/" + name + "_" + need + ".txt",'utf8',(err,data) => {
		if (err){
		    console.log("failed to read file")
			console.error(err);
			return
		}
		console.log("Data Sent");
		res.send(data);
	});
})
*/



app.get("/athlete_data",(req,res) => {
    const table = req.query.table
    const name = req.query.name
    const need = req.query.need
   	if (name && need) {
      	connection.query('SELECT ' + need + ' FROM ' + table + ' where name = ?', [name],function(error, results, fields) {
    		if (error) throw error;
    		if (results.length > 0) {
    			console.log(results);
    			res.send(results);
    		}else{
    		    console.log("failed");
    		    res.end();
    		}
    	});
    }else if (name && table){
      	connection.query('SELECT * FROM ' + table +  ' where name = ?', [name],function(error, results, fields) {
    		if (error) throw error;
    		if (results.length > 0) {
    			console.log(results);
    			res.send(results);
    		}else{
    		    console.log("failed");
    		    res.end();
    		}
    	});
    } else if (table){
      	connection.query('SELECT * FROM ' + table,function(error, results, fields) {
        		if (error) throw error;
        		if (results.length > 0) {
        			console.log(results);
        			res.send(results);
        		}else{
        		    console.log("failed");
        		    res.end();
        		}
        	});
    } else {
    res.end();
    }
})


app.post("/athlete_data",(req, res) => {
    var name = req.query.name;
    var need = req.query.need;
    var table = req.query.table;
    var info = "";
    console.log(req.body);
    var obj = req.body;
    for (var key in obj){
        info = obj[key];
        console.log(info);
    }
    console.log("save request recieved");
   	if (name && need && table) {
      	connection.query('UPDATE ' + table + ' SET ' + need + ' = ? WHERE name = ?', [info, name],function(error, results, fields) {
    		if (error) {
    		    res.send("it broke, probably too many characters (make it shorter or ask to upgrade database)");
    		} else if (results) {
    			console.log(results);
    			res.send("success");
    		}else{
    		    console.log("failed");
    		    res.send("failed");
    		}
    	});
    } else {
    console.log("Bad Request");
    res.end();
}});



const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/login
app.get('/login', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM admin_users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				console.log(results);
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

/*If you want to add athletes to database do it in mySQL with (amos is used as an example):
INSERT INTO athletes (name, intro, school, weight, hometown, class, height, interests, sport, positional_profile, body, hit, power, arm, defense, athletic_testing) VALUES
('Amos Aguilera', "Amos Aguilera is a 6\'1\", 170-pound first baseman from Fontana, CA, with a tall, projectable frame and room to add strength. A multi-sport athlete competing in basketball and wrestling, he brings athleticism, coordination, and toughness to the baseball field. Defensively, he has soft hands, solid footwork, and a strong feel for the glove, making him a reliable presence at first base. ",'Jurupa Hills High School', '200 lbs', 'Fontana, CA', 'Junior (2026)', '6\'4','Christian/ Believes in the lord, Fitness, WWE, Recovery & Wellness','Baseball/Basketball/Wrestling','1B','6-3, 200 pounds. Strong frame with present strength.','RHH. Slightly open stance that evens out when he strides. Hands rest away from back shoulder. Higher launch angle that produces a lot of fly balls. 64.3 mph bat speed with 12g of rotational acceleration.','89 mph max exit velocity (78 avg.); 339-foot max batted distance. Consistently pulls the ball.','RH. INF - 71.00 mph. Side arm release across the infield.','Calm footwork through the play.','7.55 runner in the 60-yard dash; Long, tall strides.');
*/


// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.sendFile(path.join(__dirname + '/admin.html'));
		return;
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

// Server setup 
app.listen(3000, () => {
    console.log("Server is Running. Login Page made at http://localhost:3000/login");
})