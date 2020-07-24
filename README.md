# First Catering Ltd API

This is a NodeJS project using Mongoose and Express to build a REST API that connects to a MongoDB database. Unit tested using Jest, Mockingoose and Postman. Manual tests also carried out using Postman.

In order to get a more detailed understanding of what is required by each API endpoint, refer to the swagger docs provided within the documentation file. 

## To run the database container

Download .tar file provided in email. In order to run container, please read: https://docs.docker.com/engine/reference/commandline/load/

Once you have successfully loaded the container, you will be able to run it using the command:

`docker start first-catering-db`

To check this is working, run `docker ps` and you will see the Mongo image associated with the container 'first-catering-db'.

## To run API

The API is set up to run on `localhost:4301`. In order to set up this port, 

Run `npm start` after `npm install` (if you have newly downloaded the project)

If this has been successful you will receive two messages in the command line 'Successfully connected to database' followed by 
'Listening on port: 4301'. You are now set up to make calls to the database. 

## To stop the database container

NOTE: This will cause errors when trying to call API when database container has been stopped

`docker stop first-catering-db`

Alternatively, stop the container named _chihuahauBox_db_ from Kitematic.

## To stop API

NOTE: This will cause errors when trying to call API when connection has been stopped.

In order to stop the API's from running, close the terminal that you first used to start it. You will see it has ended as you will no longer receive outputs from nodemon. You are able to shut down the command by pressing `ctrl c`

## To run tests

Run `npm test`

This command will kick off Jest testing, the output from the tests will be displayed in the same terminal as the initial command was run. 