import React from 'react';
import FooterCustomerCenter from './FooterCustomerCenter';
import FooterAboutUs from './FooterAboutUs';
import FooterCopyRight from './FooterCopyRight';

function Footer() {
  return (
    <div className="lg:w-PcContainer md:mx-auto flex flex-col justify-center  text-xs p-MbSm ">
      <div className="lg:1/3 lg:flex lg:justify-between md:1/2 md:flex md:justify-between">
        <FooterAboutUs />
        <div className="hidden  md:block lg:block lg:w-1/3 md:w-1/2  ">
          <FooterCustomerCenter />
        </div>
      </div>

      <div className="lg:w-PcContainer lg:mx-auto  lg:flex lg:justify-start mt-MbMedium ">
        <FooterCopyRight />
      </div>
    </div>
  );
}

export default Footer;
