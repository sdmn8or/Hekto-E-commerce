import React from 'react';
import Banner from '../components/Banner.jsx'; 
import FeaturedProducts from '../components/FeaturedProducts.jsx'; 
import LatestProducts from '../components/LeatestProducts.jsx'; 
import WhatShopexOffer from '../components/WhatShopexOffer.jsx';
import Ufltp from '../components/ufltp.jsx';
import TrendingProducts from '../components/TrendingProducts.jsx';
import DiscountItem from '../components/DiscountItem.jsx';
import TopCategories from '../components/TopCategories.jsx';
import NewsletterAndBrands from '../components/NewsletterAndBrands.jsx';
import LatestBlog from '../components/LeatestBlog.jsx';

export default function Home() {
  return (
    <div className="min-h-screen">
     <Banner/>
     <FeaturedProducts/>
     <LatestProducts/>
     <WhatShopexOffer/>
     <Ufltp/>
     <TrendingProducts/>
     <DiscountItem/>
     <TopCategories/>
     <NewsletterAndBrands/>
     <LatestBlog/>
    </div>
  );
}
