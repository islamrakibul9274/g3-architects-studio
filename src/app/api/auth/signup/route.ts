import { NextRequest, NextResponse } from 'next/server';
import { connectDB, memoryStore } from '@/lib/db';
import { User } from '@/models/User';
import { hashPassword, signToken, TOKEN_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, company, role = 'client' } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const hashedPassword = await hashPassword(password);

    let createdUser: any = null;

    try {
      const conn = await connectDB();
      if (conn) {
        const existing = await User.findOne({ email: cleanEmail });
        if (existing) {
          return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
        }
        const newUser = await User.create({
          name,
          email: cleanEmail,
          password: hashedPassword,
          company: company || '',
          role: role === 'architect' ? 'architect' : 'client',
          subscription: { plan: 'free', status: 'active' },
        });
        createdUser = {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          company: newUser.company,
          avatar: newUser.avatar,
          subscription: newUser.subscription,
        };
      }
    } catch {
      // Continue to fallback
    }

    if (!createdUser) {
      if (memoryStore.users.has(cleanEmail)) {
        return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
      }
      const memUser = {
        id: 'usr_' + Date.now(),
        name,
        email: cleanEmail,
        password: hashedPassword,
        company: company || '',
        role: role === 'architect' ? 'architect' : 'client',
        avatar: '/images/team1.png',
        subscription: { plan: 'free', status: 'active' },
        savedProjects: [],
        createdAt: new Date().toISOString(),
      };
      memoryStore.users.set(cleanEmail, memUser);
      createdUser = {
        id: memUser.id,
        name: memUser.name,
        email: memUser.email,
        role: memUser.role,
        company: memUser.company,
        avatar: memUser.avatar,
        subscription: memUser.subscription,
      };
    }

    const token = signToken({
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
      name: createdUser.name,
    });

    const response = NextResponse.json({ success: true, user: createdUser });
    response.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
