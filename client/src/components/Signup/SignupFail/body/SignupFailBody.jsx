import React from 'react';
import { useLocation, useNavigate } from 'react-router';

function SignFailBody() {
  return (
    <main className="max-w-signUpContainer text-center m-auto">
      <svg
        fill="#ff0000"
        width="256px"
        height="256px"
        viewBox="0 -8 528 528"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ff0000"
        className="w-full m-auto"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <title>fail</title>
          <path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z"></path>
        </g>
      </svg>
      <p className="text-sm">일시적인 문제로 회원 가입에 실패하였습니다.</p>
      <p className="mt-MbSm text-sm">다시 회원가입 시도해주시길 바랍니다.</p>
      <a href="/signup" className=" h-12 bg-black text-white">
        돌아가기
      </a>
    </main>
  );
}

export default SignFailBody;
