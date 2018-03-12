
//depencies
var express= require('express');
var app=express();
var port = 3000;
var path=require('path');
var Schema= require('./model/myschema');
var mongoose= require('mongoose');
var bodyparser= require('body-parser');
var passport= require('passport');
var fs = require('fs');

//mongoose connection
mongoose.connect("mongodb://localhost/employeeSchema");
mongoose.connection.on('connected',function(err,result){
    if(err)
    throw err;
    else
    console.log("DataBase connected ");
});

//server creation
// app.get('/',function(req,res){
//     res.send("server created successfully");
// });

//static path to public directory
app.use(express.static(path.resolve(__dirname+'/views')));
app.use(bodyparser.urlencoded({extended:false}));

//authentication using tokennization
var api=require('./controller/api');
var route=require('./controller/handler');
var loadindexfile= require('./controller/pageloader');


// require('./controller/api.js')(api,passport);
// app.use('./api',api);


//actual routes
// fs.readdirSync('./controller').forEach(function(file){
//     if(file.substr(-3)=='.js'){
//         route=require('./controller/'+file);
//        // var controller1 = require('./controllers/' + controllerName);
//         app.use('/test/submit',route);
//        // app.use('/testApi',route);
//     }

// });

//first load a html page
app.use('/testPage',loadindexfile);
//generate a token for valid user 
app.use('/test/submit',route);
//then save that info of user along with token in schema
app.use('/test/login',api);

//listen to the port
app.listen(port,function(){
    console.log("server started at port no:"+port);
});

