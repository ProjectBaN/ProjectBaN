import React from 'react';

function MobileCategoryMenu({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="w-full h-full absolute bg-gray-400  ">
      <button onClick={closeModal} className="text-2xl flex justify-end">
        X
      </button>
      <div className=" ">asdasd</div>
      <div className=""></div>
      <div className=""></div>
    </div>
  );
}

export default MobileCategoryMenu;
