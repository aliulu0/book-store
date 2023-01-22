/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useEffect } from "react";

function Card({ item, cardDirection, descriptionDirection, imgWidth, imgHeight }) {
  const [itemImg, setItemImg] = useState("");

  useEffect(() => {
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
          setItemImg(data.action_product_image.url);
          return data;
        } catch (err) {
          console.log(err.message);
        }
      };
      getImage(item.cover)
  },[item.cover]);


  return (
    <div className={`flex flex-${cardDirection} min-w-[320px] h-[200px] bg-[#F4F4FF] p-[10px] mr-[20px] mt-[20px] rounded`}>
      {/* image */}
      <img src={itemImg} alt="itemImg" width={imgWidth} height={imgHeight}/>
      <div className={`flex flex-${descriptionDirection} ml-[20px] items-start justify-between py-[10px] px-0 w-[105px] h-[180px]`}>
        <div className="flex flex-col w-[150px] max-h-fit justify-center items-start">
          {/* title */}
          <h4 className="text-[#090937] text-[19px] font-[700]">{item?.name.charAt(0).toUpperCase()+item?.name.slice(1)}</h4>
          {/* author */}
          <p className="text-[#09093799] text-[16px] font-[600]">{item?.author}</p>
        </div>
        {/* price */}
        <h3 className="text-[#6251DD] text-[24px] font-[700]">{item?.price} $</h3>
      </div>
    </div>
  );
}

export default Card;
