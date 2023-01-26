import React from 'react';

function GenderList({ genderList, onChange, genderButton }) {
  return (
    <div className="w-full flex mt-PcSm border border-solid border-r-0">
      {genderList.map((gender) => (
        <div key={gender.idx} data-test={gender.idx} className="w-1/2 h-10 flex justify-center items-center  ">
          {/* <input
            type="checkbox"
            name="gender"
            value={gender.value}
            onChange={OnChange}
            className="appearance-none bg-contain w-8 h-8 border-2 border-solid checked:bg-blue-400"
          />
          {gender.title} */}
          <button
            className={
              genderButton === gender.value ? 'w-full h-10 bg-black text-white' : 'w-full h-10  border border-r-black'
            }
            name="gender"
            value={gender.value}
            onClick={onChange}
          >
            {gender.title}
          </button>
        </div>
      ))}
    </div>
  );
}

export default GenderList;
