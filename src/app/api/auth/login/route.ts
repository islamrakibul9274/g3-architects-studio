import { NextRequest, NextResponse } from 'next/server';
import { connectDB, memoryStore } from '@/lib/db';
import { User } from '@/models/User';
import { comparePassword, hashPassword, signToken, TOKEN_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    let authUser: any = null;

    try {
      const conn = await connectDB();
      if (conn) {
        const user = await User.findOne({ email: cleanEmail });
        if (user) {
          const isMatch = await comparePassword(password, user.password);
          if (isMatch) {
            authUser = {
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
            };
          }
        }
      }
    } catch {
      // Fallback
    }

    if (!authUser) {
      // Check memory store
      const memUser = memoryStore.users.get(cleanEmail);
      if (memUser) {
        const isMatch = await comparePassword(password, memUser.password);
        if (isMatch) {
          authUser = {
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
          };
        }
      } else if (cleanEmail === 'director@g3architects.com' && password === 'Architect2026!') {
        // Built-in studio director login
        const hashed = await hashPassword('Architect2026!');
        const director = {
          id: 'usr_director_g3',
          name: 'Elena Vance, FAIA',
          email: 'director@g3architects.com',
          password: hashed,
          role: 'architect',
          company: 'G3 Studio Principal',
          avatar: '/images/team1.png',
          bio: 'Lead Design Principal focusing on biophilic structural systems and low-carbon travertine envelopes.',
          phone: '+1 (415) 890-3400',
          savedProjects: ['proj_travertine_residence', 'proj_nordic_energy_hub'],
          subscription: { plan: 'enterprise', status: 'active' },
        };
        memoryStore.users.set(cleanEmail, director);
        authUser = director;
      }
    }

    if (!authUser) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = signToken({
      id: authUser.id,
      email: authUser.email,
      role: authUser.role,
      name: authUser.name,
    });

    const response = NextResponse.json({ success: true, user: authUser });
    response.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
