const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema({
    picture:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    size:{
        type: String,
        required: true,
    },
    quantity:{
        type:String,
        required: true,
    },
    price:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    }
})
const model = mongoose.model("Cart", Cart);
module.exports = model;