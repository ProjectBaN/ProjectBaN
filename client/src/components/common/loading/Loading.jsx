import React from 'react';

import loadingbar from '../../../asset/images/loading.gif';

function Loading() {
  return (
    <div className="flex justify-center items-center ">
      <div>
        <img src={loadingbar} alt="Loading" />
      </div>
    </div>
  );
}

export default Loading;
