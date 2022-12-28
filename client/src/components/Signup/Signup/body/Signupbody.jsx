import React from 'react';

function Signupbody() {
  return (
    <main className="max-w-signUpContainer m-auto mt-PCbase flex flex-col items-center ">
      <div className="text-center">
        <p className="text-3xl font-bold ">회원가입</p>
        <p className="mt-PCbase">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui quia aperiam laborum asperiores. Amet eos totam
          harum rem consectetur hic iure dignissimos corrupti itaque quo vero, asperiores, accusamus est explicabo!
        </p>
      </div>

      <div className="mt-PCbase w-full text-center">
        <button className="w-2/3 h-12 rounded-sm shadow-customShadow  bg-neutral-600 text-white ">
          Git 깃허브 회원가입
        </button>
        <button className="w-2/3 h-12 rounded-sm shadow-customShadow  bg-green-600 text-white">
          N 네이버로 시작하기
        </button>
      </div>
    </main>
  );
}

export default Signupbody;
