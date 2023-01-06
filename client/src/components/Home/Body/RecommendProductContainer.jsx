import React from 'react';
import ProductTabMenu from './ProductTabMenu';

function RecommendProductContainer() {
  const tabs = [
    {
      tabName: '네일',
      List: [
        {
          imgUrl: '/images/nail.jpg',
          productName: '노트북 플러스 2! NT550XDA-K24AG SSD 256GB',
          productPrice: '651,570원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,534',
          starRating: '1',
          reviewCount: '1,522',
        },
        {
          imgUrl: '/images/nail.jpg',
          productName: '노트북 플러스2 NT550XDA-KC35W',
          productPrice: '1,050,000원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,832',
          starRating: '1.5',
          reviewCount: '1,132',
        },
        {
          imgUrl: '/images/nail.jpg',
          productName: 'CJ 햇반 200g 24개입 1박스',
          productPrice: '29,900원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,224',
          starRating: '4',
          reviewCount: '1,224',
        },
        {
          imgUrl: '/images/nail.jpg',
          productName: '석관동 떡볶이 520g X 5개 ',
          productPrice: '23,990원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,562',
          starRating: '4.5',
          reviewCount: '3,232',
        },
      ],
    },
    {
      tabName: '페디',
      List: [
        {
          imgUrl: '/images/fedi.jpg',
          productName: '노트북 플러스 2! NT550XDA-K24AG SSD 256GB',
          productPrice: '651,570원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,534',
          starRating: '1',
          reviewCount: '1,522',
        },
        {
          imgUrl: '/images/fedi.jpg',
          productName: '노트북 플러스2 NT550XDA-KC35W',
          productPrice: '1,050,000원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,832',
          starRating: '1.5',
          reviewCount: '1,132',
        },
        {
          imgUrl: '/images/fedi.jpg',
          productName: 'CJ 햇반 200g 24개입 1박스',
          productPrice: '29,900원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,224',
          starRating: '4',
          reviewCount: '1,224',
        },
        {
          imgUrl: '/images/fedi.jpg',
          productName: '석관동 떡볶이 520g X 5개 ',
          productPrice: '23,990원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,562',
          starRating: '4.5',
          reviewCount: '3,232',
        },
      ],
    },
    {
      tabName: '큐티클',
      List: [
        {
          imgUrl: '/images/cuticle.jpg',
          productName: '노트북 플러스 2! NT550XDA-K24AG SSD 256GB',
          productPrice: '651,570원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,534',
          starRating: '1',
          reviewCount: '1,522',
        },
        {
          imgUrl: '/images/cuticle.jpg',
          productName: '노트북 플러스2 NT550XDA-KC35W',
          productPrice: '1,050,000원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,832',
          starRating: '1.5',
          reviewCount: '1,132',
        },
        {
          imgUrl: '/images/cuticle.jpg',
          productName: 'CJ 햇반 200g 24개입 1박스',
          productPrice: '29,900원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,224',
          starRating: '4',
          reviewCount: '1,224',
        },
        {
          imgUrl: '/images/cuticle.jpg',
          productName: '석관동 떡볶이 520g X 5개 ',
          productPrice: '23,990원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,562',
          starRating: '4.5',
          reviewCount: '3,232',
        },
      ],
    },
    {
      tabName: '스티커',
      List: [
        {
          imgUrl: '/images/sticker.jpg',
          productName: '노트북 플러스 2! NT550XDA-K24AG SSD 256GB',
          productPrice: '651,570원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,534',
          starRating: '1',
          reviewCount: '1,522',
        },
        {
          imgUrl: '/images/sticker.jpg',
          productName: '노트북 플러스2 NT550XDA-KC35W',
          productPrice: '1,050,000원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,832',
          starRating: '1.5',
          reviewCount: '1,132',
        },
        {
          imgUrl: '/images/sticker.jpg',
          productName: 'CJ 햇반 200g 24개입 1박스',
          productPrice: '29,900원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,224',
          starRating: '4',
          reviewCount: '1,224',
        },
        {
          imgUrl: '/images/sticker.jpg',
          productName: '석관동 떡볶이 520g X 5개 ',
          productPrice: '23,990원',
          eventCoupon: '10% 쿠폰',
          cardSale: '카드 7%',
          purchaseCount: '1,562',
          starRating: '4.5',
          reviewCount: '3,232',
        },
      ],
    },
  ];

  return (
    <div>
      <ProductTabMenu tabs={tabs} />
    </div>
  );
}

export default RecommendProductContainer;
