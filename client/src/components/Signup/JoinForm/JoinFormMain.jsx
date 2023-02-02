import React from 'react';
import SignupHeader from '../../common/Signup/SignupHeader';
import JoinBody from './body/JoinBody';
import JoinFooter from './JoinFooter';

function JoinFormMain() {
  return (
    <div>
      <SignupHeader />
      <JoinBody />
      {/* <JoinFooter /> */}
    </div>
  );
}

export default JoinFormMain;
