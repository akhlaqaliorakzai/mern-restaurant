const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Orders = new Schema({
    name:{
        type: Array,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type:String,
        required: true,
    },
    price:{
        type:String,
        required: true,
    },
    cart:{
        type: Array,
        required: true,
    }
})
const model = mongoose.model("Orders", Orders);
module.exports = model;