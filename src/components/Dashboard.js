import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Collapse, Form, Modal, Table } from 'react-bootstrap'

export default function Dashboard() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showOrder, setShowOrder] = useState(false);

    const handleOrderClose = () => setShowOrder(false);
    const handleOrderShow = () => setShowOrder(true);

    const [showAddDish, setShowAddDish] = useState(false);

    const handleAddDishClose = () => setShowAddDish(false);
    const handleAddDishShow = () => setShowAddDish(true);

    //Add Dish variables
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [imgUrl, setImgUrl] = useState();

    //orders variable
    const [ordersData, setOrdersData] = useState();
    const [orderModalData, setOrderModalData] = useState();
    //dishes variable
    const [dishesData, setDishesData] = useState();
    const [dishModalData, setDishModalData] = useState();
    const [editBtn, setEditBtn] = useState();
    
    const [editedName, setEditedName] = useState();
    const [editedPicture, setEditedPicture] = useState();
    const [editedDescription, setEditedDescription] = useState();
    const [editedPrice, setEditedPrice] = useState();

    async function addDish(e){
        e.preventDefault();
        const req = await fetch("http://localhost:1337/api/add-dish",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({imgUrl, name, description, price})
        })
        console.log(req.status)
        if(req.status==200){
            // alert("Data Added Successfully...")
            handleAddDishClose();
            populateDishes();
        }
        else{
            alert("Operation Failed...")
        }
    }

    async function populateOrders(){
        const res = await fetch("http://localhost:1337/api/get-orders");
        const data = await res.json();

        if(data.data){
            const tempData = data.data.map(order=>(
                <tr>
                    <td>{order.name}</td>
                    <td>{order.address}</td>
                    <td>{order.phone}</td>
                    <td>{order.price}</td>
                    <td><Button variant='outline-warning' onClick={()=>{setOrderModalData(order); handleOrderShow()}}>View Details</Button></td>
                    <td><Button variant='outline-warning' onClick={()=>deleteOrderItem(order)}>❌</Button></td>
                </tr>
            ))  
            setOrdersData(tempData) 
        }
        else{
            alert("No Active Orders Exists")
        }
    }

    async function populateDishes(){
        const res = await fetch("http://localhost:1337/api/get-dashboard-dishes");
        const data = await res.json();

        if(data.data){
            const tempData = data.data.map(dish=>(
                <tr>
                    <td><img src={dish.picture} alt='' className='rounded-pill' style={{width:"70px"}}/></td>
                    <td className='align-middle'>{dish.name}</td>
                    <td className='align-middle'>
                        <Button variant='outline-warning' onClick={()=>{
                            setDishModalData(dish);
                            setEditedPicture(dish.picture);
                            setEditedName(dish.name);
                            setEditedDescription(dish.description);
                            setEditedPrice(dish.price) 
                            handleShow();
                            }}>
                            View Details
                        </Button>
                    </td>
                    <td className='align-middle'>
                        <Button variant='outline-success' onClick={()=>{
                            setDishModalData(dish);
                            setEditedPicture(dish.picture);
                            setEditedName(dish.name);
                            setEditedDescription(dish.description);
                            setEditedPrice(dish.price) 
                            handleShow();
                            }}>
                            Edit
                        </Button>
                    </td>
                    <td className='align-middle'><Button variant='outline-danger' onClick={()=>deleteDishItem(dish)} >Delete</Button></td>
                </tr>
            ))  
            setDishesData(tempData) 
        }
        else{
            alert("No Active Orders Exists")
        }
    }
    useEffect(()=>{
        populateOrders();
        populateDishes();
    },[])

    async function submitEditedItem(e){
        e.preventDefault();
        const response = await fetch("http://localhost:1337/api/edit-dish-item",{
          method : "POST",
          headers : {"Content-Type":"application/json"},
          body : JSON.stringify({
            oldPicture: dishModalData.picture, 
            oldName: dishModalData.name, 
            oldDescription: dishModalData.description,
            oldPrice: dishModalData.price,
            picture : editedPicture, 
            name: editedName, 
            description: editedDescription, 
            price: editedPrice,
        })
        })
        if(response.status == 200){
          populateDishes();
          handleClose();
          setEditBtn(false);
        }
        else{
          alert("item already exists")
        }
        
      }

      async function deleteOrderItem(item){
        const res = await fetch("http://localhost:1337/api/delete-order-item",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({name: item.name, address: item.address, phone: item.phone})
        })
        if(res.status == 200){
            populateOrders();
        }
        else{
            alert("Failed to delete...")
        }
    }

    async function deleteDishItem(item){
        const res = await fetch("http://localhost:1337/api/delete-dish-item",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({picture: item.picture, name: item.name})
        })
        if(res.status == 200){
            populateDishes();
        }
        else{
            alert("Failed to delete...")
        }
    }

  return (
    <div style={{overflowX:"hidden"}} className='shadow-lg m-4 p-3 rounded'>
        <div className='row d-flex justify-content-center'>
            <div className='col-3 p-5 bg-dark text-white m-3 rounded shadow-lg'>
                <h3>Total Dishes: <span className='text-warning'>{dishesData && dishesData.length}</span></h3>
            </div>
            <div className='col-3 p-5 bg-dark text-white m-3 rounded shadow-lg'>
                <h3>Active Orders: <span className='text-warning'>{ordersData && ordersData.length}</span></h3>
            </div>
           
        </div>
        <Button variant='warning' className='text-danger w-100 fs-4 mb-5' onClick={handleAddDishShow}>Add Dish+</Button>
        <h3 className="text-center mt-2 p-2 bg-dark text-warning ms-5 me-5">Active Orders</h3>
                {
                    ordersData && ordersData.length>0 ?
                    <div className='ms-5 me-5 mb-5 table-responsive'>
                        <Table className='text-center'>
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone #</th>
                                <th>Total Price</th>
                                <th>View Detail</th>
                                <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ordersData && ordersData
                                }
                            </tbody>
                            
                        </Table>
                        <div className="d-flex justify-content-center">
                                    <Button variant='dark' className='text-warning'>Load More</Button>
                        </div>
                    </div> :
                    <div className='d-flex justify-content-center'>
                        <Alert variant='danger' className='text-center'>No data to show</Alert>
                    </div>
                }



            
            <div className="container">
                <h3 className="text-center mt-2 p-2 bg-dark text-warning">All Dishes</h3>
                {
                    dishesData && dishesData.length>0 ? 
                    <div className='ms-5 me-5 mb-5 table-responsive'>
                        <Table>
                            <thead>
                                <tr>
                                <th>Dish</th>
                                <th>Name</th>
                                <th>View</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dishesData && dishesData
                                }
                            </tbody>
                            
                        </Table>
                        <div className="d-flex justify-content-center">
                                <Button variant='dark' className='text-warning'>Load More</Button>
                        </div>
                    </div>
                     : 
                     <div className='d-flex justify-content-center'>
                        <Alert variant='danger' className='text-center'>No data to show</Alert>
                    </div>

                }
            </div>

        {/* this modal is for viewing a particular dish data */}
        {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
        </Button> */}
        {
            dishModalData &&
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Dish</Modal.Title>
                </Modal.Header>
                <Modal.Body className='m-3 p-3 shadow-lg rounded'>
                    <div className='d-flex justify-content-center'>
                        <img src={dishModalData.picture} className='w-50 rounded' alt='dish'/>
                    </div>
                    <h4 className='m-3'>Name: <span className='text-warning'>{dishModalData.name}</span></h4>
                    <h4 className='m-3'>Description: <span className='text-secondary fs-5'>{dishModalData.description}</span></h4>
                    <h4 className='m-3'>Price: <span className='text-warning'>{dishModalData.price}</span></h4>
                    <Button variant="warning" className="ps-4 pe-4 fs-5" onClick={()=>setEditBtn(!editBtn)}>Edit</Button>
                    
                    <Collapse in={editBtn}>
                        <div id="example-collapse-text">
                            <Form onSubmit={(e)=>{submitEditedItem(e)}} className='bg-white border mt-3 rounded p-3'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='fs-5'>Edit Picture</Form.Label>
                                    <Form.Control type="text" defaultValue={dishModalData.picture && dishModalData.picture} required onChange={(e)=>setEditedPicture(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='fs-5'>Edit Name</Form.Label>
                                    <Form.Control type="text" defaultValue={dishModalData.name && dishModalData.name} required onChange={(e)=>setEditedName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='fs-5'>Edit Description</Form.Label>
                                    <Form.Control type="text" defaultValue={dishModalData.description && dishModalData.description} required onChange={(e)=>setEditedDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='fs-5'>Edit Price</Form.Label>
                                    <Form.Control type="text" defaultValue={dishModalData.price && dishModalData.price} required onChange={(e)=>setEditedPrice(e.target.value)} />
                                </Form.Group>
                                <Button type='submit' >Submit</Button>
                                
                            </Form>
                        </div>
                    </Collapse>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                    Close
                    </Button>
                   
                </Modal.Footer>
            </Modal>
        }
        

        {/* <Button variant="primary" onClick={handleOrderShow}>
        Launch demo modal
        </Button> */}

        {/* this modal is for viewing a particular order data    */}
        {
            orderModalData &&
            <Modal show={showOrder} onHide={handleOrderClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Order</Modal.Title>
            </Modal.Header>
            <Modal.Body className='shadow-lg m-3 rounded'>
                <p>Name: <span className='fw-bold'>{orderModalData.name}</span></p>
                <p>Address: <span className='fw-bold'>{orderModalData.address}</span></p>
                <p>Phone: <span className='fw-bold'>{orderModalData.phone}</span></p>
                <p>Prices: <span className='fw-bold'>{orderModalData.price}</span></p>
                <p>Order: </p>
                {orderModalData.cart.map(item=>(<p className='bg-dark text-warning m-2 mb-2 p-2 rounded shadow-lg border border-warning'>{item.name} {item.size} {item.quantity}</p>))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleOrderClose}>
                Close
                </Button>
                
            </Modal.Footer>
            </Modal>
        }

        {/* <Button variant="primary" onClick={handleAddDishShow}>
            Launch demo modal
        </Button> */}
        {/* this modal is for adding a dish data */}
        <Modal show={showAddDish} onHide={handleAddDishClose} size='lg'>
        <Modal.Header closeButton>
            <Modal.Title>Dish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={addDish}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" required onChange={(e)=>setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} required onChange={(e)=>setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Price" required onChange={(e)=>setPrice(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image Link</Form.Label>
                    <Form.Control type="text" placeholder="Image Link" required onChange={(e)=>setImgUrl(e.target.value)} />
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleAddDishClose}>
                Close
            </Button>
        </Modal.Footer>
        </Modal>

    </div>
  )
}
