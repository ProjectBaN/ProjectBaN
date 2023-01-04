import React, { useState } from 'react';

function ProductTabMenu() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="w-full mt-MbMedium">
      <div className="flex justify-center">
        <p className="text-xl font-subtitle font-bold">추천상품</p>
      </div>
      <div className="w-full flex flex-row justify-center">
        <button
          className={toggleState === 1 ? 'w-full h-10 text-white bg-black  ' : 'w-full h-10'}
          onClick={() => toggleTab(1)}
        >
          네일
        </button>

        <button
          className={toggleState === 2 ? 'w-full h-10 text-white bg-black' : 'w-full h-10'}
          onClick={() => toggleTab(2)}
        >
          페디
        </button>

        <button
          className={toggleState === 3 ? 'w-full h-10 text-white bg-black' : 'w-full h-10'}
          onClick={() => toggleTab(3)}
        >
          큐티클
        </button>

        <button
          className={toggleState === 4 ? 'w-full h-10 text-white bg-black ' : 'w-full h-10'}
          onClick={() => toggleTab(4)}
        >
          스티커
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default ProductTabMenu;
