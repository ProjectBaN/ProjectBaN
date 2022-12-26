import React from 'react';
import BestProductCardList from '../Body/BestProductCardList';
function BestProductContainer() {
  const imageTest = [
    {
      imgurl: '/images/product1.jpg',
      names: '상품1',
      price: '10000원',
    },
    {
      imgurl: '/images/product2.jpg',
      names: '상품2',
      price: '30000원',
    },
  ];

  return <BestProductCardList imageProps={imageTest} />;
}

export default BestProductContainer;
