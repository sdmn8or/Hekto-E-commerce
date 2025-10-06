import React from 'react';
import backgroundImage from '../assets/newsletter-bg.png'; 
import brandLogosImage from '../assets/brand-logos.png';

export default function NewsletterAndBrands() {
    
    const handleSubscribe = () => {
        console.log("Subscription button clicked! Implement API call here.");
        
    };

    return (
        <section className="bg-white">
          
            <div 
                className="relative bg-cover bg-center py-20 md:py-32 flex items-center justify-center text-center"
                style={{ 
                    
                    backgroundImage: `url(${backgroundImage})`,
                   
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}
            >
                
                <div className="z-10 p-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1A0B5B] mb-2 leading-tight">
                        Get Latest Update By Subscribe
                    </h2>
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#1A0B5B] mb-8 leading-tight">
                        Our Newsletter
                    </h3>
                    
                   
                    <button 
                        onClick={handleSubscribe}
                        className="bg-[#FB2E86] text-white font-semibold py-3 px-10 rounded-md transition-opacity duration-300 hover:opacity-90 shadow-none"
                    >
                        Shop Now
                    </button>
                </div>
                
             
            </div>

           
            <div className="py-12 md:py-16 container mx-auto px-4 max-w-7xl">
                <div className="flex justify-center items-center">
                  
                    <img 
                        src={brandLogosImage} 
                        alt="Partner Brand Logos" 
                        
                        className="w-full h-auto max-w-6xl object-contain opacity-70"
                    />
                    
                    
                </div>
            </div>
        </section>
    );
}