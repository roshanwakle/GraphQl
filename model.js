const mongoose = require("mongoose");

const Schema=mongoose.Schema;

const titleModel= new Schema({
  name:{
    type:String,
    required:true
  },
  title:{
    type:Number,
    required:true
  }
})

const  title = mongoose.model("title",titleModel)

module.exports=title