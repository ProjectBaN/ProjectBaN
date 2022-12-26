import React from 'react';
import FooterCustomerCenter from './FooterCustomerCenter';
import FooterAboutUs from './FooterAboutUs';

function Footer() {
  return (
    <div className="flex w-pcContainer ml-auto mr-auto">
      <FooterAboutUs />
      <FooterCustomerCenter />
    </div>
  );
}

export default Footer;
