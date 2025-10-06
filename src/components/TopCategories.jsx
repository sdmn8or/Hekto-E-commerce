import React, { useState, useEffect } from 'react';


const CategoryItem = ({ product }) => {
    const price = product.price ? product.price.toFixed(2) : '56.00';
    
    return (
        <div className="flex flex-col items-center text-center p-4">
            
            <div className="w-60 h-60 mb-4 relative flex items-center justify-center rounded-full bg-[#F6F7FB] group 
                        transition-all duration-300">
                
                
                <img 
                    src={product.image || "https://placehold.co/150x150/F0F0F0/000000?text=Chair"} 
                    alt={product.title} 
                    className="max-h-40 max-w-40 object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" 
                />

               
                <div className="absolute inset-0 rounded-full border-4 border-[#7E33E0] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                
               
                <button className="absolute inset-0 m-auto w-32 h-10 bg-[#08D15F] text-white text-sm font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Shop
                </button>
            </div>

          
            <h3 className="text-lg font-medium text-[#1A0B5B] mb-1">
                Mini LCW Chair
            </h3>
            <p className="text-md text-[#1A0B5B] font-semibold">
                ${price}
            </p>
        </div>
    );
};

export default function TopCategories() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                
                const response = await fetch('https://fakestoreapi.com/products?limit=4&offset=7'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError('Could not load categories.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); 

    if (loading) {
        return <div className="text-center py-20 text-xl text-gray-600">Loading Top Categories...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-xl text-red-600">{error}</div>;
    }

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
               
                <h2 className="text-4xl font-bold text-center text-[#1A0B5B] mb-12">
                    Top Categories
                </h2>
                
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <CategoryItem key={product.id} product={product} />
                    ))}
                </div>

                
                <div className="flex justify-center mt-12 space-x-2">
                   
                    <div className="w-2 h-2 bg-[#FB2E86] rounded-full"></div>
                    
                    <div className="w-2 h-2 bg-[#F9E9F0] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#F9E9F0] rounded-full"></div>
                </div>
            </div>
        </section>
    );
}