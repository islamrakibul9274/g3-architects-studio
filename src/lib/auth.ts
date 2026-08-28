import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const AUTH_SECRET = process.env.AUTH_SECRET || 'g3_architects_secure_token_secret_key';
const TOKEN_NAME = 'g3_auth_token';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export function signToken(payload: { id: string; email: string; role: string; name: string }): string {
  return jwt.sign(payload, AUTH_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { id: string; email: string; role: string; name: string } | null {
  try {
    return jwt.verify(token, AUTH_SECRET) as { id: string; email: string; role: string; name: string };
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get(TOKEN_NAME)?.value || req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  return verifyToken(token);
}

export { TOKEN_NAME };
