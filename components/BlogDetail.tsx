
import React, { useEffect, useState } from 'react';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
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
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    cmsService.getBlogPosts().then(posts => {
      const foundPost = posts.find(p => 
        p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === slug
      );
      setPost(foundPost || null);
      setLoading(false);
    });
  }, [slug]);

  const handleBack = () => {
    navigate('/');
  };

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
      <section className="min-h-screen bg-slate-950 pt-32 pb-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
          <button
            onClick={handleBack}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Retour aux articles
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 pt-32 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-8 px-6 py-2 rounded-full bg-slate-900 border border-slate-800 text-white font-bold hover:bg-slate-800 transition-colors"
        >
          ← Retour à l’accueil
        </button>

        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full aspect-video object-cover rounded-2xl mb-8"
          />
        )}

        <div className="mb-8">
          <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest mb-4">
            {post.category && <span className="text-purple-400">{post.category}</span>}
            {post.category && <span className="text-slate-600">•</span>}
            {post.date && <span className="text-slate-500">{post.date}</span>}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
        </div>

        {post.richText && (
          <div className="prose prose-invert max-w-2xl mx-auto not-prose">
            {documentToReactComponents(post.richText, {
              renderNode: {
                blockquote: (node, children) => (
                  <blockquote
                    style={{
                      background: 'rgba(168,85,247,0.10)',
                      border: '2px solid #a855f7',
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      margin: '1.5rem 0',
                      fontSize: '1.1em',
                    }}
                    className="prose prose-invert"
                  >
                    {children}
                  </blockquote>
                ),
                'embedded-asset-block': (node) => {
                  const url = node?.data?.target?.fields?.file?.url;
                  const alt = node?.data?.target?.fields?.title || '';
                  if (!url) return null;
                  return (
                    <img
                      src={url.startsWith('//') ? 'https:' + url : url}
                      alt={alt}
                      style={{
                        maxWidth: '100%',
                        borderRadius: '1rem',
                        margin: '2rem auto',
                        display: 'block',
                        boxShadow: '0 4px 24px 0 rgba(168,85,247,0.10)'
                      }}
                    />
                  );
                },
                'embedded-entry-inline': (node) => {
                  const entry = node?.data?.target?.fields;
                  if (!entry) return null;
                  const url = entry.url || entry.slug || entry.link || null;
                  const label = entry.title || entry.name || 'Voir la ressource';
                  return (
                    <span style={{
                      display: 'inline-block',
                      background: 'rgba(168,85,247,0.04)',
                      border: '1px solid #a855f7',
                      borderRadius: '0.5rem',
                      padding: '0.15em 0.5em',
                      margin: '0 0.15em',
                      fontSize: '1em',
                      fontWeight: 500,
                      color: '#a855f7',
                    }}>
                      {url ? (
                        <a
                          href={url.startsWith('http') ? url : `/${url}`}
                          style={{ color: '#a855f7', textDecoration: 'underline', fontWeight: 600 }}
                          target="_blank" rel="noopener noreferrer"
                        >
                          {label}
                        </a>
                      ) : (
                        label
                      )}
                      {entry.description && <span style={{marginLeft: 8, color: '#a78bfa', fontWeight: 400}}>{entry.description}</span>}
                    </span>
                  );
                },
              },
              renderMark: {
                code: (text) => (
                  <span style={{display: 'inline'}}>
                    <code style={{
                      background: '#111',
                      color: '#00ff41',
                      borderRadius: '4px',
                      padding: '2px 6px',
                      fontFamily: 'monospace',
                      fontSize: '1em',
                    }}>{typeof text === 'string' ? text.trim() : text}</code>
                  </span>
                )
              },
              renderText: (text) => {
                if (typeof text === 'string' && (!text.trim() || text === '\u00A0' || text === '\n' || text === "''")) return null;
                return text;
              }
            } as Options)}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogDetail;
