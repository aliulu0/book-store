import Navbar from "../../components/Navbar";
import React, { useEffect } from "react";
import LeftArrowIcon from "../../public/icons/leftArrowIcon.svg";
import Image from "next/image";
import Link from "next/link";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function CategoryDetail({ data, title, id }) {

  const router = useRouter();
  const auth = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  useEffect(() => {
    if(!auth || !token){
      router.push("/")
    }
  },[auth, router, token])

  return (
    <div className="flex flex-col w-full h-screen p-2">
      <Navbar />
      <div className="flex flex-col py-[40px] px-[60px] ">
        <div className="flex items-center w-full">
          <Link href={"/home"}>
            <Image src={LeftArrowIcon} alt="back" />
          </Link>
          <h1 className="text-[#090937] text-[24px] font-[700] ml-4">
            {title}
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-[25px]">
          {data.map((item) => (
            <Link
              key={item.id}
              href={{
                pathname: `/products/${item.id}`,
                query: {
                  categoryId: id,
                },
              }}
            >
              <Card
                item={item}
                cardDirection="col"
                descriptionDirection="row"
                imgWidth="200"
                imgHeight="250"
                cardWidth="min-w-[300px]"
                cardHeiht="h-[450px]"
                descriptionWith="w-[260px]"
                descriptionHeight="h-[70px]"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryDetail;

export async function getServerSideProps(context) {
  const { id, title } = context.query;
  const res = await fetch(
    `https://assign-api.piton.com.tr/api/rest/products/${id}`
  ).then((response) => response.json());
  return {
    props: {
      data: res.product,
      title,
      id,
    },
  };
}
