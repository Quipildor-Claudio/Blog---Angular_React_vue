var controller={
    
    datosBlog:(req,res)=>{
        return res.status(200).send({
            article:'Hollaaaa'
        });
    },
      
    test:(req,res)=>{
        return res.status(200).send({
            menssage:'Controller'
        });
    }
};


module.exports = controller;