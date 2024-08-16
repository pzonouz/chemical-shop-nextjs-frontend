import React from "react";
import { FaPhone } from "react-icons/fa";
import { FaMobileRetro } from "react-icons/fa6";
import { PiTelegramLogoThin } from "react-icons/pi";
import { LiaWhatsapp } from "react-icons/lia";
import { PiInstagramLogo } from "react-icons/pi";
import { Store } from "@/app/types";

const Footer = ({ store }: { store: Store }) => {
  return (
    <div className="w-full bg-base-200 mt-6 p-3 flex flex-col gap-3">
      {/* <div */}
      {/*   tabIndex={0} */}
      {/*   className="collapse collapse-plus border border-base-300 bg-base-300" */}
      {/* > */}
      {/*   <div className="collapse-title text-md font-bold"> */}
      {/*     دسته بندی محصولات */}
      {/*   </div> */}
      {/*   <div className="collapse-content font-medium"> */}
      {/*     <p className="">محصولات نانو</p> */}
      {/*   </div> */}
      {/* </div> */}
      <div
        tabIndex={0}
        className="collapse collapse-plus border border-base-300 bg-base-300"
      >
        <div className="collapse-title text-md font-bold">درباره ما</div>
        <div className="collapse-content font-medium whitespace-pre-wrap">
          {store?.aboutus}
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4 rounded-2xl border border-base-300 bg-base-300">
        <div className="text-md font-bold">تماس باما</div>
        <div className="flex flex-row items-center gap-2">
          <FaPhone />
          <a href={`tel:${store?.phoneNumber}`}>{store?.phoneNumber}</a>
        </div>
        <div className="flex flex-row items-center gap-2">
          <FaMobileRetro />
          <a href={`tel:${store?.mobileNumber}`}>{store?.mobileNumber}</a>
        </div>
        <div className="flex flex-row items-center gap-2">
          <PiTelegramLogoThin />
          <a href={`https://t.me/${store?.telegram}`} target="_blank">
            پشتیبانی تلگرام
          </a>
        </div>
        <div className="flex flex-row items-center gap-2">
          <LiaWhatsapp />
          <a href={`https://wa.me/${store?.whatsapp}`} target="_blank">
            پشتیبانی واتساپ
          </a>
        </div>
        {/* <div className="flex flex-row items-center gap-2"> */}
        {/*   <PiInstagramLogo /> */}
        {/*   <div>پشتیبانی اینستاگرام</div> */}
        {/* </div> */}
      </div>
      <a
        referrerPolicy="origin"
        target="_blank"
        href="https://trustseal.enamad.ir/?id=516284&Code=OvAlmo0gDbclo1PpdIYJRA1VjuYMzQSA"
      >
        <img
          referrerPolicy="origin"
          src="https://trustseal.enamad.ir/logo.aspx?id=516284&Code=OvAlmo0gDbclo1PpdIYJRA1VjuYMzQSA"
          alt=""
          style={{ cursor: "pointer" }}
          data-code="OvAlmo0gDbclo1PpdIYJRA1VjuYMzQSA"
        />
      </a>
    </div>
  );
};

export default Footer;
