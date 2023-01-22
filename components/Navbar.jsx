import Image from "next/image";
import React from "react";
import SearchIcon from "../public/icons/searchIcon.svg";
import UserIcon from "../public/icons/userIcon.svg";
import HeartIcon from "../public/icons/heartIcon.svg";
import CartIcon from "../public/icons/cartIcon.svg";
import Logo from "../public/images/logo.png";
function Navbar() {
  return (
    <div className="flex items-center w-full h-[120px] py-0 px-[60px] justify-between shadow-sm ">
      <Image className="w-[60px] h-[39px]" src={Logo} alt="logo" />
      <div className="relative flex items-center">
        <Image
          className="absolute left-[20px] w-[16px] h-[16px]"
          src={SearchIcon}
          alt="search"
        />
        <input
          className="py-[10px] px-[50px] rounded-[4px] bg-[#F4F4FF] w-[800px] h-[50px]"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center">
        <div className="w-[50px] h-[50px] bg-[#F4F4FF] rounded-[4px] flex items-center justify-center cursor-pointer">
          <Image className="" src={UserIcon} alt="user" />
        </div>
        <div className="w-[50px] h-[50px] bg-[#F4F4FF] rounded-[4px] mx-[16px] flex items-center justify-center cursor-pointer">
          <Image className="" src={HeartIcon} alt="heart" />
        </div>
        <div className="w-[50px] h-[50px] bg-[#F4F4FF] rounded-[4px] flex items-center justify-center cursor-pointer">
          <Image className="" src={CartIcon} alt="cart" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
