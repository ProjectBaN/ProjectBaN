import React from 'react';
import FooterCustomerCenter from './FooterCustomerCenter';
import FooterAboutUs from './FooterAboutUs';

function Footer() {
  return (
    <div className="w-pcContainer ml-auto mr-auto">
      <div className="flex">
        <FooterAboutUs />
        <FooterCustomerCenter />
      </div>
    </div>
  );
}

export default Footer;
