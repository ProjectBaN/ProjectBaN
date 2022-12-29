import React from 'react';
import { useLocation } from 'react-router-dom';

function JoinFormBody() {
  const location = useLocation();
  return <div>JoinFormBody {location.state}</div>;
}

export default JoinFormBody;
