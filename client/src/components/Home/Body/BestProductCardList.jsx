import React from 'react';

import BestProductCard from './BestProductCard';
import ProductTabMenu from './ProductTabMenu';

function BestProductCardList(props) {
  return (
    <div className="w-full mt-MbMedium">
      <div className="flex flex-col mt-PCbase px-MbSm">
        <p className="flex  justify-center font-subtitle text-xl font-bold ">베스트상품</p>
        <div className="flex justify-end items-center ">
          <a href="" className="text-sm font-subtitle">
            전체보기
          </a>
          <i className="fa-solid fa-circle-arrow-right pl-MbSm "></i>
        </div>
      </div>
      <div className="w-full flex flex-row flex-wrap  mt-MbMedium  gap-MbMedium text-xs px-MbSm ">
        {props.imageProps.map((bestProduct, index) => (
          <BestProductCard key={index} imageProps={bestProduct} />
        ))}
      </div>
    </div>
  );
}

export default BestProductCardList;
