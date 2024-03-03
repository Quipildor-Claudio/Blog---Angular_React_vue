var validator = require('validator');
var Article = require('../models/article');
const article = require('../models/article');
const fs = require('fs');
const path = require('path');

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
    },
    upload: (req, res) => {
        const file_name_err = 'Imagen no subida ...'
        //console.log(req.files)
        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        let file_path = req.files.file0.path;
        let file_split = file_path.split('/');
        let file_name = file_split[2];

        let ext_split = file_name.split('\.');
        let file_ext = ext_split[1];

        if (file_ext != 'png' && file_ext != 'jng' && file_ext != 'jpeg' && file_ext != 'gif') {
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es válida !!!'
                });
            });


        } else {
            let articleId = req.params.id;



            Article.findByIdAndUpdate({ _id: articleId }, { image: file_name }, { new: true })
                .then((articleUpdated) => {
                    if (!articleUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen de articulo !!!'
                        });
                    }
                    return res.status(200).send({
                        status: 'success',
                        article: articleUpdated
                    });
                });



        }


    },
    getImage:(req,res)=>{
        let file = req.params.image;
        let path_file = './upload/articles/'+file;
        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status: 'error',
                    message:'La imagen no existe !!'
                });
            }
        });
        
    }


};


module.exports = controller;