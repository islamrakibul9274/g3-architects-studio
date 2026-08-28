import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1',
  useTLS: true,
});

let pusherClientInstance: PusherClient | null = null;

export const getPusherClient = (): PusherClient => {
  if (typeof window === 'undefined') {
    return null as unknown as PusherClient;
  }
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  if (!key) return null as unknown as PusherClient;

  if (!pusherClientInstance) {
    pusherClientInstance = new PusherClient(key, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1',
      authEndpoint: '/api/pusher/auth',
    });
  }
  return pusherClientInstance;
};
