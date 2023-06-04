import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
// const carouselData = [{
//   carousel1 : {
//     img1 : "https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-chicken-Biryani-750x750.jpg",
//     img2 : "https://static.wixstatic.com/media/91e241_475faa4fa56341f3878699dde5ab4904~mv2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/91e241_475faa4fa56341f3878699dde5ab4904~mv2.jpg",
//     img3 : "https://www.sugarspicenmore.com/wp-content/uploads/2020/12/Boneless-Chicken-Biryani-5.jpg",
//     title : "Biryani",
//     text : "Check out our special Chicken, Beef & Mutton Biryani.",
//     btnText : "Go",
//   },
//   carousel2 : {
//     img1 : "https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGthcmFoaXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
//     img2 : "https://dhakalounge.com/wp-content/uploads/2023/02/Beef-Karahi-min.jpg",
//     img3 : "https://static.tossdown.com/images/f7437e5f-7ea9-4341-925b-4c7f610932d3.jpg",
//     title : "Karrahi (Curry)",
//     text : "Check out our special Chicken, Beef & Mutton Karrahi.",
//     btn : "Go",
//   },
//   carousel3 : {
//     img1 : "https://cdn3.tmbi.com/toh/GoogleImagesPostCard/Hearty-Italian-Salad_exps165437_SD2856494B12_10_1bC_RMS.jpg",
//     img2 : "https://static1.squarespace.com/static/5caa3984797f7475f988d617/5caa3a0e8165f50333ac0492/5ea061737d3ecb4c270df3a3/1588538889895/DSC_0335.jpg?format=1500w",
//     img3 : "https://previews.123rf.com/images/sutsaiy/sutsaiy1111/sutsaiy111100179/11532054-traditional-asia-drink-fruit-and-herbal-cold-drink.jpg",
//     title : "",
//     text : "",
//     btn : "",
//   },

// }]
export default function Carousal() {
  return (
    <Carousel className='pt-5 pb-5 bg-dark' interval={null} controls={false}>
      <Carousel.Item className='d-flex justify-content-center align-items-center '>
        <img
          className="img-fluid w-75  rounded-pill" style={{height:"500px"}}
          src="https://images.deliveryhero.io/image/fd-pk/LH/lkwk-hero.jpg"
          alt="First slide"
        />
       
        <Carousel.Caption className='bg-dark rounded bg-opacity-75 w-75 border text-warning'>
          <h3>We offer Biryani, Karrahi & Salads</h3>
          <p className='text-white'>
            We have Chicken Karrahi, Mutton Karrahi, Beef Karrahi, Chicken Biryani, Mutton Biryani, Beef Biryani, Cold Drinks
             & Salads
          </p>
          {/* <Button variant='warning' className='ps-3 pe-3 '>Go</Button> */}
        </Carousel.Caption>
       
      </Carousel.Item>
    </Carousel>
  );
}
