import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
function AddressSearch({ setIsOpen, setAddress, address }) {
  const onCompletePost = (data) => {
    let fullAddress = data.address;

    setAddress({ ...address, addressName: fullAddress });
    setIsOpen(false);
  };
  const onClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const postcodeStyle = {
    height: '550px',
  };
  return (
    <div className="w-full h-full fixed left-0 top-0  text-center bg-[#ececec] md:w-full md:h-full md:bg-[#ececec]/0  ">
      <div className=" w-full h-14 flex justify-center items-center fixed right-0 text-white bg-[#4a5164]  m-auto md:w-AddressWindthContainer md:fixed md:left-0 md:right-0 md:top-DaumPostCodeHeader ">
        <span className="w-AddressWindthContainer">주소찾기</span>
        <button onClick={onClick} className="p-PcSm">
          <i className="fa-solid fa-xmark fa-xl "></i>
        </button>
        <div className="w-full fixed top-14  m-auto p-PcSm md:w-AddressWindthContainer md:fixed md:top-DaumPostCodeBody md:border md:border-solid md:p-PcSm md:border-black md:bg-[#ececec]">
          <DaumPostcode onComplete={onCompletePost} style={postcodeStyle} className="mt-PcSm" />
        </div>
      </div>
    </div>
  );
}

export default AddressSearch;
