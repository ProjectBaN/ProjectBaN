import React from 'react';
function BestProductCard(props) {
  return (
    <div className="w-full flex flex-col card p-MbSm ">
      <img src={props.imageProps.imgurl} alt="" className="max-w-full mb-MbSm" />
      <p className="mb-MbSm font-bold">{props.imageProps.names}</p>
      <p className="mb-MbSm">{props.imageProps.price}</p>
    </div>
  );
}

export default BestProductCard;
