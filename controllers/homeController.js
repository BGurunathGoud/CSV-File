const fileController = require('./fileController');

const filesUploaded = fileController.filesUploaded;
const array = filesUploaded();   //This array contains uploaded CSV file names

module.exports.home = function(req,res){
    return res.render('home',{
        files: array
    });
}
