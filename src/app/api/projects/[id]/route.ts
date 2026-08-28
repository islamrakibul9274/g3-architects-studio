import { NextRequest, NextResponse } from 'next/server';
import { connectDB, memoryStore } from '@/lib/db';
import { Project } from '@/models/Project';
import { INITIAL_PROJECTS } from '@/lib/projectsData';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const conn = await connectDB();

    if (conn) {
      let dbProject = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        dbProject = await Project.findById(id);
      }
      if (!dbProject) {
        dbProject = await Project.findOne({ slug: id });
      }
      if (dbProject) {
        return NextResponse.json({ success: true, project: dbProject });
      }
    }

    // Check INITIAL_PROJECTS and memoryStore
    const project =
      INITIAL_PROJECTS.find((p) => p.slug === id || p._id === id) ||
      memoryStore.projects.get(id) ||
      Array.from(memoryStore.projects.values()).find((p) => p.slug === id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
