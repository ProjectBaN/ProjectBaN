import React from 'react';
import { Link } from 'react-router-dom';

function RecommendProductCard(props) {
  const testList = [1, 2, 3, 4, 5];
  console.log(props);
  return (
    <div>
      {props.tabs.List.map((test, index) => (
        <div className=" w-full flex flex-col card" key={index}>
          <Link to="">
            <div className=" lg:h-[360px]">
              <img src={test.imgUrl} alt="" className="w-full mb-MbSm  mx-auto " />
            </div>
            <div className="p-MbSm mt-PcSm  ">
              <p className=" text-sm h-9  ">{test.productName}</p>
              <div className="flex items-center gap-MbSm mt-PcSm ">
                {testList.map((star, index) => {
                  if (test.starRating - star >= 0) {
                    return <i key={index} className="fa-solid fa-star text-yellow-300"></i>;
                  }
                  if (test.starRating - star === -0.5) {
                    return <i key={index} className="fa-solid fa-star-half-stroke text-yellow-300"></i>;
                  } else if (test.starRating - star < 0) {
                    return <i key={index} className="fa-regular fa-star"></i>;
                  }
                })}
                <p>{'(' + test.reviewCount + ')'}</p>
              </div>
              <div className="flex flex-row items-center gap-MbSm  pt-PcSm">
                <i className="fa-solid fa-money-bill"></i>
                <p>{test.eventCoupon}</p>
                <i className="fa-solid fa-credit-card"></i>
                <p>{test.cardSale}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RecommendProductCard;
