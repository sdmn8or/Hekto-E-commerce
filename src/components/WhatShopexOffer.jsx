import React from 'react';
import deliveryIcon from '../assets/shopex-truck.png'; 
import moneyBackIcon from '../assets/shopex-handshake.png';
import discountIcon from '../assets/shopex-award.png';
import supportIcon from '../assets/shopex-phonecall.png';


const offers = [
    {
        imageUrl: deliveryIcon, 
        title: 'Free Delivery',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.'
    },
    {
        imageUrl: moneyBackIcon,
        title: 'Money Back Guarantee',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.'
    },
    {
        imageUrl: discountIcon,
        title: 'Exclusive Discounts',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.'
    },
    {
        imageUrl: supportIcon,
        title: '24/7 Support',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.'
    },
];


const OfferCard = ({ imageUrl, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow duration-300 hover:shadow-lg">
        
       
        <div className="w-16 h-16 mb-4 flex items-center justify-center">
            <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-contain"
            />
        </div>

     
        <h3 className="text-xl font-semibold text-[#1A0B5B] mb-2">
            {title}
        </h3>

     
        <p className="text-sm text-gray-500 max-w-xs">
            {description}
        </p>
    </div>
);

export default function WhatShopexOffer() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
              
                <h2 className="text-4xl font-bold text-center text-[#1A0B5B] mb-12 md:mb-16">
                    What Shopex Offer!
                </h2>
                
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {offers.map((offer, index) => (
                        <OfferCard 
                            key={index} 
                            imageUrl={offer.imageUrl} 
                            title={offer.title} 
                            description={offer.description} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}