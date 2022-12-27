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
    {
      imgurl: '/images/product3.jpg',
      names: '상품3',
      price: '29000원',
    },
    {
      imgurl: '/images/product4.jpg',
      names: '상품4',
      price: '32000원',
    },
    {
      imgurl: '/images/product5.jpg',
      names: '상품5',
      price: '35000원',
    },
  ];

  return <BestProductCardList imageProps={imageTest} />;
}

export default BestProductContainer;
