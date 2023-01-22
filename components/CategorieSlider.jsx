import React, { useState } from "react";
import Link from "next/link";
import Card from "./Card";
import { useEffect } from "react";

function CategorieSlider({ title, id }) {
  const [items, setItems] = useState([]);

  const getData = async (categoryId) => {
    try {
      const response = await fetch(
        `https://assign-api.piton.com.tr/api/rest/products/${categoryId}`
      );
      const data = await response.json();
      setItems(data.product);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getData(id);
  }, [items, id, setItems]);
  return (
    <div className="flex flex-col my-[60px] mx-[60px] px-14">
      <div className="flex items-center w-[100%] justify-between">
        <h2 className="text-[#090937] text-[32px] font-[700]">{title}</h2>
        <Link
          href={{
            pathname: `/categories/${id}`,
            query: {
              title,
            },
          }}
          legacyBehavior
        >
          <a className="text-[#EF6B4A] text-[20px] font-[700]">View All</a>
        </Link>
      </div>
      <div className="flex overflow-hidden w-[100%]">
        {items.map((item) => (
          <Link key={item.id} href={{
            pathname:`/products/${item.id}`,
            query:{
              categoryId: id,
            }
          }}>
            <Card
              item={item}
              cardDirection="row"
              descriptionDirection="col"
              imgWidth="120"
              imgHeight="180"
              cardWidth="min-w-[320px]"
              cardHeight="h-[200px]"
              descriptionWith="w-[105px]"
              descriptionHeight="h-[180px]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorieSlider;
