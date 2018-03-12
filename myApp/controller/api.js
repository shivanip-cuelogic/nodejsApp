var express= require('express');
var jwt= require('jsonwebtoken');
var mongoose= require('mongoose');
var app= express();
var router=express.Router();
var User= require('./../model/user.js');
var schema= require('./../model/myschema.js');
var bodyparser= require('body-parser');

mongoose.connect('mongodb://localhost/employeeSchema');
mongoose.connection.on('connected',function(error,res){
    if(error)
    console.log("Error...");
    else
    console.log("Connected");
});

app.use(bodyparser.urlencoded({extended:false}));

//controller of the code
router.post('/',function(req,res){
    console.log("hello");
    var data= new User({name:req.body.username,
                        password:req.body.password});
    
  // res.send(data);

  schema.find({name: data.name,password:data.password}, function (err, existingUser){
        if(err)
        {
            res.send("some error occured");
        }
        else if(existingUser.length<1)
        {
        res.send("user not found....");     
        // console.log(result);
        }
        else{
             // res.send("hello user");
             var message;
            jwt.sign({user:data},'secretkey',function(err,token){
            res.json({
                    message:"hello user",
                    data,
                    token:token
                    });
                }); 
            }
    } );

    
});


module.exports= router;

//  Schema.employeeSchema.authenticate = function (uname, upassword, callback) {
//     schema.find({ name:uname  })
//       .exec(function (err, user) {
//         if (err) {
//           return callback(err)
//         } else if (!user) {
//           var err = new Error('User not found.');
//           err.status = 401;
//           return callback(err);
//         }
//         bcrypt.compare(password, user.password, function (err, result) {
//           if (result === true) {
//             return callback(null, user);
//           } else {
//             return callback();
//           }
//         })
//       });
//   }


    // jwt.sign({user:user},'secretkey',function(err,token){
    //     res.json({
    //         token:token
    //     });
        
    // });
// });

// app.listen(8000,function(req,res){
// console.log("server created at port 8000");

// });


