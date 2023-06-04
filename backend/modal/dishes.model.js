const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Dishes = new Schema({
    picture:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type:String,
        required: true,
    }
})
const model = mongoose.model("Dishes", Dishes);
module.exports = model;