import React from 'react';

function GenderList({ genderList, OnChange }) {
  return (
    <div className="flex gap-PcSm mt-PcSm">
      {genderList.map((gender) => (
        <div key={gender.idx} data-test={gender.idx}>
          <input
            type="checkbox"
            name="gender"
            value={gender.value}
            onChange={OnChange}
            className="appearance-none bg-contain w-8 h-8 border-2 border-solid checked:bg-blue-400"
          />{' '}
          {gender.title}
        </div>
      ))}
    </div>
  );
}

export default GenderList;
