import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
export default function MainContent({setViewDishData, setCartData, cartData}){
    const navigate = useNavigate();
    const [allDishesData, setAllDishesData] = useState();
    
    async function populateData(){
        const res = await fetch("http://localhost:1337/api/all-dishes");
        const data = await res.json();
        if(data.status=="ok"){
            const tempData = data.data.map(dish=>(
                <div className="col-lg-3 col-md-6 col-sm-12 ">
                    <Card className="p-3 mb-5" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={dish.picture} className="card-img"/>
                        <Card.Body>
                            <Card.Title>{dish.name}</Card.Title>
                            <Card.Text>
                                {dish.description.slice(0, 75)+"..."}
                            <span className='d-flex justify-content-center text-white border bg-info border shadow mt-2 rounded-pill'>Price: {dish.price}</span>
                            </Card.Text>
                            <div className="d-flex justify-content-center">
                                <Button variant="dark" className=" ps-4 pe-4 d-flex text-warning" onClick={()=>{setViewDishData(dish);navigate('view-dish')}}>View</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ))
            setAllDishesData(tempData);
        }
        else{
            alert("Data Not Found...")
        }
    }
    useEffect(()=>{
        populateData();
    },[])

    return(
        <>
            {
                allDishesData && allDishesData.length>0 ?
                <div className="container">
                    <h3 className="text-center mt-5 p-2">Our Dishes</h3>
                    <div className="row">
                        {
                            allDishesData && allDishesData
                        }
                    </div>
                    
                    {/* </div> */}
                    <div className="row mb-3">
                            <Button variant='dark' className='text-warning'>Load More</Button>
                    </div>
                </div> :
                <div className='m-4'>
                    <Alert variant='danger' className='text-center'>No data to show</Alert>
                </div>
            }
        </>

    )
        
}