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

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE players_club", function (err, result) {
    if (err) throw err;
    console.log("Database created");
    con.changeUser({ database: 'players_club' }, (err) => {
        if (err) throw err;
    });
    con.query("CREATE TABLE admin_users (username varchar(20), password varchar(20))",[process.env.DB_DATABASE], function (err, result){
        if (err) throw err;
        console.log("Admin Table created");
    });
    var que = "CREATE TABLE athletes (name varchar(50), intro varchar(1028),school varchar(50), weight varchar(20), hometown varchar(20), class varchar(20), height varchar(20), interests varchar(112), sport varchar(50), positional_profile varchar(10), body varchar(112), hit varchar(224), power varchar(112), arm varchar(112), defense varchar(112), athletic_testing varchar(112)),PRIMARY KEY (name)";
    con.query(que,[process.env.DB_DATABASE], function (err, result){
            if (err) throw err;
            console.log("Athlete Table created");
    });
    con.query("INSERT INTO admin_users (?,?) VALUES",[process.env.ADMIN_ROOT, process.env.ADMIN_PASS], function (err, result){
                if (err) throw err;
                console.log("Admin initialized");
    });
    que = "INSERT INTO athletes (`name`,`intro`,`school`,`weight`,`hometown`,`class`,`height`,`interests`,`sport`,`positional_profile`,`body`,`hit`,`power`,`arm`,`defense`,`athletic_testing`) VALUES ('Amos Aguilera','Amos Aguilera is a 6\'1\", 170-pound first baseman from Fontana, CA, with a tall, projectable frame and room to add strength. A multi-sport athlete competing in basketball and wrestling, he brings athleticism, coordination, and toughness to the baseball field. Defensively, he has soft hands, solid footwork, and a strong feel for the glove, making him a reliable presence at first base. His short arm action leads to accurate throws, and with further development—particularly by driving through his target—he can add more velocity.','Jurupa Hills High School','200 lbs','Fontana, CA','Junior (2026)','6\'4','Christian/ Believes in the lord, Fitness, WWE, Recovery & Wellness','Baseball/Basketball/Wrestling','1B','6-3, 200 pounds. Strong frame with present strength.','RHH. Slightly open stance that evens out when he strides. Hands rest away from back shoulder. Higher launch angle that produces a lot of fly balls. 64.3 mph bat speed with 12g of rotational acceleration.','89 mph max exit velocity (78 avg.); 339-foot max batted distance. Consistently pulls the ball.','RH. INF - 71.00 mph. Side arm release across the infield.','Calm footwork through the play.','7.55 runner in the 60-yard dash; Long, tall strides.')";
    con.query(que,[process.env.DB_DATABASE], function (err, result){
           if (err) throw err;
           console.log("Athlete Amos Initialized");
    });
    que = "INSERT INTO athletes (`name`,`intro`,`school`,`weight`,`hometown`,`class`,`height`,`interests`,`sport`,`positional_profile`,`body`,`hit`,`power`,`arm`,`defense`,`athletic_testing`) VALUES ('Second Athlete','This is the space dedicated to your second athlete','Insert School','20','Insert hometown','class','6 feet','interests','sport','AB','body','hit','power','arm','defense','test')";
    con.query(que,[process.env.DB_DATABASE], function (err, result){
               if (err) throw err;
               console.log("Athlete Second Initialized");
    });
    console.log("Build complete");
  });
});
