// Importing express module 
const express = require("express");
const app = express();
const session = require('express-session');
const mysql = require('mysql2')
const path = require('path');
const fs = require('node:fs');
const cors = require('cors');

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


app.post("/athlete_data",(req, res) => {
    const name = req.query.name;
    const need = req.query.need;
    filePath = "athlete_pages/athlete_data/" + name + "/" + name + "_" + need + ".txt";
    body = req.body.info;
    fs.writeFile("athlete_pages/athlete_data/" + name + "/" + name + "_" + need + ".txt",body,err => {
    		if (err){
    		    console.log("failed to save file")
    			console.error(err);
    			return
    		}
    		console.log("File Saved");
    		res.send("File Saved");
    });
});


const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '41740722Gh0.',
	database : 'players_club'
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