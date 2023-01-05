import React from 'react';
import { Link } from 'react-router-dom';
function BestProductCard(props) {
  const starRating = props.imageProps.starRating;
  const testList = [1, 2, 3, 4, 5];

  return (
    <div className="w-full flex flex-col card">
      <Link to="">
        <img src={props.imageProps.imgUrl} alt="" className="w-full mb-MbSm  mx-auto " />
        <div className="p-MbSm ">
          <p className="text-lg font-bold">{props.imageProps.productPrice}</p>
          <p className="mt-MbSm text-sm  ">{props.imageProps.productName}</p>
          <div className="flex items-center gap-MbSm mt-MbSm ">
            {testList.map((star, index) => {
              if (starRating - star >= 0) {
                return <i key={index} className="fa-solid fa-star text-yellow-300"></i>;
              }
              if (starRating - star === -0.5) {
                return <i key={index} className="fa-solid fa-star-half-stroke text-yellow-300"></i>;
              } else if (starRating - star < 0) {
                return <i key={index} className="fa-regular fa-star"></i>;
              }
            })}
            <p>{'(' + props.imageProps.reviewCount + ')'}</p>
          </div>
          <div className="flex flex-row items-center gap-MbSm mt-MbSm ">
            <i className="fa-solid fa-money-bill"></i>
            <p>{props.imageProps.eventCoupon}</p>
            <i className="fa-solid fa-credit-card"></i>
            <p>{props.imageProps.cardSale}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BestProductCard;
