const express = require('express');   //Here express is used as a server
const port = process.env.PORT || 7000; 
const path = require('path');
const fs = require('fs');

const app = express();         //Initiallizing express 

app.set('view engine','ejs');  //ejs is been setuped as view engine

app.set('views',path.join(__dirname,'views'));   //Views folder path is setted

app.use(express.urlencoded({extended: true}));  //form data is being read by using these parser

app.use(express.static('assets'));    //static files are accessed by using these assets folder

app.use('/uploads',express.static(__dirname+'/uploads'));   //Uploaded files are accessed by using these uploads folder 


app.use('/',require('./routes/index'));    //Index files in router are used whenever they are required

app.listen(port,function(err){
    if(err){
        console.log("Error!! Express server is not running",err);
        return;
    }
    
    // It is used to delete the every CSV file whenever the server is restarted
    try { var files = fs.readdirSync(path.join(__dirname,'/uploads')); }
    catch(e) { return; }
    if (files.length > 0)
      for (let i = 0; i < files.length; i++) {
        var filePath = path.join(__dirname,'/uploads',files[i]);
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
      }
    console.log("Server is connected and running successfully!! on Port",port);
});