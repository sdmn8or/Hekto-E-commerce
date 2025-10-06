import React from 'react';
import heroBannerImage from '../assets/hero.jpg'; 

export default function Banner() {
  const bannerImage = heroBannerImage; 


  const bannerStyle = {
    backgroundImage: bannerImage ? `url(${bannerImage})` : 'none',
  };
  
  return (
    <div className="min-h-screen">
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat min-h-[50vh] md:min-h-[765px] flex items-center bg-[#F6F5FF]" 
        style={bannerStyle}
      >
      </section>
    </div>
  );
}
