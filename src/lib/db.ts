import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  isFallback: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null, isFallback: false };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    cached.isFallback = true;
    return null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      cached.isFallback = false;
      return m;
    }).catch((err) => {
      console.warn('MongoDB connection note:', err.message);
      cached.isFallback = true;
      return null as any;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch {
    cached.conn = null;
  }

  return cached.conn;
}

export const memoryStore = {
  users: new Map<string, any>(),
  projects: new Map<string, any>(),
  consultations: new Map<string, any>(),
  chatMessages: new Map<string, any[]>(),
};
