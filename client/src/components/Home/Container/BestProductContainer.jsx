import React from 'react';
import BestProductCardList from '../Body/BestProductCardList';
function BestProductContainer() {
  const imageTest = [
    {
      imgUrl: '/images/product1.jpg',
      productName: '노트북 플러스2 NT550XDA-K24AG SSD 256GB',
      productPrice: '651,570원',
      eventCoupon: '10% 쿠폰',
      cardSale: '카드 7%',
      purchaseCount: '1,534',
      starRating: '1',
      reviewCount: '1,522',
    },
    {
      imgUrl: '/images/product2.jpg',
      productName: '삼성전자 노트북 플러스2 NT550XDA-KC35W',
      productPrice: '1,050,000원',
      eventCoupon: '10% 쿠폰',
      cardSale: '카드 7%',
      purchaseCount: '1,832',
      starRating: '1.5',
      reviewCount: '1,132',
    },
    {
      imgUrl: '/images/product3.jpg',
      productName: 'CJ 햇반 200g 24개입 1박스',
      productPrice: '29,900원',
      eventCoupon: '10% 쿠폰',
      cardSale: '카드 7%',
      purchaseCount: '1,224',
      starRating: '4',
      reviewCount: '1,224',
    },
    {
      imgUrl: '/images/product4.jpg',
      productName: '석관동 떡볶이 520g X 5개 ',
      productPrice: '23,990원',
      eventCoupon: '10% 쿠폰',
      cardSale: '카드 7%',
      purchaseCount: '1,562',
      starRating: '4.5',
      reviewCount: '3,232',
    },
    {
      imgUrl: '/images/product5.jpg',
      productName: '유튜버 극찬! 인기모음전 zd8 울트라맥스',
      productPrice: '31,190원',
      eventCoupon: '10% 쿠폰',
      cardSale: '카드 7%',
      purchaseCount: '10,534',
      starRating: '5',
      reviewCount: '2,232',
    },
    {
      imgUrl: '/images/product6.jpg',
      productName: '[웰던푸드]호주산 LA갈비 1kg x 4팩',
      productPrice: '86,530원',
      eventCoupon: '10% 쿠폰',
      cardSale: '카드 7%',
      purchaseCount: '3,451',
      starRating: '3.5',
      reviewCount: '5,232',
    },
  ];

  return <BestProductCardList imageProps={imageTest} />;
}

export default BestProductContainer;
