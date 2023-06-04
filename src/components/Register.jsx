import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [rePassword, setRePassword] = useState()
    const navigate = useNavigate()

    async function register(e){
        e.preventDefault()
        const req = await fetch('http://localhost:1337/api/register',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify({name, email, address, phone, password, }),
        })
        // alert(req)
        if(req.status == 200){
            // alert('successfully register')
            navigate('../sign-in')
        }
        else{
            alert('Duplicate Email')
        }
    }
  return (
    <div className='mb-5 d-flex justify-content-center'>
        <Form className='shadow-lg p-5 rounded mt-5 w-50' onSubmit={register}>
            <h2 className='text-warning p-2'>Register</h2>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" required onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required onChange={(e)=>setEmail(e.target.value)} />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Name" required onChange={(e)=>setAddress(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone #</Form.Label>
            <Form.Control type="tel" placeholder="Phone #" required onChange={(e)=>setPhone(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control type="password" placeholder="Retype Password" required onChange={(e)=>setRePassword(e.target.value)}/>
        </Form.Group>
        <Button variant="warning" type="submit" className='mt-3' disabled={password!=rePassword}>
            Register
        </Button>
        { password != rePassword && <p className='text-danger'>password does not match</p>}
        <p className='pt-3 pb-3'>Already Registered <span><Link to='../sign-in'>Sign in</Link></span></p>
        </Form>
    </div>
  );
}