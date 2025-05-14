Instructions to run the website application

1. Ensure NodeJS and npm are installed
2. Download a zip of this repository if you have not already, unzip to your preferred location.  
3. Run mysql-installer-web-community-8.0.42.0.msi to setup and install mysql.  At a minium install MySQL server, the other features are not required.
4. During the installation of mysql, be sure to set a password for the root user and save this. 
5. Once installed its time to build the database.  In the file ".env" use a text editor to change the DB_PASSWORD parameter to the root password you set earlier. Please also add an ADMIN ROOT and ADMIN PASS as you will need these to login to the admin later. 
6. Open a command prompt in the directory that all of the files have been unzipped to.
7. Run the command: Node build.js
8. Once the build program ends Run the command: Node server.js 
9. This starts up the server. The provided link in the console is used to access the admin portions of the app
10. Now to visit the website use the link: http://fahim-alam1.github.io/pc_management/
11. The application should now be running!


Instructions for deployment will depend on the database, server, and domain options that the client would like to purchase.  Further details will be found along these resources,
and future contact with the software engineers can be made to create steps towards these deployments.  
