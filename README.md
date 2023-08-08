# Demo Application using OpenText Risk Guard and Capture API Services
This is a sample application showcasing Risk Guard Service and Capture Service on the OpenText Developer Cloud, and the use of a Relational Database (mySQL) to store extracted contents.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). This was combined with the OpenText IM Services API.

## This sample application demonstrates 3 main capabilities: 
 1. Using Risk Guard Service to identify PII information in a document
 2. Using Capture Service to extract all the relevant data from a document
 3. Using a local database (mySQL) to load extracted data into a relational database

## Deploying the Application
There are 3 parts to the setup:

### 1. Application Code - Deploying the application code and installing Node.js libraries.
  1. Download the code from https://github.com/imaas-wynder/RiskGuard+Capture_Demo_OT_IM
  2. Download and install the latest LTS version of Node.js from https://nodejs.org/. (You can also use Node Version Manager to manage multiple versions of Node). This sample application was built on Node version 18.16.0
  3. In the application root folder install the node libraries using the command 
	```npm install```
  4. Based on the dependencies listed in package.json, this npm install command will also install the following libraries used by this application 
	```express, axios, mysql2, webpack, webpack-cli, webpack-node-externals, @babel/core, @babel/preset-env, @babel/preset-react, and babel-loader```

### 2. Database – Installing mySQL database and creating the 2 tables used by the application.
  1. Download and install mySQL Server (Community Edition) 8.0 or later by going to https://dev.mysql.com/downloads/. 
  2. During installation, make note of the port (default is 3306), and create a new user with DB Admin role (make note of the user name and password).
  3. Use a client program like MySQL Workbench to run the following database scripts included in the db_scripts folder
	```
	create_database_imservicesdb.sql
	create_table_lab_reports.sql
	create_table_lab_report_pathogens.sql
	```
### 3. Core Capture - ‘Lab Report Information Extraction’ profile in Core Capture
  1. A ‘Lab Report Information Extraction’ profile has been added as one of the default profiles in Core Capture. You can use it to run information extraction on the sample lab report ‘DNA Stool Analysis’ provided with this demo application.
  2. In addition to using APIs to execute information extraction on a document, you can also do so using the Core Capture web application (https://na-1-dev.api.opentext.com/capture).
  3. Any time a new document type is introduced into Core Capture, the AI engine requires training to identify all the fields in the document. Prior to using the Capture Service in this demo, it is advised to use the web application to run a few iterations of data extraction on the lab report.


## Running the Application
 1. Before you run the application, update the properties.js file located in the src sub-folder.

 2. Client-side application: To run the client-side application, open a command line (terminal) and type the following command in the application root folder.
	```npm start```
    Running this command will also open the application frontend in your default web browser.

 3. Server-side application: To compile and run the server-side application, open another command line (terminal) and run the following commands from the application root folder.
	```
	npm run build:server
	npm run start:server
	```

## Interacting with the Application
This demo application has 4 sections:

 1. The first section allows you to fetch the Access Token from the OpenText Developer Cloud using the credentials in the properties.js file. 

 2. The second section uses Risk Guard API Service to identify any PII in the uploaded file. A sample file called lab-report.pdf has been provided in the application package to use for this service.
  * The first step is to select the file
  * The next step is to use the Risk Guard Service to process the file and identify PII
  * The final step is to display the PII data identified in the file

 3. The third section uses the Capture Service to extract data from a Lab Report (lab-report.pdf).
  * Again the first step is to select the file
  * The next step is to upload the file to the Capture Service staging area and obtain a file id.
  * The final step is to use the Capture Service to classify the uploaded file and extract the data from the Lab Report. This service is resource intensive so it can take a few seconds to extract all the data. You will see the extracted data in the text field provided.

 4. The last section is to upload the extracted lab report data into a local database. For this demo application we are using mySQL database. The “Send Data To Database” option will call the server-side application to insert the data into two database tables. After you receive a success message, you can query the database for the records.
