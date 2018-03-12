var express= require('express');
var app= express();
var router=express.Router();
var Schema= require('./../model/myschema');
var bodyparser= require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));
//controller of the code
router.post('/',function(req,res){
    var data= new Schema({name:req.body.username,
                            password:req.body.password,
                          age:req.body.age,
                          city:req.body.city,
                          salary:req.body.salary,
                          project:req.body.project});
    
    //insert data
    data.save(function(error,result){
        if(error)
        throw error;
        else
        {
            console.log("current entry is saved successfully.. :",result);
        }
        res.send("Current user:"+result);
    });
    });

   

    module.exports=router;