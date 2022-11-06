import React from 'react';
import { Triangle } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="loader">
      <Triangle
        height="80"
        width="80"
        color="rgb(19, 31, 84)"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
        wrapperClass="loader__wrapper"
      />
    </div>
  );
};

export default Loader;
