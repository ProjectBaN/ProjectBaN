import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
function AddressSearch({ setIsOpen }) {
  const [address, setAddress] = useState(''); // 주소
  const [addressDetail, setAddressDetail] = useState(''); // 상세주소

  const onCompletePost = (data) => {
    console.log(data);
    setIsOpen(false);
  };
  const onClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <div className="w-2/6 fixed top-56">
      <div className="">
        <button onClick={onClick}>
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
      </div>

      <div>
        <DaumPostcode onComplete={onCompletePost} />
      </div>
    </div>
  );
}

export default AddressSearch;
