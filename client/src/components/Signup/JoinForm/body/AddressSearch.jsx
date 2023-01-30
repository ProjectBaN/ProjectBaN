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
  console.log(address);
  return (
    <div className="w-full h-full left-0  top-0 fixed text-center  bg-black/20">
      <div className="w-2/6 m-auto fixed top-1/4 left-1/3">
        <button onClick={onClick} className="w-full flex justify-end">
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
        <DaumPostcode onComplete={onCompletePost} className="mt-PcSm" />
      </div>
    </div>
  );
}

export default AddressSearch;
