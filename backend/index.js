const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Dishes = require("./modal/dishes.model");
const Users = require("./modal/users.model");
const Cart = require("./modal/cart.model")
const Orders = require("./modal/orders.model")
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/restaurant",{useNewUrlParser:true});

app.post("/api/add-dish", async (req,res)=>{
    
    try{
        const {imgUrl, name, description, price} = req.body;
        const dish = await Dishes.findOne({picture: imgUrl, name: name, description: description, price: price});
        if(!dish){
            const dishAdded = await Dishes.create({
                picture: imgUrl,
                name: name,
                description: description,
                price: price,
            })
            res.status(200).json({message:"Dish Successfully Added"})
        }
        else{
            res.status(400).json({error: "Dish already exists"})
        }
    

    }
    catch(err){

        res.status(400).json({error: err})
    }
})

app.post("/api/register", async (req, res)=>{
    try{
        const {name, email, address, phone, password} = req.body;
        const user = await Users.findOne({email:email});
        if(!user){
            await Users.create({
                name: name,
                email: email,
                address: address,
                phone: phone,
                password: password,
            })
            res.status(200).json({message:"Successfully Registered"});
            
        }
        else{
            res.status(400).json({error:"User already exists"});
        }
        
    }
    catch(err){
        res.status(400).json({error: err});
    }
})
app.post("/api/sign-in", async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await Users.findOne({email:email, password: password});
        if(user){
            res.json({status:"ok", data: user, message:"User exists"});
        }
        else{
            res.status(400).json({error: "User does not exists"})
        }
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

app.get("/api/all-dishes", async (req, res)=>{
    try{
        const allDishes = await Dishes.find();
        res.json({status:"ok", data:allDishes})
    }
    catch(err){
        res.status(400).json({error: err})
    }
    
    
})

app.post("/api/add-to-cart", async (req, res)=>{
    
    try{
        const {picture, name, size, quantity, price, email} = req.body;
        const cartItem = await Cart.findOne({picture: picture, name: name})
        if(!cartItem){
            const op = await Cart.create({
                picture: picture,
                name: name,
                size: size,
                quantity: quantity,
                price: price,
                email: email,
            })
            res.json({status: "ok"});
        }
        else{
            res.status(400).json({error: "Item already exists in cart"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({error: err})
    }
})

app.post("/api/get-cart", async (req, res)=>{
    try{
        const email = req.body.email;
        const cartData = await Cart.find({email: email});
        let totalPrice = 0
        cartData.forEach(item=>{
            totalPrice += parseInt(item.price)
        })
        console.log(totalPrice)
        res.json({status:"ok", data:cartData, totalPrice:totalPrice})
    }
    catch(err){
        res.status(400).json({error: err})
    }
    
    
})

app.post("/api/delete-cart-item", async (req, res)=>{
    try{
        const {picture, name} = req.body
        const allDishes = await Cart.deleteOne({picture:picture, name:name});
        res.json({status:"ok", message: "Successfully Deleted"})
    }
    catch(err){
        res.status(400).json({error: err})
    }
    
    
})

app.post("/api/change-item-size", async (req, res)=>{
    try{
        const {picture, name, size} = req.body
        const allDishes = await Cart.updateOne({picture:picture, name:name},{$set:{size: size}});
        res.json({status:"ok", message: "Successfully Size updated"})
    }
    catch(err){
        res.status(400).json({error: err})
    }
    
    
})

app.post("/api/change-item-quantity", async (req, res)=>{
    try{
        const {picture, name, quantity} = req.body
        const item = await Dishes.findOne({picture: picture, name: name})
        console.log(item.price)
        console.log(quantity)
        const price = parseInt(item.price) * quantity;
        console.log(price)
        
        const allDishes = await Cart.updateOne({picture:picture, name:name},{$set:{quantity: quantity, price: price}});
        res.json({status:"ok", message: "Successfully Size updated"})
    }
    catch(err){
        res.status(400).json({error: err})
    }
    
    
})


app.post("/api/place-order", async (req, res)=>{
    
    try{
            const {name, address, phone, price, cart} = req.body;
            const op = await Orders.create({
                name: name,
                address: address,
                phone: phone,
                price: price,
                cart: cart,
            })
            await Cart.deleteMany();
            res.json({status: "ok"});
    }
    catch(err){
        console.log(err)
        res.status(400).json({error: err})
    }
})


app.get("/api/get-orders", async (req, res)=>{
    try{
        const orders = await Orders.find();
        res.json({status:"ok", data:orders})
    }
    catch(err){
        res.status(400).json({error: err})
    }
    
    
})


app.get("/api/get-dashboard-dishes", async (req, res)=>{
    try{
        const dishes = await Dishes.find();
        res.json({status:"ok", data:dishes})
    }
    catch(err){
        res.status(400).json({error: err})
    }
    
    
})


app.post("/api/edit-dish-item", async (req, res)=>{
    
    try{
        const {oldPicture, oldName, oldDescription, oldPrice, picture, name, description, price} = req.body;
        const isAvailable = await Dishes.findOne({picture:picture, name: name, description: description, price: price })
        let searchItem = null;
        if(!isAvailable){
            searchItem = await Dishes.updateOne({picture : oldPicture, name: oldName, description: oldDescription, price: oldPrice},{$set:{picture: picture, name: name, description: description, price: price }});
        }
        
        if(searchItem && !isAvailable){
            res.status(200).json({message: "Item Deleted Successfully..."})
        }
        else{
            res.status(400).json({message:"Operation failed..."})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).res({error: err})
    }
    

})

app.post("/api/delete-order-item", async (req, res)=>{
    try{
        const {name, address, phone} = req.body
        const allDishes = await Orders.deleteOne({name:name, address: address, phone: phone});
        res.json({status:"ok", message: "Successfully Deleted"})
    }
    catch(err){
        res.status(400).json({error: err})
    }
    
    
})
app.post("/api/delete-dish-item", async (req, res)=>{
    try{
        const {picture, name} = req.body
        const allDishes = await Dishes.deleteOne({picture:picture, name:name});
        res.json({status:"ok", message: "Successfully Deleted"})
    }
    catch(err){
        res.status(400).json({error: err})
    }
    
    
})

app.listen(1337,()=>{
    console.log("Server started on 1337...")
})