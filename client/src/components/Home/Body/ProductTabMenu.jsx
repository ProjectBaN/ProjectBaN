import React, { useState } from 'react';
import RecommendProductCard from './RecommendProductCard';

function ProductTabMenu(props) {
  const [toggleState, setToggleState] = useState('');

  console.log(props.recommendProductList);
  const recommendProductLists = props.recommendProductList;
  console.log(recommendProductLists);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="w-full mt-MbLarge lg:mt-PcBase mt-MbLarge md:px-MbSm">
      <div className="flex items-center justify-center lg:justify-start ">
        <p className="text-xl font-subtitle font-bold">추천상품</p>
      </div>
      <div className="w-full flex flex-row justify-center mt-PcSm">
        {props.tabs.map((tabMenu, index) => (
          <button
            className={toggleState === `${tabMenu.tabName}` ? 'w-full h-10 text-white bg-black  ' : 'w-full h-10'}
            key={index}
            onClick={() => toggleTab(tabMenu.tabName)}
          >
            {tabMenu.tabName}
          </button>
        ))}
      </div>

      <div>
        <RecommendProductCard recommendProductList={recommendProductLists} toggle={toggleState} />
      </div>
    </div>
  );
}

export default ProductTabMenu;
