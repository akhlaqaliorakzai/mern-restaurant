import { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
export default function Cart({cartData}){

    const [checkout, setCheckout] = useState(false);

    const [cartPageData, setCartPageData] = useState();

    const [totalPrice, setTotalPrice] = useState(0);

    const [orderData, setOrderData] = useState();

    async function populateCart(){
        const res = await fetch("http://localhost:1337/api/get-cart",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email: localStorage.getItem("email")}),
        });
        const data = await res.json();
        if(data.data){
            setTotalPrice(data.totalPrice);
            setOrderData(data.data)
            const temp = data.data.map((item)=>(
                <tr>
                    <td><img src = {item.picture} alt="" className="rounded-pill" style={{width:"60px"}} /></td>
                    <td className='align-middle'>{item.name}rk</td>
                    <td className='align-middle'>
                        <select name="Size" id="" className='border border-none rounded' defaultValue={item.size} onChange={(e)=>changeItemSize(item,e.target.value)}>
                            <option value="Full">Full</option>
                            <option value="Half">Half</option>
                        </select>
                    </td>
                    <td className='align-middle'>
                        <Button variant='outline-warning' className='border text-dark m-2' onClick={()=>changeItemQuantity(item,"-")}>-</Button>
                            <span>{item.quantity}</span>
                        <Button variant='outline-warning' className='border text-dark m-2' onClick={()=>changeItemQuantity(item,"+")}>+</Button>
                    </td>
                    <td className='align-middle'>{item.price}</td>
                    <td className='align-middle'><Button variant='none' onClick={()=>{deleteCartItem(item)}}>❌</Button></td>
                </tr>
            ))
            setCartPageData(temp)
            
        }
        else{
            alert("Data does not exists")
        }
    }

    useEffect(()=>{
        populateCart();
    },[])

    async function deleteCartItem(item){
        const res = await fetch("http://localhost:1337/api/delete-cart-item",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({picture: item.picture, name: item.name})
        })
        if(res.status == 200){
            populateCart();
        }
        else{
            alert("Failed to delete...")
        }
    }

    async function changeItemSize(item, value){
        const res = await fetch("http://localhost:1337/api/change-item-size",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({picture: item.picture, name: item.name, size: value})
        })
        if(res.status == 200){
            populateCart();
        }
        else{
            alert("Failed to Change...")
        }
    }
    async function changeItemQuantity(item, op){
        let q = parseInt(item.quantity);
        if(op=="+"){
            q++;
        }
        else if(op=="-"){
            if(q>1){
                q--;
            }
        }
        const res = await fetch("http://localhost:1337/api/change-item-quantity",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({picture: item.picture, name: item.name, quantity: q})
        })
        if(res.status == 200){
            populateCart();
        }
        else{
            alert("Failed to Change...")
        }
    }

    async function placeOrder(){
        const userGet = localStorage.getItem("user")
        const parsedUser = JSON.parse(userGet)
        const res = await fetch("http://localhost:1337/api/place-order",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({name: parsedUser.name, address: parsedUser.address, phone: parsedUser.phone , price: totalPrice, cart: orderData})
        })
        if(res.status == 200){
            populateCart();
        }
        else{
            alert("Failed to place Order...")
        }
    }
    return(
        <div className="m-3 shadow-lg p-5 rounded">
           {
                cartPageData && cartPageData.length>0 ?
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-sm-12">
                            <h3 className='text-warning text-center mb-4'>Cart</h3>
                            <div className="table-responsive">
                                <Table>
                                    <thead>
                                        <tr>
                                        <th>Dish</th>
                                        <th>Name</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartPageData && cartPageData}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 ms-4">
                            <h3 className='text-center text-warning mb-4'>Payment</h3>
                            <div className='bg-dark text-white shadow-lg p-5 rounded'>
                                <p className='fs-4 text-warning'>Total Amount: <span>{totalPrice} Rupees</span></p>
                                <p>Cash on Delivery</p>
                                <Button variant='warning' onClick={placeOrder}>Place Order</Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                : 
                <div className='m-5 p-5'>
                   <Alert variant='danger' className='text-center'>No data to show</Alert>
               </div>
            }
        </div>
    )
}