const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
router.get('/',homeController.home);    //It is used to route for HomeScreen

router.use('/file',require('./file'));  //It will be able to route for all other files related to it 

module.exports = router;