import React from 'react';
import Appbar from '../../components/Appbar';
import Footer from '../../components/Footer';

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <Appbar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;