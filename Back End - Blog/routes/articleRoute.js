const express = require('express');

const ArticleController = require('../controllers/articleController');
const router = express.Router();

router.get('/test',ArticleController.test);

router.get('/blogs',ArticleController.getBlogs);
router.get('/blog/:id',ArticleController.getBlog);
router.post('/save',ArticleController.save);
router.put('/update/:id',ArticleController.update);
router.delete('/delete/:id',ArticleController.delete);

module.exports = router;