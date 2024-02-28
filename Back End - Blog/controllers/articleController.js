var validator = require('validator');
var Article = require('../models/article');
const article = require('../models/article');
var controller = {

    test: (req, res) => {
        return res.status(200).send({
            menssage: ' TEst Controller'
        });
    },
    getBlogs: (req, res) => {

        try {
            Article.find()
                .then((articles) => {
                    res.status(200).json(
                        {
                            menssage: 'Blogs en base de Datos',
                            blogs: articles
                        }
                    );
                });

        } catch (e) {
            res.status(500).json(
                {
                    menssage: 'Error',
                    error: e
                }
            );
            console.log(e);
        }
    },

    getBlog: (req, res) => {
        const { id } = req.params;
        try {
            Article.findById(id)
                .then((article) => {
                    res.status(200).json(
                        {
                            menssage: 'Blogs by Id',
                            blog: article
                        }
                    );
                });

        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    save: (req, res) => {
        const { title, content, image } = req.body;
        const validate_title = !validator.isEmpty(title);
        const validate_content = !validator.isEmpty(content);
        try {

            if (validate_title && validate_content) {
                const article = new Article({ title, content, image });
                article.save(article);
                return res.status(201).send({
                    status: 'success',
                    article
                });

            }

        } catch (err) {
            return res.status(401).send({
                menssage: 'Faltan datos por enviar'
            });
        }

    },
    update: (req, res) => {
        const { id } = req.params;
        const { title, content, image } = req.body;
        try {
            Article.findByIdAndUpdate(id, { title, content, image }, { new: true })
                .then((article) => {
                    return res.status(200).send({
                        status: 'success',
                        article
                    });

                });

        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }

    },
    delete: (req, res) => {
        const { id } = req.params;
        try {
            Article.findByIdAndDelete(id)
                .then((article) => {
                        return res.status(200).send({
                            status: 'success',
                            article
                        });
                });

        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }


};


module.exports = controller;