import React from 'react';
import ProductSection from '../components/ProductSection.jsx';
import SimpleBrandBar from '../components/SimpleBrandBar.jsx';


export default function Home() {
  return (
    <div className="min-h-screen">
         <ProductSection/>
         <SimpleBrandBar/>
    </div>
  );
}


