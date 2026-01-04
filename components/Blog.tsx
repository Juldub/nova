import React, { useEffect, useState } from 'react';
import Card from './Card';
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
          <h2 className="text-4xl font-bold">Blog</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [1, 2].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/3] rounded-3xl" />
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))
            : posts.map(post => {
                const slug = post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                return (
                  <Card
                    key={post.id}
                    to={`/blog/${slug}`}
                    imageUrl={post.imageUrl}
                    imageAlt={post.title}
                    title={post.title}
                    description={post.excerpt}
                    tags={[post.category, post.date]}
                  >
                    <span className="inline-flex items-center text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                      En savoir plus
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Card>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Blog;