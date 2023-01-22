import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React,{useEffect} from "react";
import LeftArrowIcon from "../../public/icons/leftArrowIcon.svg";
import HeartIcon from "../../public/icons/heartIcon.svg";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
function BookDetail({ data, productImg }) {
  const router = useRouter();
  const token = useSelector((state) => state.token);
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [router, token]);
  return (
    <div className="flex flex-col w-full h-screen py-2 ">
      <Navbar />
      <div className="flex flex-col py-[40px] px-[60px] ">
        <div className="flex items-center w-full">
          <Link href={"/home"}>
            <Image
              src={LeftArrowIcon}
              alt="back"
              onClick={() => router.back()}
            />
          </Link>
          <h1 className="text-[#090937] text-[24px] font-[700] ml-4">
            Book Detais
          </h1>
        </div>
        <div className="flex flex-col w-full h-full my-[31px]  overflow-hidden ">
          <div className="flex">
            <div className="flex w-[420px] h-[570px] justify-center bg-[#F4F4FF] p-[50px] border-[1px] border-solid rounded">
              <Image
                src={productImg}
                width={"300"}
                height={"400"}
                alt="product"
                className="object-cover"
              />
            </div>
            {/* info */}
            <div className="flex flex-col w-[820px] ml-20 mr-[60px]">
              {/* Book name row */}
              <div className="flex justify-between mb-24">
                <div className="flex flex-col">
                  <h2 className="text-[#000] text-[40px] font-[600] ">
                    {data.name.charAt(0).toUpperCase() + data?.name.slice(1)}
                  </h2>
                  <h2 className="text-[#00000099] text-[32px] font-[600]">
                    {data.author}
                  </h2>
                </div>
                <div className="flex items-center justify-center w-11 h-11 bg-[#F4F4FF] rounded-full">
                  <Image src={HeartIcon} alt="like" className="cursor-pointer"/>
                </div>
              </div>

              {/* description */}
              <p className="text-[#09093799] text-xl font-[400] text-justify">
                {data.description}
              </p>
              {/* button */}
              <div className="flex w-full items-center justify-end mt-[188px] ">
                <button className="flex justify-between items-center px-5 py-[10px] rounded w-[400px] h-[60px] text-[#FFF] text-xl font-[600] bg-[#EF6B4A]">
                  <span>{data.price} $</span>
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;

export async function getServerSideProps(context) {
  const { id, categoryId } = context.query;
  const productRes = await fetch(
    `https://assign-api.piton.com.tr/api/rest/products/${categoryId}`
  );
  const { product } = await productRes.json();
  const book = product.find((item) => item.id.toString() === id);
  const imgRes = await fetch(
    "https://assign-api.piton.com.tr/api/rest/cover_image",
    {
      method: "POST",
      body: JSON.stringify({
        fileName: book.cover,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const { action_product_image } = await imgRes.json();
  const productImg = action_product_image.url;
  return {
    props: {
      data: book,
      productImg,
    },
  };
}
