import { NextRequest, NextResponse } from 'next/server';
import { connectDB, memoryStore } from '@/lib/db';
import { User } from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = getUserFromRequest(req);
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    try {
      const conn = await connectDB();
      if (conn) {
        const user = await User.findById(session.id).select('-password');
        if (user) {
          return NextResponse.json({
            user: {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
              company: user.company,
              avatar: user.avatar,
              bio: user.bio,
              phone: user.phone,
              savedProjects: user.savedProjects || [],
              subscription: user.subscription,
            },
          });
        }
      }
    } catch {}

    const memUser = memoryStore.users.get(session.email);
    if (memUser) {
      return NextResponse.json({
        user: {
          id: memUser.id,
          name: memUser.name,
          email: memUser.email,
          role: memUser.role,
          company: memUser.company,
          avatar: memUser.avatar,
          bio: memUser.bio || '',
          phone: memUser.phone || '',
          savedProjects: memUser.savedProjects || [],
          subscription: memUser.subscription,
        },
      });
    }

    // Default session object
    return NextResponse.json({
      user: {
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role,
        company: 'G3 Client Studio',
        avatar: '/images/team1.png',
        savedProjects: [],
        subscription: { plan: 'free', status: 'active' },
      },
    });
  } catch (error: any) {
    return NextResponse.json({ user: null, error: error.message }, { status: 200 });
  }
}
