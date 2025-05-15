Instructions to run the website application

The website and the backend have already been deployed using free resources

Backend and admin access:
https://players-server.vercel.app/login

Website access:
https://fahim-alam1.github.io/pc_management/


For client deployment this will be changed depending on the domain, and database that the client chooses to rent.  

If you would like to deploy the website using the same method as us the you will need to create accounts for the following services:
GitHub: Having an account will expedite the services below
Vercel: This will be the hosting service that hosts the backend features and api
Clever Cloud: This is the hosting service that we used for the database. 

Once those accounts are made you will need to fork one of our two github repositories  into your personal github (they have been split up to make it easier for your deployment).

Fork this github (it will be used in Vercel): https://github.com/gjhollmann/players_server.git
(if you would like the following github contains the entire source code https://github.com/Fahim-Alam1/pc_management ) 

Then in Clever Cloud dashboard, along the left side you will follow this path:
+ Create
	an add-on
		MySQL
			Choose based on space requirements and price
				Choose the closest server and name the add on players_club
You will now have access to your database dashboard. 
Save the Host, Database Name, User, and Password settings securely, you will need them later on Vercel

Next you will need to configure your database.  While in the dashboard, on the top click on PHPMyAdmin (it will take a second to load)
On the left side of the PHPMyAdmin select the topmost option(It will match the Database Name that you saved earlier)
Go into the SQL tab and follow these instructions
Copy and Paste the following: 
CREATE TABLE IF NOT EXISTS admin_users (username varchar(20), password varchar(20))
Hit Go

Copy and Paste the following:
CREATE TABLE IF NOT EXISTS athletes (name varchar(50), intro varchar(1028),school varchar(50), weight varchar(20), hometown varchar(20), class varchar(20), height varchar(20), interests varchar(112), sport varchar(50), positional_profile varchar(10), body varchar(112), hit varchar(224), power varchar(112), arm varchar(112), defense varchar(112), athletic_testing varchar(112))
Hit Go

For the following replace the question marks with the username and password that you would like to use for your admin site, you would use this same command to add more later.  You will need to surround these inputs in single quotation marks. The first question mark is for the username and the second is for the password

INSERT INTO admin_users VALUES (‘?’, ‘?’)

example
INSERT INTO admin_users VALUES ('admin', 'pass')
Hit Go

Next Copy and Paste the following:
INSERT INTO athletes (`name`,`intro`,`school`,`weight`,`hometown`,`class`,`height`,`interests`,`sport`,`positional_profile`,`body`,`hit`,`power`,`arm`,`defense`,`athletic_testing`) VALUES ('Amos Aguilera','Amos Aguilera is a 6 1 , 170-pound first baseman from Fontana, CA, with a tall, projectable frame and room to add strength. A multi-sport athlete competing in basketball and wrestling, he brings athleticism, coordination, and toughness to the baseball field. Defensively, he has soft hands, solid footwork, and a strong feel for the glove, making him a reliable presence at first base. His short arm action leads to accurate throws, and with further development—particularly by driving through his target—he can add more velocity.','Jurupa Hills High School','200 lbs','Fontana, CA','Junior (2026)','6 4','Christian/ Believes in the lord, Fitness, WWE, Recovery & Wellness','Baseball/Basketball/Wrestling','1B','6-3, 200 pounds. Strong frame with present strength.','RHH. Slightly open stance that evens out when he strides. Hands rest away from back shoulder. Higher launch angle that produces a lot of fly balls. 64.3 mph bat speed with 12g of rotational acceleration.','89 mph max exit velocity (78 avg.); 339-foot max batted distance. Consistently pulls the ball.','RH. INF - 71.00 mph. Side arm release across the infield.','Calm footwork through the play.','7.55 runner in the 60-yard dash; Long, tall strides.')
Hit Go
Lastly Copy and Paste the following:
INSERT INTO athletes (`name`,`intro`,`school`,`weight`,`hometown`,`class`,`height`,`interests`,`sport`,`positional_profile`,`body`,`hit`,`power`,`arm`,`defense`,`athletic_testing`) VALUES ('Second Athlete','This is the space dedicated to your second athlete','Insert School','20','Insert hometown','class','6 feet','interests','sport','AB','body','hit','power','arm','defense','test')
Hit Go

And that is your database, initialized and set up!

We can now leave clever bot (as long as you have the details of the database from before saved) and move on to Vercel.

For Vecel I highly recommend logging in with your GitHub.  This will expedite the process.

Deploy a new Project named players-server
Import the Git Repository included specifically for Vercel. Do not import the entire source code.  
Next you will need to add the following Environment Variables based on the Saved parameters from the Clever Cloud Database

DB_DATABASE = Database Name
DB_HOST = Host
DB_USER = User
DB_PASSWORD = Password

set these to default or as listed
DB_ADMIN = admin
DB_PASS = pass


And now its deployed!
The website will work on the following links

Backend and admin access: https://players-server.vercel.app/login
Website access: https://fahim-alam1.github.io/pc_management/
