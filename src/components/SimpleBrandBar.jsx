import React from 'react';
import brandLogosImage from '../assets/brand-logos.png'; 

export default function SimpleBrandBar() {
    return (
       
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-center items-center">
                  
                    <img 
                        src={brandLogosImage} 
                        alt="Partner Brand Logos" 
                       
                        className="w-full h-auto max-w-5xl object-contain opacity-70"
          
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x80/EFEFEF/999999?text=Insert+Logos+Asset+Here" }}
                    />
                </div>
            </div>
        </section>
    );
}