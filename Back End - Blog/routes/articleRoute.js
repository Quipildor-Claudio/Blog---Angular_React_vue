var express = require('express');

var ArticleController = require('../controllers/articleController');
var router = express.Router();

router.get('/test',ArticleController.test);



module.exports = router;