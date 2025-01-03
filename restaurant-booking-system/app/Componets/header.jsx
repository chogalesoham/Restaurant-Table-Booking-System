import React from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="  px-10 py-3 shadow-lg fixed top-0 left-0 right-0 bg-white z-10">
      <div className=" container mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={Logo}
            width={250}
            height={200}
            alt="logo"
            className="object-cover cursor-pointer"
          />
        </Link>

        <button className=" bg-black p-3 rounded-lg text-sm text-white font-bold hover:bg-slate-600 cursor-pointer">
          Your Tables
        </button>
      </div>
    </header>
  );
};

export default Header;
