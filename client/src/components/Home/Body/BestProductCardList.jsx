import React from 'react';

import BestProductCard from './BestProductCard';

function BestProductCardList(props) {
  return (
    <div className="w-full py-MbSm">
      <div className="flex flex-col mt-PCbase px-PcSm">
        <p className="self-start font-subtitle text-lg font-bold ">베스트상품</p>
        <div className="flex justify-end items-center ">
          <a href="" className="font-subtitle">
            전체보기
          </a>
          <i className="fa-solid fa-circle-arrow-right pl-MbSm "></i>
        </div>
      </div>
      <div className="w-full flex flex-row flex-wrap gap-MbMedium text-xs p-PcSm  ">
        {props.imageProps.map((bestProduct, index) => (
          <BestProductCard key={index} imageProps={bestProduct} />
        ))}
      </div>
    </div>
  );
}

export default BestProductCardList;
