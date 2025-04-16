// Importing express module 
const express = require("express");
const app = express();
const fs = require('node:fs');
const cors = require('cors');
const test =
{
    'name': "Amos Aguilera",
    'Sport': "Baseball/Basketball/Wrestling",
    'Story': "Amos Aguilera is a 6 1 , 170-pound first baseman from Fontana, CA, with a tall, projectable frame and room to add strength. A multi-sport athlete competing in basketball and wrestling, he brings athleticism, coordination, and toughness to the baseball field. Defensively, he has soft hands, solid footwork, and a strong feel for the glove, making him a reliable presence at first base. His short arm action leads to accurate throws, and with further development—particularly by driving through his target—he can add more velocity."
};

app.use(cors())

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
app.get("/amos_aguilera/amos_intro", (req, res) => {
	fs.readFile('athlete_pages/athlete_data/amos_aguilera/amos_aguilera_intro.txt','utf8',(err,data) => {
		if (err){
		    console.log("failed to read file")
			console.error(err);
			return
		}
		console.log(data);
		res.send(data);
	});
}) 


// Server setup 
app.listen(3000, () => {
    console.log("Server is Running"); 
})