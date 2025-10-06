import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';


import promoBannerLeft from '../assets/trending-promo-left-placeholder.png'; 
import promoBannerRight from '../assets/trending-promo-right-placeholder.png';

const TrendingProductCard = ({ product }) => {
    const price = product.price ? product.price.toFixed(2) : '26.00';
    const oldPrice = '42.00'; 

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star 
                    key={i} 
                    size={14} 
                    fill={i < fullStars ? '#FFC118' : '#D5D5D5'} 
                    strokeWidth={0} 
                />
            );
        }
        return <div className="flex space-x-0.5">{stars}</div>;
    };

    return (
        <div className="group bg-white rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-100 border border-gray-50 p-4">
           
            <div className="relative h-48 flex items-center justify-center bg-[#F6F7FB] mb-3">
                <img 
                    src={product.image || "https://placehold.co/150x150/F0F0F0/000000?text=Trending"} 
                    alt={product.title} 
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" 
                />
            </div>

           
            <div className="text-center">
                <h3 className="text-md font-medium text-[#1A0B5B] mb-1">
                    Cantilever chair
                </h3>
                
                <div className="flex justify-center mb-2">
                    {renderStars(4)} 
                </div>

                
                <div className="flex justify-center space-x-2 text-sm">
                   
                    <span className="text-[#1A0B5B] font-semibold">${price}</span>
                    
                    <span className="text-[#969696] line-through">${oldPrice}</span>
                </div>
            </div>
        </div>
    );
};


const SmallProductItem = ({ product }) => {
    const price = product.price ? product.price.toFixed(2) : '32.00';
    return (
        <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
           
            <img 
                src={product.image || "https://placehold.co/60x60/EFEFEF/000000?text=Small"} 
                alt={product.title} 
                className="w-16 h-16 object-contain bg-[#F6F7FB] p-1 rounded"
            />
           
            <div>
                <h4 className="text-sm text-[#1A0B5B] font-medium leading-tight">
                    Executive Seat chair
                </h4>
                <p className="text-sm text-[#1A0B5B] font-semibold">${price}</p>
            </div>
        </div>
    );
};


export default function TrendingProducts() {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [smallProducts, setSmallProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                
                const trendingResponse = await fetch('https://fakestoreapi.com/products?limit=4'); 
                const trendingData = await trendingResponse.json();
                
               
                const smallResponse = await fetch('https://fakestoreapi.com/products?limit=3&offset=4'); 
                const smallData = await smallResponse.json();
                
                setTrendingProducts(trendingData);
                setSmallProducts(smallData);

            } catch (err) {
                console.error(err);
                setError('Could not load products. Please check your network.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); 

    if (loading) {
        return <div className="text-center py-20 text-xl text-gray-600">Loading Trending Products...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-xl text-red-600">{error}</div>;
    }

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
               
                <h2 className="text-4xl font-bold text-center text-[#1A0B5B] mb-12">
                    Trending Products
                </h2>
                
              
                <div className="grid grid-cols-12 gap-8">
                    
                    
                    <div className="col-span-12 lg:col-span-9">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {trendingProducts.map((product) => (
                                <TrendingProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                 
                    <div className="col-span-12 lg:col-span-3">
                        <h3 className="text-2xl font-bold text-[#1A0B5B] mb-4 hidden lg:block">Top Selling</h3>
                        <div className="space-y-4">
                            {smallProducts.map((product) => (
                                <SmallProductItem key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                    <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        
                        
                        <div className="relative bg-[#F1F0FF] rounded-lg overflow-hidden flex items-center p-6 min-h-[250px] shadow-none">
                            <div className="z-10 relative">
                                <p className="text-lg font-bold text-[#1A0B5B] mb-2">23% off in all products</p>
                                <p className="text-sm text-[#FB2E86] mb-4">Shop Now</p>
                            </div>
                       
                            <img 
                                src={promoBannerLeft} 
                                alt="23% off promotion" 
                                className="absolute right-0 bottom-0 h-full w-auto object-cover opacity-70"
                                style={{ mixBlendMode: 'multiply' }} 
                            />
                        </div>

                        
                        <div className="relative bg-[#F1F0FF] rounded-lg overflow-hidden flex items-center p-6 min-h-[250px] shadow-none">
                            <div className="z-10 relative">
                                <p className="text-lg font-bold text-[#1A0B5B] mb-2">23% off in all products</p>
                                <p className="text-sm text-[#FB2E86] mb-4">View Collection</p>
                            </div>
                     
                            <img 
                                src={promoBannerRight} 
                                alt="23% off promotion" 
                                className="absolute right-0 bottom-0 h-full w-auto object-cover opacity-70"
                                style={{ mixBlendMode: 'multiply' }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}