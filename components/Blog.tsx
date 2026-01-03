import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { cmsService } from '../services/cmsService';
import { Skeleton } from './Skeleton';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    cmsService.getBlogPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (selectedPost) {
    return (
      <section className="min-h-screen bg-slate-950 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-8 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to blog</span>
          </button>

          <img 
            src={selectedPost.imageUrl} 
            alt={selectedPost.title}
            className="w-full aspect-video object-cover rounded-2xl mb-8"
          />

          <div className="mb-8">
            <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="text-purple-400">{selectedPost.category}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-500">{selectedPost.date}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {selectedPost.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              {selectedPost.excerpt}
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap">
              {selectedPost.content}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            posts.map(post => (
              <article 
                key={post.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;