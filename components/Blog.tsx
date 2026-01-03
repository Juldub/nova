import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { cmsService } from '../services/cmsService';
import { Skeleton } from './Skeleton';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsService.getBlogPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="blog" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-bold">Insights & Thoughts</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {loading ? (
            [1, 2].map(i => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[16/9] rounded-3xl" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))
          ) : (
            posts.map(post => {
              const slug = post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
              return (
                <Link
                  key={post.id}
                  to={`/blog/${slug}`}
                  className="group cursor-pointer"
                >
                  <article>
                    <div className="aspect-[16/9] overflow-hidden rounded-3xl mb-6 bg-slate-800">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest">
                        <span className="text-purple-400">{post.category}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">{post.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;