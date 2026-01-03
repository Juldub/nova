import * as contentful from 'contentful';
import { Project, Experience, Education, BlogPost } from '../types';

// En production (Vercel/Netlify), ces valeurs seront tirées des variables d'environnement.
// En local, elles utilisent vos identifiants par défaut.
const SPACE_ID = (process.env as any).CONTENTFUL_SPACE_ID || 'bfdi7ts3hpm7';
const ACCESS_TOKEN = (process.env as any).CONTENTFUL_ACCESS_TOKEN || 't_wVy6eqS-XO4bgECJvk98nJQMy84Mzfx-KrNsQBGx0';

const client = (contentful as any).createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

export class CMSService {
  private mapAsset(asset: any): string {
    if (!asset || !asset.fields || !asset.fields.file) {
      return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800';
    }
    let url = asset.fields.file.url;
    if (url.startsWith('//')) url = 'https:' + url;
    return url;
  }

  async getProjects(): Promise<Project[]> {
    try {
      const response = await client.getEntries({ 
        content_type: 'project',
        order: '-sys.createdAt'
      });
      return response.items.map((item: any) => ({
        id: item.sys.id,
        title: item.fields.title || 'Untitled Project',
        description: item.fields.description || '',
        tags: item.fields.tags || [],
        imageUrl: this.mapAsset(item.fields.image),
        link: item.fields.link
      }));
    } catch (error) {
      console.error("Contentful Error (Projects):", error);
      return [];
    }
  }

  async getExperience(): Promise<Experience[]> {
    try {
      const response = await client.getEntries({ 
        content_type: 'experience', 
        order: 'fields.ordre'
      });
      return response.items.map((item: any) => ({
        id: item.sys.id,
        company: item.fields.company || 'Unknown Company',
        role: item.fields.role || 'Professional',
        period: item.fields.period || '',
        description: item.fields.description || '',
        ordre: item.fields.ordre
      }));
    } catch (error) {
      console.error("Contentful Error (Experience):", error);
      return [];
    }
  }

  async getEducation(): Promise<Education[]> {
    try {
      const response = await client.getEntries({ 
        content_type: 'education',
        order: '-fields.year'
      });
      return response.items.map((item: any) => ({
        id: item.sys.id,
        school: item.fields.school || '',
        degree: item.fields.degree || '',
        year: item.fields.year || ''
      }));
    } catch (error) {
      console.error("Contentful Error (Education):", error);
      return [];
    }
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await client.getEntries({ 
        content_type: 'blogPost', 
        order: '-fields.date' 
      });
      return response.items.map((item: any) => ({
        id: item.sys.id,
        title: item.fields.title || 'Untitled Post',
        excerpt: item.fields.excerpt || '',
        content: item.fields.content || '',
        date: item.fields.date ? new Date(item.fields.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
        category: item.fields.category || 'General',
        imageUrl: this.mapAsset(item.fields.image)
      }));
    } catch (error) {
      console.error("Contentful Error (Blog):", error);
      return [];
    }
  }
}

export const cmsService = new CMSService();