import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import slideImg1 from "../public/images/slide1.png";
import slideImg2 from "../public/images/slide2.jpg";
import slideImg3 from "../public/images/slide3.jpg";

function home() {
  const slides = [
    {
      img: slideImg1,
      boldWords: "25% discount",
      normalWords:"all Paulo Coelho books!",
    },
    {
      img: slideImg2,
      boldWords: "",
      normalWords:"",
    },
    {
      img: slideImg3,
      boldWords: "",
      normalWords:"",
    },
  ];
  return (
    <div className='flex flex-col w-full h-screen p-2'>
      <Navbar />
      <Slider slides={slides}/>
    </div>
  )
}

export default home