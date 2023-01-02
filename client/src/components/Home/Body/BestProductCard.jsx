import React from 'react';
function BestProductCard(props) {
  return (
    <div className="w-full flex flex-col card">
      <img src={props.imageProps.imgurl} alt="" className="max-w-full" />
      <p className="">{props.imageProps.names}</p>
      <p className="">{props.imageProps.price}</p>
    </div>
  );
}

export default BestProductCard;
