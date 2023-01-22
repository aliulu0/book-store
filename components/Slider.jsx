import Image from "next/image";
import React, { useState } from "react";

function Slider({ slides, boldWords, normalWords }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    console.log(currentIndex);
    setCurrentIndex(index);
  };
  return (
    <div className="max-w-[1320px] h-[400px] w-full mt-[40px] mx-auto relative">
      {(slides[currentIndex].boldWords && slides[currentIndex].normalWords) && (
        <div className="w-[426px] h-[228] text-[56px] absolute top-[86px] bottom-[86px] left-[60px]">
          <p className="text-[#F0B861] font-[800]">{slides[currentIndex].boldWords}</p>
          <p className="font-[600] text-white ">{slides[currentIndex].normalWords}</p>
        </div>
      )}
      <Image
        src={slides[currentIndex].img}
        className=" w-full h-[400px] rounded-lg bg-center bg-cover duration-300"
        alt="slide"
      />
      <div className="flex absolute justify-center py-2 mt-[21px] w-full">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`${
              currentIndex === slideIndex ? "bg-[#EF6B4A]" : "bg-[#09093799]"
            }  active:opacity-1  mx-[12px] cursor-pointer rounded-full w-3 h-3`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Slider;
