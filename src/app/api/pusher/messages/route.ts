import { NextRequest, NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';
import { connectDB } from '@/lib/db';
import { ChatMessage } from '@/models/ChatMessage';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get('roomId') || 'general-studio';

    await connectDB();
    const messages = await ChatMessage.find({ roomId }).sort({ createdAt: 1 }).limit(100);

    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    const { roomId = 'general-studio', message, senderName, senderRole = 'client', fileUrl } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    const payload = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      roomId,
      senderId: user ? user.id : 'anon_' + Math.random().toString(36).substr(2, 6),
      senderName: user ? user.name : senderName || 'Studio Guest',
      senderRole: user ? user.role : senderRole,
      senderAvatar: user ? '/images/team1.png' : undefined,
      message,
      fileUrl: fileUrl || undefined,
      timestamp: new Date().toISOString(),
    };

    // Save to MongoDB
    await connectDB();
    await ChatMessage.create({
      roomId: payload.roomId,
      senderId: payload.senderId,
      senderName: payload.senderName,
      senderRole: payload.senderRole,
      senderAvatar: payload.senderAvatar,
      message: payload.message,
      fileUrl: payload.fileUrl,
    });

    // Real-time broadcast via Pusher
    await pusherServer.trigger(`chat-${roomId}`, 'new-message', payload);

    return NextResponse.json({ success: true, message: payload });
  } catch (error: any) {
    console.error('Pusher message error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
