import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ViewDish({viewDishData, cartData, setCartData}){
    const navigate = useNavigate();
    async function addToCart(){
        const res = await fetch("http://localhost:1337/api/add-to-cart",{
            method: "POST",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify({picture:viewDishData.picture, name: viewDishData.name, size: "Full", quantity: "1", price: viewDishData.price, email: localStorage.getItem("email")})
        })
        console.log(res.status)
        if(res.status == 200){
            // alert("Successfully added to cart.")
            navigate("../cart")
        }
        else{
            alert('Already Added to Cart')
            navigate("../cart")
        }
    }
    return(
    //    <div className="container">
            <div className="row bg-dark p-5">
                <div className="col-6 mt-5 ms-4 me-4 ">
                    <img src={viewDishData.picture} 
                        className="w-100 rounded"
                        alt="" />
                </div>
                <div className="col-5 mt-5 me-3 bg-white shadow-lg p-4 rounded" >
                    <h1 className="shadow p-2 rounded text-warning">{viewDishData.name}</h1>
                    <p className="mt-3 text">
                        {viewDishData.description}
                    </p>
                    <h3 className="w-50 text-center shadow rounded">Price: <span className="text-warning">{viewDishData.price}</span></h3>
                    <Button className="m-3 bg-dark text-warning" onClick={addToCart}>Add to Cart 🛒</Button>
                </div>
            </div>
    //    </div>
    )
    
}