import React from 'react';

function GenderList({ genderList, genderButton, setGenderButton }) {
  const onGenderButtonClick = (e) => {
    e.preventDefault();
    setGenderButton(e.target.value);
  };
  return (
    <div className="w-full flex mt-PcSm border border-solid border-r-0">
      {genderList.map((gender) => (
        <div key={gender.idx} data-test={gender.idx} className="w-1/2 h-10 flex justify-center items-center  ">
          <button
            className={
              genderButton === gender.value ? 'w-full h-10 bg-black text-white' : 'w-full h-10  border border-r-black'
            }
            name="gender"
            value={gender.value}
            onClick={onGenderButtonClick}
          >
            {gender.title}
          </button>
        </div>
      ))}
    </div>
  );
}

export default GenderList;
