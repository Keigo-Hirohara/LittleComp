import React from 'react';
import Navbar from './Navbar';

const Layout = ({children}: any): JSX.Element => {
  return (
    <>
      <Navbar />
      <div>
        
      </div>
      <div className="">
        {children}
      </div>
    </>
  );
};

export default Layout;