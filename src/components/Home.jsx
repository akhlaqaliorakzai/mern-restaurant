import Carousal from "./home/Carousal"
import Footer from "./Footer"
import MainContent from "./home/MainContent"

export default function Home({setViewDishData, setCartData, cartData}){ 
    return(
        <>
            <Carousal/>
            <MainContent setViewDishData={setViewDishData} cartData={cartData} setCartData={setCartData} />  

            
            
            
            
        </>

    )
}