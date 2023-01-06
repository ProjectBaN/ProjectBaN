import React from 'react';
import ProductSearchBody from '../../components/ProductSearch/body/ProductSearchBody';
import ProductSearchFooter from '../../components/ProductSearch/footer/ProductSearchFooter';
import ProductSearchHeader from '../../components/ProductSearch/header/ProductSearchHeader';

function ProductSearch() {
  return (
    <div>
      <ProductSearchHeader />
      <ProductSearchBody />
      <ProductSearchFooter />
    </div>
  );
}

export default ProductSearch;
