const multer = require('multer');  //By using multer we can upload file
const path = require('path');      
const csv = require('csv-parser');  //By using csv-parser, we can convert the data into JSON format
const fs = require('fs');
const filesUploaded = [];        //This Array contains the data of all uploaded files

//Setuping Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../','/uploads'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
  });

//By using below function we can get only (.csv) files and upload accordingly
function fileStrainer (req, file, cb) {

    if(file.mimetype == 'text/csv'){
        cb(null,true);
    }
    else{
        console.log("It is not a CSV File");
        cb(null,false);
    }
  }

const upload = multer({storage:storage,fileStrainer:fileStrainer}).single('uploaded_file');  //Here we are initiallizing Multer

//Here the file that is uploaded is sent to uploads folder
module.exports.upload = function(req,res){
    upload(req,res,function(err){
        if(err instanceof multer.MulterError){
            console.log("Multer is showing ErRor!!..",err);
            return;
        }
        else if(err){
            console.log('..Multer is showing ErRor!!',err);
            return;
        }
        else if(req.file){
            filesUploaded.push(req.file.filename);
        }
        return res.redirect('back');
    });
}

//Here we can export Array
module.exports.filesUploaded = function(){
  return filesUploaded;
}

//Here we can view csv file and display it in tabular format
module.exports.view = function(req,res){
  const csvParsedData = [];              //Here the array data is stored in JSON format
  const index = req.query.index;
  fs.createReadStream(path.join(__dirname,'../','/uploads',filesUploaded[index])) //Here the file path is setting up for uploading
  .pipe(csv())
  .on('data', (data) => csvParsedData.push(data))
  .on('end', () => {
    return res.render('table',{
  
      csvData: csvParsedData
    });
  });
}

//for deleting a particular csv file
module.exports.delete = function(req,res){
  let index = req.query.index;
  try { var files = fs.readdirSync(path.join(__dirname,'..','/uploads')); }
    catch(e) { return; }
    if (files.length > 0){
        var filePath = path.join(__dirname,'..','/uploads',filesUploaded[index]);
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
    }
    filesUploaded.splice(index,1);
    return res.redirect('back');
}