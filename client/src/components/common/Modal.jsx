import React from 'react';

function Modal({ modal, setModal, title, contents }) {
  return (
    modal && (
      <div className="w-screen h-screen absolute  top-0 flex items-center before:contents-['a'] before:w-screen before:bg-black before:h-screen before:absolute before:opacity-60 ">
        <div className="w-80 h-96 p-PcMd relative z-10 bg-white m-auto">
          <div className="h-16 flex justify-between items-center border-b-2 border-gray-600 border-solid">
            <p className="font-bold">{title}</p>
            <button className="text-start font-bold text-xl" onClick={() => setModal(false)}>
              X
            </button>
          </div>
          <p className="mt-PcMd h-60 overflow-y-scroll pr-4">
            {contents}
            {contents}
            {contents}
          </p>
        </div>
      </div>
    )
  );
}

export default Modal;
