import React, { useEffect, useState } from "react";
import "../componentStyles/ImageSlider.css";
import img1 from "../images/1.png";
import img2 from "../images/2.png";
import img3 from "../images/3.png";
import img4 from "../images/4.jpg";

const images = [img1, img2, img3];

const ImageSlider = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((previdx) => (previdx + 1)%images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-slider-container">
      <div
        className="slider-images"
        style={{ transform: `translateX(-${currentIdx*100}%)` }}
      >
        {images.map((image, index) => (
          <div className="slider-item" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} loading="lazy" />
          </div>
        ))}
       

        {/** */}
      </div>

        <div className="slider-dots">
          {images.map((_, index) => (
            <span onClick={()=>setCurrentIdx(index)}
              className={`dot ${index === currentIdx ? "active" : ""}`} key={index}
            ></span>
          ))}
        </div>
    </div>
  );
};

export default ImageSlider;
