import { NextRequest, NextResponse } from 'next/server';
import { connectDB, memoryStore } from '@/lib/db';
import { Project } from '@/models/Project';
import { INITIAL_PROJECTS } from '@/lib/projectsData';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    const conn = await connectDB();
    if (conn) {
      const query: any = {};
      if (category && category !== 'All') query.category = category;
      if (featured === 'true') query.featured = true;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tagline: { $regex: search, $options: 'i' } },
        ];
      }
      const dbProjects = await Project.find(query).sort({ year: -1, createdAt: -1 });
      if (dbProjects && dbProjects.length > 0) {
        return NextResponse.json({ success: true, count: dbProjects.length, projects: dbProjects });
      }
    }

    // Fallback store
    let projects = [...INITIAL_PROJECTS, ...Array.from(memoryStore.projects.values())];
    if (category && category !== 'All') {
      projects = projects.filter((p) => p.category === category);
    }
    if (featured === 'true') {
      projects = projects.filter((p) => p.featured === true);
    }
    if (search) {
      const q = search.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, count: projects.length, projects });
  } catch (error: any) {
    console.error('Fetch projects error:', error);
    return NextResponse.json({ success: true, count: INITIAL_PROJECTS.length, projects: INITIAL_PROJECTS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || (user.role !== 'architect' && user.role !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized: Architect or Admin access required' }, { status: 403 });
    }

    const data = await req.json();
    if (!data.title || !data.category || !data.heroImage) {
      return NextResponse.json({ error: 'Title, category, and hero image are required' }, { status: 400 });
    }

    const slug =
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const projectData = {
      ...data,
      _id: 'proj_' + Date.now(),
      slug,
      year: data.year || new Date().getFullYear(),
      createdAt: new Date().toISOString(),
    };

    const conn = await connectDB();
    if (conn) {
      const saved = await Project.create(projectData);
      return NextResponse.json({ success: true, project: saved }, { status: 201 });
    }

    memoryStore.projects.set(slug, projectData);
    return NextResponse.json({ success: true, project: projectData }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
