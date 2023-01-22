import CategorieSlider from "@/components/CategorieSlider";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import slideImg1 from "../public/images/slide1.png";
import slideImg2 from "../public/images/slide2.jpg";
import slideImg3 from "../public/images/slide3.jpg";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
function Home({ categories }) {
  const { category } = categories;
  const router = useRouter();
  const auth = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const slides = [
    {
      img: slideImg1,
      boldWords: "25% discount",
      normalWords: "all Paulo Coelho books!",
    },
    {
      img: slideImg2,
      boldWords: "",
      normalWords: "",
    },
    {
      img: slideImg3,
      boldWords: "",
      normalWords: "",
    },
  ];

  useEffect(() => {
    if(!auth || !token){
      router.push("/")
    }
  },[auth, router, token])
  return (
    <div className="flex flex-col w-full h-screen p-2">
      <Navbar />
      <Slider slides={slides} />
      <div className="flex flex-col mx-[60px] my-[60px]">
        {category.map((category) => (
          <CategorieSlider
            key={category.id}
            title={category.name}
            id={category.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const categoriesRes = await fetch(
    "https://assign-api.piton.com.tr/api/rest/categories"
  );
  const categories = await categoriesRes.json();
  return {
    props: {
      categories,
    },
  };
}
