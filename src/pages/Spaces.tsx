
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SpacesContainer from '@/components/spaces/SpacesContainer';

const Spaces = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pb-12">
        <SpacesContainer />
      </main>

      <Footer />
    </>
  );
};

export default Spaces;
