import React from 'react';
import BestProductCardList from '../Body/BestProductCardList';
function BestProductContainer() {
  const imageTest = [
    {
      imgurl: '/images/product1.jpg',
      names: '노트북 플러스2 NT550XDA-K24AG SSD 256GB',
      price: '651,570원',
    },
    {
      imgurl: '/images/product2.jpg',
      names: '삼성전자 노트북 플러스2 NT550XDA-KC35W',
      price: '1,050,000원',
    },
    {
      imgurl: '/images/product3.jpg',
      names: 'CJ 햇반 200g 24개입 1박스',
      price: '29,900원',
    },
    {
      imgurl: '/images/product4.jpg',
      names: '석관동 떡볶이 520g X 5개 ',
      price: '23,990원',
    },
    {
      imgurl: '/images/product5.jpg',
      names: '유튜버 극찬! 인기모음전 zd8 울트라맥스',
      price: '31,190원',
    },
    {
      imgurl: '/images/product6.jpg',
      names: '[웰던푸드]호주산 LA갈비 1kg x 4팩',
      price: '86,530원',
    },
  ];

  return <BestProductCardList imageProps={imageTest} />;
}

export default BestProductContainer;
