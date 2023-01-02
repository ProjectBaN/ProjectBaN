import React from 'react';

function AllTermListCheck({ checked, onChange }) {
  return (
    <div className="h-20 flex items-center justify-start">
      <input
        className="appearance-none bg-contain w-8 h-8 checked:bg-hero-pattern checked:bg-blue-600 checked:border-transparent border-2 border-solid border-black"
        type="checkbox"
        name=""
        id=""
        checked={checked}
        onChange={onChange}
      />
      <p className="mx-PcSm">모두 동의</p>
    </div>
  );
}

export default AllTermListCheck;
