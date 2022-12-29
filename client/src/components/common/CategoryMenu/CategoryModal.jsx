import React, { useState } from 'react';
import MobileCategoryMenu from './MobileCategoryMenu';

function CategoryModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <div>
      <button onClick={showModal}>
        <i className="text-2xl fas fa-bars mr-PCsm"></i>
      </button>
      {modalOpen && <MobileCategoryMenu setModalOpen={setModalOpen} />}
    </div>
  );
}

export default CategoryModal;
