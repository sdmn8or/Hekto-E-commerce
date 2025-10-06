import React from 'react';
import promoBannerImage from '../assets/promo-banner-placeholder.png'; 

export default function Ufltp() {
    return (   
        <section className="bg-[#F1F0FF] py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-center items-center">
                    <img 
                        src={promoBannerImage} 
                        alt="Promotional Banner" 
                        className="w-full max-w-5xl h-auto rounded-lg"
                        style={{ maxWidth: '1200px' }}
                    />
                </div>
            </div>
        </section>
    );
}