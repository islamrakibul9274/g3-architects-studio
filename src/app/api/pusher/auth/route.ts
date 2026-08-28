import { NextRequest, NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const socketId = formData.get('socket_id') as string;
    const channel = formData.get('channel_name') as string;
    const user = getUserFromRequest(req);

    const presenceData = {
      user_id: user ? user.id : 'anon_' + Math.random().toString(36).substr(2, 7),
      user_info: {
        name: user ? user.name : 'Guest Visitor',
        role: user ? user.role : 'client',
      },
    };

    const authResponse = pusherServer.authorizeChannel(socketId, channel, presenceData);
    return NextResponse.json(authResponse);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
