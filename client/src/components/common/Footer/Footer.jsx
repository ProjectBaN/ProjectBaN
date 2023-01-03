import React from 'react';
import FooterCustomerCenter from './FooterCustomerCenter';
import FooterAboutUs from './FooterAboutUs';
import FooterCopyRight from './FooterCopyRight';

function Footer() {
  return (
    <div className="flex flex-col justify-center bg-[#474747] text-xs p-MbSm ">
      <FooterAboutUs />
      <div className="mt-MbSm">
        <FooterCopyRight />
      </div>
      <div className="hidden">
        <FooterCustomerCenter />
      </div>
    </div>
  );
}

export default Footer;
