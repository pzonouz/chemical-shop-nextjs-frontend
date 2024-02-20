import React from "react";
import { BsChat } from "react-icons/bs";
import { PiTelegramLogoThin } from "react-icons/pi";
import { LiaWhatsapp } from "react-icons/lia";
import { PiInstagramLogo } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="w-full bg-base-200 mt-6 p-3 flex flex-col gap-3">
      <div
        tabIndex={0}
        className="collapse collapse-plus border border-base-300 bg-base-300"
      >
        <div className="collapse-title text-md font-bold">
          دسته بندی محصولات
        </div>
        <div className="collapse-content font-medium">
          <p className="">محصولات نانو</p>
        </div>
      </div>
      <div
        tabIndex={0}
        className="collapse collapse-plus border border-base-300 bg-base-300"
      >
        <div className="collapse-title text-md font-bold">اطلاعات فروشگاه</div>
        <div className="collapse-content font-medium">
          <p>محصولات نانو</p>
        </div>
      </div>
      <div
        tabIndex={0}
        className="collapse collapse-plus border border-base-300 bg-base-300"
      >
        <div className="collapse-title text-md font-bold">پشتیبانی آنلاین</div>
        <div className="collapse-content font-light">
          <div className="flex flex-row items-center gap-2">
            <BsChat />
            <div>چت آنلاین</div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <PiTelegramLogoThin />
            <div>پشتیبانی تلگرام</div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <LiaWhatsapp />
            <div>پشتیبانی واتساپ</div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <PiInstagramLogo />
            <div>پشتیبانی اینستاگرام</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
