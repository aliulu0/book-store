import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";

function Card({
  item,
  cardDirection,
  descriptionDirection,
  imgWidth,
  imgHeight,
  cardWidth,
  cardHeight,
  descriptionWidth,
  descriptionHeight,
}) {
  const [itemImg, setItemImg] = useState("");

  const getImage = async (fileName) => {
    try {
      const res = await fetch(
        "https://assign-api.piton.com.tr/api/rest/cover_image",
        {
          method: "POST",
          body: JSON.stringify({
            fileName,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await res.json();
      setItemImg(data?.action_product_image?.url);
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getImage(item?.cover);
  }, [item?.cover]);

  return (
    <div
      className={`flex flex-${cardDirection} min-w-[${cardWidth}] h-[${cardHeight}] bg-[#F4F4FF] p-[10px] mr-[20px] mt-[20px] rounded items-center justify-start cursor-pointer`}
    >
      <Image
        src={itemImg}
        alt="itemImg"
        width={`${imgWidth}`}
        height={`${imgHeight}`}
      />
      <div
        className={`flex flex-${descriptionDirection} ml-[10px] items-start justify-between py-[10px] px-0 w-[${descriptionWidth}px] h-[${descriptionHeight}]`}
      >
        <div className={`flex flex-col w-[180px] max-h-fit justify-center items-start`}>
          {/* title */}
          <h4 className="text-[#090937] text-[19px] font-[700]">
            {item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}
          </h4>
          {/* author */}
          <p className="text-[#09093799] text-[16px] font-[600]">
            {item?.author}
          </p>
        </div>
        {/* price */}
        <h3 className="text-[#6251DD] text-[24px] font-[700]">
          {item?.price} $
        </h3>
      </div>
    </div>
  );
}

export default Card;
