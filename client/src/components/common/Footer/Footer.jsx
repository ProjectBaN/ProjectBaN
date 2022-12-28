import React from 'react';
import FooterCustomerCenter from './FooterCustomerCenter';
import FooterAboutUs from './FooterAboutUs';

function Footer() {
  return (
    <div className="  bg-[#474747] ml-auto mr-auto relative ">
      <FooterAboutUs />
      <FooterCustomerCenter />
    </div>
  );
}

export default Footer;
