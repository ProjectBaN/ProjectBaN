import React from 'react';
import { useSearchParams } from 'react-router-dom';
import EventBannerContainer from '../../common/EventBannerContainer/EventBannerContainer';
import ProductSearchContainer from '../Container/ProductSearchContainer';
import ProductSearchCardList from './ProductSearchCardList';

function ProductSearchBody() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchKeword = searchParams.get('searchKeyword');
  return (
    <div className="mt-MbSm ">
      <EventBannerContainer />
      <div className="lg:w-PcContainer mt-MbSm px-MbSm mx-auto">
        <h2 className="text-xl text-center border-b-2 border-t-2 border-solid ">{searchKeword}</h2>
        <ProductSearchContainer />
      </div>
    </div>
  );
}

export default ProductSearchBody;
