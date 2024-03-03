const express = require('express');

const ArticleController = require('../controllers/articleController');
const router = express.Router();

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir:'./upload/articles'})

router.get('/test',ArticleController.test);

router.get('/blogs',ArticleController.getBlogs);
router.get('/blog/:id',ArticleController.getBlog);
router.post('/save',ArticleController.save);
router.put('/update/:id',ArticleController.update);
router.delete('/delete/:id',ArticleController.delete);
router.post('/upload-image/:id',md_upload,ArticleController.upload);
router.get('/get-image/:image',ArticleController.getImage);
router.get('/search/:search',ArticleController.search);


module.exports = router;