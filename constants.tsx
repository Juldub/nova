import React from 'react';
import { Project, Experience, BlogPost, Education } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Lumina Dashboard',
    description: 'A data visualization platform for high-frequency trading metrics.',
    tags: ['React', 'D3.js', 'TypeScript'],
    imageUrl: 'https://picsum.photos/seed/lumina/800/600',
  },
  {
    id: '2',
    title: 'Aether Network',
    description: 'Decentralized cloud infrastructure management interface.',
    tags: ['Node.js', 'Web3', 'Tailwind'],
    imageUrl: 'https://picsum.photos/seed/aether/800/600',
  },
  {
    id: '3',
    title: 'Neon Commerce',
    description: 'Next-gen e-commerce engine with real-time inventory tracking.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe'],
    imageUrl: 'https://picsum.photos/seed/neon/800/600',
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'e1',
    company: 'Quantum Systems',
    role: 'Senior Frontend Engineer',
    period: '2021 — Present',
    description: 'Lead the architectural design of enterprise-level React applications and mentored junior developers.'
  },
  {
    id: 'e2',
    company: 'Blue Stream Media',
    role: 'Frontend Developer',
    period: '2019 — 2021',
    description: 'Developed high-performance streaming interfaces and optimized asset loading by 40%.'
  }
];

export const EDUCATION: Education[] = [
  {
    id: 'edu1',
    school: 'Stanford University',
    degree: 'B.S. in Computer Science',
    year: '2019'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of AI-Driven Design',
    excerpt: 'How generative models are reshaping the way we think about UI/UX layout and prototyping.',
    date: 'Oct 12, 2023',
    category: 'Design',
    imageUrl: 'https://picsum.photos/seed/ai/800/450'
  },
  {
    id: 'b2',
    title: 'Mastering TypeScript Generics',
    excerpt: 'Deep dive into advanced typing techniques for building robust, reusable components.',
    date: 'Sep 24, 2023',
    category: 'Tech',
    imageUrl: 'https://picsum.photos/seed/ts/800/450'
  }
];