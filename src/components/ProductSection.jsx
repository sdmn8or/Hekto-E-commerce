import React, { useState, useEffect, useMemo } from 'react';
import { LayoutGrid, List, Heart, Eye, ShoppingCart, Star, Search, SlidersHorizontal, Check } from 'lucide-react';

// --- Utility Components ---

// Renders the 5-star rating system
const StarRating = ({ rating, size = 14 }) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <Star 
                key={i} 
                size={size} 
                fill={i < fullStars ? '#FFC118' : '#D5D5D5'} 
                strokeWidth={0} 
            />
        );
    }
    return <div className="flex space-x-0.5">{stars}</div>;
};

// --- Product Card Components (Unchanged) ---
const GridProductCard = ({ product }) => (
    <div className="group bg-white rounded-lg transition-shadow duration-300 hover:shadow-lg p-4 text-center border border-gray-50">
        <div className="relative h-48 flex items-center justify-center bg-[#F6F7FB] mb-3 overflow-hidden">
            <img 
                src={product.image || "https://placehold.co/150x150/F0F0F0/000000?text=Product"} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-100"> 
                 <button className="p-2 bg-white rounded-full text-[#2F1AC4] hover:bg-[#FB2E86] hover:text-white transition-all"><ShoppingCart size={18} /></button>
                 <button className="p-2 bg-white rounded-full text-[#2F1AC4] hover:bg-[#FB2E86] hover:text-white transition-all"><Heart size={18} /></button>
                 <button className="p-2 bg-white rounded-full text-[#2F1AC4] hover:bg-[#FB2E86] hover:text-white transition-all"><Eye size={18} /></button>
            </div>
        </div>
        <div>
            <h3 className="text-md font-medium text-[#1A0B5B] mb-1 truncate px-2">{product.title || 'Product Title'}</h3>
            <div className="flex justify-center mb-1">
                <StarRating rating={product.rating?.rate || 4} />
            </div>
            <div className="flex justify-center space-x-2 text-sm">
                <span className="text-[#1A0B5B] font-semibold">${product.price?.toFixed(2) || '26.00'}</span>
                <span className="text-[#969696] line-through">${(product.price * 1.5)?.toFixed(2) || '42.00'}</span>
            </div>
        </div>
    </div>
);

const ListProductRow = ({ product }) => (
    <div className="flex border border-gray-100 p-4 rounded-lg items-center hover:shadow-md transition-shadow duration-300">
        <div className="w-40 h-40 flex-shrink-0 flex items-center justify-center bg-[#F6F7FB] rounded-lg mr-6">
            <img 
                src={product.image || "https://placehold.co/120x120/F0F0F0/000000?text=List"} 
                alt={product.title} 
                className="max-h-36 max-w-full object-contain" 
            />
        </div>
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-[#1A0B5B] mb-1">{product.title || 'Product Title'}</h3>
            <div className="flex items-center space-x-4 mb-2">
                <span className="text-[#1A0B5B] font-semibold text-lg">${product.price?.toFixed(2) || '26.00'}</span>
                <span className="text-[#969696] line-through text-sm">${(product.price * 1.5)?.toFixed(2) || '42.00'}</span>
                <StarRating rating={product.rating?.rate || 4} />
            </div>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.'}
            </p>
            <div className="flex space-x-3">
                 <button className="text-[#2F1AC4] hover:text-[#FB2E86] transition-colors"><ShoppingCart size={20} /></button>
                 <button className="text-[#2F1AC4] hover:text-[#FB2E86] transition-colors"><Heart size={20} /></button>
                 <button className="text-[#2F1AC4] hover:text-[#FB2E86] transition-colors"><Eye size={20} /></button>
            </div>
        </div>
    </div>
);

// --- Sidebar Filter Component (now accepts and returns filter state) ---

const ShopSidebar = ({ filters, setFilters, priceRange, setPriceRange }) => {
    // Mock Data for filters
    const brands = ['Furniture', 'Jewelery', 'Electronics', 'Women’s Clothing', 'Men’s Clothing', 'Others'];
    const discounts = [
        { label: '5% Cashback Offer', min: 0.05 }, 
        { label: '10% Cashback Offer', min: 0.10 }, 
        { label: '25% Discount Offer', min: 0.25 }
    ];
    const ratings = [5, 4, 3];
    const colors = [{ name: 'Red', code: '#E53E3E' }, { name: 'Green', code: '#38A169' }, { name: 'Blue', code: '#4299E1' }, { name: 'Purple', code: '#805AD5' }];

    // Generic handler for checking/unchecking filters
    const handleFilterChange = (type, value) => {
        setFilters(prevFilters => {
            const currentList = prevFilters[type] || [];
            if (currentList.includes(value)) {
                return { ...prevFilters, [type]: currentList.filter(v => v !== value) };
            } else {
                return { ...prevFilters, [type]: [...currentList, value] };
            }
        });
    };

    const renderFilterGroup = (title, type, items, renderItem) => (
        <div className="mb-8">
            <h4 className="text-xl font-bold text-[#1A0B5B] border-b pb-2 mb-4">{title}</h4>
            <div className="space-y-3">
                {items.map((item, i) => renderItem(item, i, type))}
            </div>
        </div>
    );

    return (
        <div className="w-full p-4 md:p-0">
            {/* Search/Filter Bar */}
            <div className="flex mb-8 space-x-2">
                <input 
                    type="text" 
                    placeholder="Search Products..." 
                    className="flex-grow border border-gray-300 rounded-md p-2 focus:ring-[#FB2E86] focus:border-[#FB2E86] text-sm" 
                />
                <button className="bg-[#FB2E86] p-2 rounded-md text-white hover:bg-pink-600"><Search size={20} /></button>
            </div>
            
            {/* Product Categories/Brands */}
            {renderFilterGroup('Product Brand', 'category', brands, (brand, i, type) => (
                <div key={i} 
                     className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-[#FB2E86]"
                     onClick={() => handleFilterChange(type, brand)}
                >
                    <div className={`w-2 h-2 rounded-full ${filters.category?.includes(brand) ? 'bg-[#FB2E86]' : 'bg-gray-300'}`}></div>
                    <span>{brand}</span>
                </div>
            ))}

            {/* Discount Offer */}
            {renderFilterGroup('Discount Offer', 'discount', discounts, (discount, i, type) => (
                <div key={i} 
                     className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-[#FB2E86]"
                     onClick={() => handleFilterChange(type, discount.min)}
                >
                    <input 
                        type="checkbox"
                        checked={filters.discount?.includes(discount.min) || false}
                        onChange={() => handleFilterChange(type, discount.min)}
                        className="form-checkbox text-[#FB2E86] rounded"
                    />
                    <span>{discount.label}</span>
                </div>
            ))}

            {/* Rating Filter */}
            {renderFilterGroup('Rating Item', 'rating', ratings, (rate, i, type) => (
                <div key={i} 
                     className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-[#FB2E86]"
                     onClick={() => handleFilterChange(type, rate)}
                >
                    <input 
                        type="checkbox"
                        checked={filters.rating?.includes(rate) || false}
                        onChange={() => handleFilterChange(type, rate)}
                        className="form-checkbox text-[#FB2E86] rounded"
                    />
                    <StarRating rating={rate} size={16} />
                    <span className='font-medium'>& Up</span>
                </div>
            ))}

            {/* Price Filter (Range Slider) */}
            <div className="mb-8">
                <h4 className="text-xl font-bold text-[#1A0B5B] border-b pb-2 mb-4">Price Filter</h4>
                <p className="text-sm text-gray-600 mb-4 font-semibold">Price: ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}</p>
                
                <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    value={priceRange.max} 
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full h-1 bg-[#FB2E86] rounded-lg appearance-none cursor-pointer" 
                    style={{ background: `linear-gradient(to right, #FB2E86 0%, #FB2E86 ${priceRange.max/10}%, #e5e7eb ${priceRange.max/10}%, #e5e7eb 100%)` }}
                />
            </div>

            {/* Color Filter */}
            {renderFilterGroup('Filter By Color', 'color', colors, (color, i, type) => (
                <div key={i} 
                     className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-[#FB2E86]"
                     onClick={() => handleFilterChange(type, color.name)}
                >
                    <div className={`w-4 h-4 rounded-full border-2 ${filters.color?.includes(color.name) ? 'border-[#FB2E86]' : 'border-gray-300'}`} style={{ backgroundColor: color.code }}></div>
                    <span>{color.name}</span>
                </div>
            ))}
        </div>
    );
};


// --- Main Product Section Component ---

export default function ProductSection() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); 

    // Filter, Sort, and Pagination States
    const [productsPerPage, setProductsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('best-match'); // Options: 'best-match', 'price-low', 'price-high'
    const [filters, setFilters] = useState({}); // Stores active filters: { category: [], rating: [] }
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 }); // Price range slider state

    // --- Data Fetching ---
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch more products (e.g., 20) to make filtering meaningful
                const response = await fetch('https://fakestoreapi.com/products?limit=20'); 
                const data = await response.json();
                
                // Map categories from fakestore API to the mock brands in the sidebar for filtering demo
                const categoryMapping = {
                    "electronics": "Electronics",
                    "jewelery": "Jewelery",
                    "men's clothing": "Men’s Clothing",
                    "women's clothing": "Women’s Clothing",
                    // The rest go to 'Others' or specific mock names
                    "default": "Others", 
                };

                const mappedData = data.map(p => ({
                    ...p,
                    category: categoryMapping[p.category] || "Furniture", // Mocking to match the sidebar options
                    // Adding mock color/discount to demonstrate filtering
                    color: ['Red', 'Green', 'Blue', 'Purple'][Math.floor(Math.random() * 4)],
                    discountValue: Math.random() > 0.7 ? 0.25 : Math.random() > 0.4 ? 0.10 : 0.05,
                }));
                
                setAllProducts(mappedData);
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); 
    
    // Reset page when filters/sorting changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, productsPerPage, sortBy, priceRange]);


    // --- Filtering, Sorting, and Pagination Logic (Memoized for performance) ---
    const { filteredAndSortedProducts, totalPages, paginatedProducts, totalResults } = useMemo(() => {
        
        let processedProducts = allProducts;
        
        // 1. Filtering
        processedProducts = processedProducts.filter(product => {
            // Price Filter
            if (product.price < priceRange.min || product.price > priceRange.max) return false;

            // Category/Brand Filter
            if (filters.category?.length && !filters.category.includes(product.category)) return false;
            
            // Discount Filter (Checks if product discount is GREATER than or equal to selected minimum discount)
            if (filters.discount?.length && !filters.discount.some(minDisc => product.discountValue >= minDisc)) return false;

            // Rating Filter (Checks if product rating is GREATER than or equal to selected minimum rating)
            if (filters.rating?.length && !filters.rating.some(minRate => product.rating?.rate >= minRate)) return false;
            
            // Color Filter
            if (filters.color?.length && !filters.color.includes(product.color)) return false;

            return true;
        });
        
        // 2. Sorting
        const sorted = [...processedProducts].sort((a, b) => {
            if (sortBy === 'price-low') {
                return a.price - b.price;
            } else if (sortBy === 'price-high') {
                return b.price - a.price;
            }
            // 'best-match' (default) uses rating
            return (b.rating?.rate || 0) - (a.rating?.rate || 0);
        });

        // 3. Pagination calculation
        const total = sorted.length;
        const totalPages = Math.ceil(total / productsPerPage);
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginated = sorted.slice(startIndex, endIndex);

        return { 
            filteredAndSortedProducts: sorted, 
            totalPages, 
            paginatedProducts: paginated,
            totalResults: total
        };

    }, [allProducts, filters, productsPerPage, currentPage, sortBy, priceRange]);

    
    const renderProductList = () => {
        if (loading) {
            return <div className="text-center py-10 text-lg text-gray-600">Loading products...</div>;
        }

        if (paginatedProducts.length === 0) {
            return <div className="text-center py-10 text-lg text-gray-600">No products found matching your criteria.</div>;
        }

        if (viewMode === 'list') {
            return (
                <div className="space-y-6">
                    {paginatedProducts.map((product) => (
                        <ListProductRow key={product.id} product={product} />
                    ))}
                </div>
            );
        }

        // Default to Grid view
        return (
            <div className={`grid ${viewMode === 'sidebar' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-6`}>
                {paginatedProducts.map((product) => (
                    <GridProductCard key={product.id} product={product} />
                ))}
            </div>
        );
    };

    return (
        <section className="py-10 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* 1. Breadcrumb and Header Title */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-[#1A0B5B]">Shop Page</h1>
                    <p className="text-sm text-gray-500">Home . Pages . <span className="text-[#FB2E86]">Shop</span></p>
                </div>

                {/* 2. Controls and Product Display Area */}
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Sidebar Toggle */}
                    {viewMode === 'sidebar' && (
                        <div className="w-full lg:w-1/4 flex-shrink-0">
                            <ShopSidebar 
                                filters={filters} 
                                setFilters={setFilters} 
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                            />
                        </div>
                    )}

                    {/* Main Content (Products and Controls) */}
                    <div className={`flex-grow ${viewMode === 'sidebar' ? 'lg:w-3/4' : 'w-full'}`}>
                        
                        {/* Control Bar: Category, Pagination, Sort, View Switch */}
                        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center p-3 border border-gray-100 rounded-lg bg-[#F1F0FF]">
                            <div className="mb-3 md:mb-0">
                                <h3 className="text-md font-bold text-[#1A0B5B]">Ecommerce Accessories & Fashion Item</h3>
                                <p className="text-sm text-gray-500">About {totalResults} results</p>
                            </div>
                            
                            {/* Sorting and View Options */}
                            <div className="flex items-center space-x-4 text-sm">
                                {/* Per Page */}
                                <div className="hidden sm:flex items-center space-x-2">
                                    <label className="text-gray-600">Per Page:</label>
                                    <select 
                                        value={productsPerPage}
                                        onChange={(e) => setProductsPerPage(Number(e.target.value))}
                                        className="border border-gray-300 rounded p-1 text-sm focus:ring-[#FB2E86] focus:border-[#FB2E86]"
                                    >
                                        <option value={12}>12</option>
                                        <option value={24}>24</option>
                                        <option value={36}>36</option>
                                    </select>
                                </div>
                                {/* Sort By */}
                                <div className="hidden sm:flex items-center space-x-2">
                                    <label className="text-gray-600">Sort By:</label>
                                    <select 
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="border border-gray-300 rounded p-1 text-sm focus:ring-[#FB2E86] focus:border-[#FB2E86]"
                                    >
                                        <option value="best-match">Best Match</option>
                                        <option value="price-low">Price Low</option>
                                        <option value="price-high">Price High</option>
                                    </select>
                                </div>

                                {/* View Mode Buttons */}
                                <div className="flex space-x-1 border border-gray-300 p-1 rounded-md bg-white">
                                    <button 
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1 rounded ${viewMode === 'grid' ? 'bg-[#FB2E86] text-white' : 'text-gray-500 hover:text-[#FB2E86]'}`}
                                        title="Grid View"
                                    >
                                        <LayoutGrid size={20} />
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('list')}
                                        className={`p-1 rounded ${viewMode === 'list' ? 'bg-[#FB2E86] text-white' : 'text-gray-500 hover:text-[#FB2E86]'}`}
                                        title="List View"
                                    >
                                        <List size={20} />
                                    </button>
                                    {/* Sidebar Toggle Button */}
                                    <button 
                                        onClick={() => setViewMode('sidebar')}
                                        className={`p-1 rounded hidden md:block ${viewMode === 'sidebar' ? 'bg-[#FB2E86] text-white' : 'text-gray-500 hover:text-[#FB2E86]'}`}
                                        title="Sidebar View"
                                    >
                                        <SlidersHorizontal size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Rendering Area (Grid or List) */}
                        {renderProductList()}
                        
                        {/* Pagination */}
                        <div className="mt-10 flex justify-center items-center space-x-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-3 py-1 border rounded-md transition-colors 
                                        ${currentPage === index + 1 
                                            ? 'bg-[#FB2E86] border-[#FB2E86] text-white' 
                                            : 'border-gray-300 text-gray-600 hover:bg-[#FB2E86] hover:text-white'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}