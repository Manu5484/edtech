import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../imgs/homeslider-1.jpg';
import img2 from '../../imgs/homeslider-2.png';
import img3 from '../../imgs/homeslider-3.webp'

function Sliderintro() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="imageconatiner">
          <img className="sliderimg" src={img1} alt="silder1" />
        </div>
        <div className="imageconatiner">
          <img className="sliderimg" src={img2} alt="silder2" />  
        </div>
        <div className="imageconatiner">
          <img className="sliderimg" src={img3} alt="silder3" />
        </div>
       
      </Slider>
    </div>
  );
}

export default Sliderintro;
