import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function JoinFormBody() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      alert('비정상적인 접근입니다.');
      navigate('/signup');
    }

    return () => {};
  });

  return (
    <main className="max-w-signUpContainer m-auto mt-PCbase flex flex-col items-center bg-red-500">
      JoinFormBody {location.state}
    </main>
  );
}

export default JoinFormBody;
