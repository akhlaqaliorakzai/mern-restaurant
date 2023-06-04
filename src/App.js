import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Signin from "./components/Signin";
import Register from "./components/Register";
import NavBar from "./components/NavBar";
import ViewDish from "./components/ViewDish";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import NoElementFound from "./components/NoElementFound";

function App() {
  const [viewDishData, setViewDishData] = useState();
  const [cartData, setCartData] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem('email'))
  // alert(email && email)
  return (
    <>
      <Router>
        <NavBar setEmail = {setEmail}/>
        <Routes>
          <Route path="/" element={<Home setViewDishData = {setViewDishData} cartData={cartData} setCartData = {setCartData}/>}/>
          {(email && cartData) && <Route path="cart" element={<Cart cartData={cartData}/>}/>}
          {!email && <Route path="sign-in" element={<Signin setEmail = {setEmail}/>}/>}
          {!email && <Route path="register" element={<Register/>}/>}
          {email && <Route path="view-dish" element={<ViewDish viewDishData = {viewDishData} cartData={cartData} setCartData = {setCartData} />}/>}
          { email && email=="admin@gmail.com" && <Route path="dashboard" element={<Dashboard/>}/>}
          <Route path="*" element={<NoElementFound/>}/>

        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
