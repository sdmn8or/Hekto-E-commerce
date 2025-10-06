import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCard = ({ product }) => {
    const colors = ['#05E636', '#FFC118', '#34C5D8'];
    const price = product.price ? product.price.toFixed(2) : '42.00';

    return (
        <div className="flex-shrink-0 w-[270px] lg:w-[270px] group bg-white rounded-lg overflow-hidden relative transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-gray-200 cursor-pointer">
            
            {/* 1. Product Image and Hover Actions */}
            <div className="relative p-6 h-64 flex items-center justify-center bg-[#F6F7FB]"> {/* Image background is always light gray */}
                <img 
                    // Using the dummy image URL
                    src={product.image || "https://placehold.co/200x200/F0F0F0/000000?text=No+Image"} 
                    alt={product.title} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" 
                />
                
                {/* Hover Action Buttons */}
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button className="bg-white p-2 rounded-full shadow-md text-[#270081] hover:bg-[#EE618D] hover:text-white transition-colors">
                        <ShoppingCart size={18} />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-md text-[#270081] hover:bg-[#EE618D] hover:text-white transition-colors">
                        <Heart size={18} />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-md text-[#270081] hover:bg-[#EE618D] hover:text-white transition-colors">
                        <Eye size={18} />
                    </button>
                </div>

                {/* Hover View Details Button */}
                <button className="absolute bottom-0 left-0 right-0 py-3 bg-[#08D15F] text-white font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
                    View Details
                </button>
            </div>

            {/* 2. Product Info (Now changes color on GROUP hover) */}
            <div className="p-4 pt-6 text-center bg-white text-[#1A0B5B] group-hover:bg-[#5B47B8] group-hover:text-white transition-colors duration-300">
                
                {/* Product Title */}
                <h3 className="text-lg font-semibold mb-1 text-[#FB2E86] group-hover:text-white transition-colors duration-300">
                    {product.title ? product.title.split(' ').slice(0, 2).join(' ') : 'Cantilever chair'}
                </h3>
                
                {/* Color Dots */}
                <div className="flex justify-center space-x-1 mb-2">
                    {colors.map((color, index) => (
                        <div key={index} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                    ))}
                </div>

                {/* Product Code */}
                <p className="text-sm mb-1 text-[#1A0B5B] group-hover:text-white transition-colors duration-300">
                    Code - Y523201
                </p>

                {/* Price */}
                <p className="text-md font-bold text-[#1A0B5B] group-hover:text-white transition-colors duration-300">
                    ${price}
                </p>
            </div>
        </div>
    );
};

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null); // Ref for the scrolling container

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            
                const response = await fetch('https://fakestoreapi.com/products?limit=8'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                
                const styledData = data.map((p, index) => ({...p, id: index + 1}));
                setProducts(styledData);
            } catch (err) {
                console.error(err);
                setError('Could not load products. Please check your network.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

   
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300; // Scroll by roughly the width of one card
            const newScrollPosition = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            
            scrollRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-xl text-gray-600">Loading Featured Products...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-xl text-red-600">{error}</div>;
    }

    return (
        <section className="py-16 md:py-24 bg-white relative">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Section Title */}
                <h2 className="text-4xl font-bold text-center text-[#1A0B5B] mb-12">
                    Featured Products
                </h2>
                
                {/* Navigation Arrows */}
                <button 
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full ml-4 hidden lg:block text-[#1A0B5B] hover:text-[#FB2E86] transition-colors"
                    aria-label="Scroll Left"
                >
                    <ChevronLeft size={24} />
                </button>
                
                
                <div 
                    ref={scrollRef}
                    className="flex space-x-6 overflow-x-hidden pb-6 -mb-6"
                    style={{ scrollBehavior: 'smooth' }} 
                >
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <button 
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full mr-4 hidden lg:block text-[#1A0B5B] hover:text-[#FB2E86] transition-colors"
                    aria-label="Scroll Right"
                >
                    <ChevronRight size={24} />
                </button>


                {/* Pagination Dots */}
                <div className="flex justify-center mt-12 space-x-2">
                    {/* Active Dot (Pink) */}
                    <div className="w-8 h-1 bg-[#EE618D]"></div>
                    {/* Inactive Dots (Light Pink) */}
                    <div className="w-8 h-1 bg-[#F9E9F0]"></div>
                    <div className="w-8 h-1 bg-[#F9E9F0]"></div>
                </div>
            </div>
         
            <style jsx>{`
                /* Styling the scrollbar for webkit (Chrome, Safari) */
                .scrollbar-thin::-webkit-scrollbar {
                    height: 8px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #F9E9F0;
                    border-radius: 10px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background-color: #EE618D;
                    border-radius: 10px;
                }
            `}</style>
        </section>
    );
}