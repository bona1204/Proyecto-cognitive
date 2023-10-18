import React from 'react';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import '../styles/Home.css';

export function Home() {
  return (
    <div className="home">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

