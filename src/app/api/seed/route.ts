import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Project } from '@/models/Project';
import { INITIAL_PROJECTS } from '@/lib/projectsData';

export async function GET() {
  try {
    const conn = await connectDB();
    if (conn) {
      for (const p of INITIAL_PROJECTS) {
        await Project.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
      }
    }
    return NextResponse.json({ success: true, count: INITIAL_PROJECTS.length, projects: INITIAL_PROJECTS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
