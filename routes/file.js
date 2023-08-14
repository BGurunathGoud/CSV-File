const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
router.post('/upload',fileController.upload);   //This router is used to upload new file
router.get('/view',fileController.view);        //This router is used to open the already uploaded file 
router.get('/delete',fileController.delete);    //With this we can delete any particular file

module.exports = router;
