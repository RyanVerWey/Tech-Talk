import React from 'react';
import { Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Container maxWidth="lg" className="py-8 min-h-screen">
        {children}
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Layout;