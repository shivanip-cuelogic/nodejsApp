var mongoose = require('mongoose');
// var express = require("express");
var Schema= mongoose.Schema;

var mySchema= new Schema({
     name:String,
     password:String,
    age:Number,
    city:String,
    project:String,
    salary:Number
});

module.exports=mongoose.model('Schema',mySchema);