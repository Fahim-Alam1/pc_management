Instructions to run the website application

1. Ensure NodeJS and npm are installed
2. Run mysql-installer-web-community-8.0.42.0.msi to setup and install mysql.  Follow the instructions on this page (https://dev.mysql.com/doc/mysql-getting-started/en/)
      and choose the instructions based on your platform and remembering the setting for the root password. 
3. Once installed its time to build the database.  In the file ".env" use a text editor to change the DB_PASSWORD parameter to the root password you set earlier
4. Open a command prompt in this directory
5. Run the command: Node build.js
6. Once the console says "Build Complete" Run the command: Node server.js
7. This starts up the server. The provided link in the console is used to access the admin portions of the app
8. Now to visit the website use the link: http://fahim-alam1.github.io/pc_management/
9. The application should now be running!


Instructions for deployment will depend on the database, server, and domain options that the client would like to purchase.  Further details will be found along these resources,
and future contact with the software engineers can be made to create steps towards these deployments.  
