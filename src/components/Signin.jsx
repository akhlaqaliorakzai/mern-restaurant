import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Singin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  async function signIn(event){
    event.preventDefault()
    const req = await fetch('http://localhost:1337/api/sign-in',{
      method : "POST",
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify({email, password})
    })
    const data = await req.json();
    if(req.status==200){
      // alert("Login successful")
      //
      localStorage.setItem('email',email)
      const user = JSON.stringify(data.data)
      localStorage.setItem('user', user)
      window.location.href = '/';
    }
    else{
      alert('Please provide correct credentials')
    }
    
  }
  return (
    <div className='mb-5 d-flex justify-content-center'>
        <Form className='shadow-lg p-5 rounded mt-5' onSubmit={signIn}>
        <h2 className='text-warning p-2'>Sign in</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required onChange={e=>setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required onChange={e=>setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="warning" type="submit" className='mt-3'>
            Sign in
        </Button>
        <p className='pt-3 pb-3'>Not Registered <span><Link to='../register'>Register</Link></span></p>
        </Form>
    </div>
  );
}
