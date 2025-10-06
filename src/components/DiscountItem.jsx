import React from 'react';
import { Check } from 'lucide-react';


import discountChairImage from '../assets/eams-sofa-chair.png'; 


const tabs = ['Wood Chair', 'Plastic Chair', 'Sofa Collection'];


const checklistItems = [
    'Material expose like metals',
    'Simple neutral colours.',
    'Clear lines and geomatric figures',
    'Material expose like metals',
];

export default function DiscountItem() {
    
    const [activeTab, setActiveTab] = React.useState(tabs[0]);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                
                <h2 className="text-4xl font-bold text-center text-[#1A0B5B] mb-6">
                    Discount Item
                </h2>
                <div className="flex justify-center space-x-6 mb-16">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-md pb-1 transition-colors duration-200 ${
                                activeTab === tab
                                    ? 'text-[#FB2E86] border-b-2 border-[#FB2E86] font-semibold'
                                    : 'text-gray-500 hover:text-[#FB2E86]'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 p-8 rounded-lg border-2 border-transparent">
                    
                 
                    <div className="order-2 lg:order-1">
                        <h3 className="text-3xl font-bold text-[#1A0B5B] mb-4 leading-snug">
                            20% Discount Of All Products
                        </h3>
                        <p className="text-[#FB2E86] font-medium mb-4">
                            Eams Sofa Compact
                        </p>
                        <p className="text-gray-500 mb-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.
                        </p>

                       
                        <div className="grid grid-cols-2 gap-y-4 mb-10">
                            {checklistItems.map((item, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                    <Check size={18} className="text-[#FB2E86] mt-1" />
                                    <span className="text-sm text-gray-500">{item}</span>
                                </div>
                            ))}
                        </div>

                       
                        <button className="bg-[#FB2E86] text-white font-semibold py-3 px-10 rounded-md transition-opacity duration-300 hover:opacity-90">
                            Shop Now
                        </button>
                    </div>

                    
                    <div className="order-1 lg:order-2 flex justify-center items-center relative min-h-[400px]">
                        
                       
                        <div className="absolute w-[450px] h-[450px] bg-[#FEEFF9] rounded-full opacity-80" style={{ mixBlendMode: 'multiply' }}></div>
                        
                        
                        <img 
                            src={discountChairImage} 
                            alt="Eams Sofa Compact discounted" 
                            className="relative z-10 w-full max-w-sm h-auto object-contain"
                        />
                        
                       
                    </div>
                </div>
            </div>
        </section>
    );
}