import React from 'react';
function BestProductCard(props) {
  console.log(props.imageProps);
  return (
    <div className="flex flex-col gap-PCsm card ">
      <img src={props.imageProps.imgurl} alt="" />
      <p className="p-PCsm text-sm ">{props.imageProps.names}</p>
      <p className="p-PCsm text-base  font-bold">{props.imageProps.price}</p>
    </div>
  );
}

export default BestProductCard;
