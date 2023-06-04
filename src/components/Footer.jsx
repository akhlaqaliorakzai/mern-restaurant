import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Footer(){
    const navigate = useNavigate();
    return(
        <div className="bg-dark text-white p-5 text-center">
            <h4 className="mb-4 border-bottom border-secondary p-3 border-top">Our Dishes</h4>
            <h5 className="d-inline m-3 text-warning border border-warning p-2 rounded">Karrahi</h5>
            <h5 className="d-inline m-3 text-warning border border-warning p-2 rounded">Biryani</h5>
            <h5 className="d-inline m-3 text-warning border border-warning p-2 rounded">Extras</h5>
        </div>
    )
}