import React from 'react';
import { Edit3, Calendar } from 'lucide-react';


import blogImage1 from '../assets/blog-post-1.png'; 
import blogImage2 from '../assets/blog-post-2.png';
import blogImage3 from '../assets/blog-post-3.png';


const blogPosts = [
    {
        id: 1,
        image: blogImage1,
        author: 'Saban Ali',
        date: '01 August 2020',
        title: 'Top essential Trends in 2021',
        excerpt: 'More off this less hello samlande lied much over tightly circa horse taped mightly',
    },
    {
        id: 2,
        image: blogImage2,
        author: 'Surffauan',
        date: '01 August 2020',
        title: 'Top essential Trends in 2021',
        excerpt: 'More off this less hello samlande lied much over tightly circa horse taped mightly',
    },
    {
        id: 3,
        image: blogImage3,
        author: 'Saban Ali',
        date: '01 August 2020',
        title: 'Top essential Trends in 2021',
        excerpt: 'More off this less hello samlande lied much over tightly circa horse taped mightly',
    },
];

const BlogCard = ({ post }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-100">
            
            <div className="relative h-60 overflow-hidden">
                <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

          
            <div className="p-6">
                
                <div className="flex space-x-4 mb-3 text-sm">
                    <div className="flex items-center text-[#FB2E86] space-x-1">
                        <Edit3 size={14} />
                        <span className="text-gray-500 hover:text-[#FB2E86] transition-colors cursor-pointer">{post.author}</span>
                    </div>
                    <div className="flex items-center text-[#FB2E86] space-x-1">
                        <Calendar size={14} />
                        <span className="text-gray-500 hover:text-[#FB2E86] transition-colors cursor-pointer">{post.date}</span>
                    </div>
                </div>

             
                <h3 className="text-xl font-bold text-[#1A0B5B] mb-2 cursor-pointer hover:text-[#FB2E86] transition-colors">
                    {post.title}
                </h3>

              
                <p className="text-gray-500 text-sm mb-4">
                    {post.excerpt}
                </p>

               
                <a 
                    href="#" 
                    className="text-[#1A0B5B] font-semibold text-sm hover:text-[#FB2E86] transition-colors"
                >
                    Read More
                </a>
            </div>
        </div>
    );
};

export default function LatestBlog() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
               
                <h2 className="text-4xl font-bold text-center text-[#1A0B5B] mb-12">
                    Latest Blog
                </h2>
                
              
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}