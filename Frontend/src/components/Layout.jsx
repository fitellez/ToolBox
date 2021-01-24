import React from 'react';

const Layout = ({ children }) => {

  return (
    <>
      <div id='wrapper'>
        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
                { children }
          </div>
        </div>
      </div>

      <a className='scroll-to-top rounded' href='#page-top'>
        <i className='fas fa-angle-up' />
      </a>
    </>
  );
};

export default Layout;
