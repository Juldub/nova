import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { cmsService } from '../services/cmsService';
import { Skeleton } from './Skeleton';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsService.getBlogPosts().then(posts => {
      const foundPost = posts.find(p => 
        p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === slug
      );
      setPost(foundPost || null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-950 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="aspect-video rounded-2xl mb-8" />
          <Skeleton className="h-10 w-2/3 mb-4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="min-h-screen bg-slate-950 py-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Retour aux articles
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Retour au blog</span>
        </button>

        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full aspect-video object-cover rounded-2xl mb-8"
        />

        <div className="mb-8">
          <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="text-purple-400">{post.category}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500">{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            {post.excerpt}
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
