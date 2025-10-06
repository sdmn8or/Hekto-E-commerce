import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';


const ProductCard = ({ product }) => {
    
    const price = product.price ? product.price.toFixed(2) : '42.00';
   
    const oldPrice = '66.00'; 

   
    const isSale = product.id % 2 === 0;

    return (
        <div className="group bg-white rounded-lg relative transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-100">
          
            <div className="relative p-6 h-64 flex items-center justify-center bg-[#F6F7FB]">
                <img 
                    
                    src={product.image || "https://placehold.co/200x200/F0F0F0/000000?text=Product"} 
                    alt={product.title} 
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" 
                />
                
                {/* Sale Badge */}
                {isSale && (
                    <span className="absolute top-4 left-4 bg-[#FB2E86] text-white text-xs font-semibold px-2 py-1 rounded-sm shadow-md z-10">
                        Sale
                    </span>
                )}

                {/* Hover Action Buttons */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button className="block mx-auto bg-white p-2 rounded-full shadow-md text-[#270081] hover:bg-[#EE618D] hover:text-white transition-colors">
                        <ShoppingCart size={18} />
                    </button>
                    <button className="block mx-auto bg-white p-2 rounded-full shadow-md text-[#270081] hover:bg-[#EE618D] hover:text-white transition-colors">
                        <Heart size={18} />
                    </button>
                    <button className="block mx-auto bg-white p-2 rounded-full shadow-md text-[#270081] hover:bg-[#EE618D] hover:text-white transition-colors">
                        <Eye size={18} />
                    </button>
                </div>
            </div>

            {/* 2. Product Info */}
            <div className="p-4 pt-4 text-center">
                
                {/* Product Title */}
                <h3 className="text-md font-medium text-[#1A0B5B] mb-1">
                    Comfort Handy Craft
                </h3>
                
                {/* Price Display */}
                <div className="flex justify-center space-x-2 text-sm">
                    {/* Discounted Price (Pink) */}
                    <span className="text-[#FB2E86] font-semibold">${price}</span>
                    {/* Original Price (Crossed Out Gray/Light Blue) */}
                    <span className="text-[#969696] line-through">${oldPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default function LatestProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('New Arrival'); // State for active tab
    const [error, setError] = useState(null);

  
    const categories = ['New Arrival', 'Best Seller', 'Featured', 'Special Offer'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                
                const response = await fetch('https://fakestoreapi.com/products?limit=6'); 
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
    }, [activeTab]);

    if (loading) {
        return <div className="text-center py-20 text-xl text-gray-600">Loading {activeTab} Products...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-xl text-red-600">{error}</div>;
    }

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Section Title */}
                <h2 className="text-4xl font-bold text-center text-[#1A0B5B] mb-6">
                    Latest Products
                </h2>
                
                {/* Tab Navigation */}
                <div className="flex justify-center space-x-6 sm:space-x-10 mb-12">
                    {categories.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-lg font-semibold pb-1 transition-colors duration-200 ${
                                activeTab === tab
                                    ? 'text-[#FB2E86] border-b-2 border-[#FB2E86]'
                                    : 'text-[#1A0B5B] hover:text-[#FB2E86]'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Product Grid (2 Rows, 3 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}