import React, { useState } from 'react';
import RecommendProductCard from './RecommendProductCard';

function ProductTabMenu(props) {
  const [toggleState, setToggleState] = useState('');
  const tabs = props.tabs;

  console.log(tabs);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="w-full flex flex-col mt-MbLarge lg:mt-PcBase mt-MbLarge md:px-MbSm">
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
      {tabs.map((contents, index) => (
        <div className={toggleState === `${contents.tabName}` ? 'block w-full  mt-PcSm ' : 'hidden'} key={index}>
          {toggleState === `${contents.tabName}` ? <RecommendProductCard tabs={contents} /> : ''}
        </div>
      ))}
    </div>
  );
}

export default ProductTabMenu;
