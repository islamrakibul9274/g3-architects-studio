import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'client' | 'architect' | 'admin';
  avatar?: string;
  bio?: string;
  phone?: string;
  company?: string;
  savedProjects: string[];
  subscription: {
    plan: 'free' | 'starter' | 'studio_pro' | 'enterprise';
    status: 'active' | 'inactive' | 'past_due' | 'trialing';
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    validUntil?: Date;
  };
  createdAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'architect', 'admin'], default: 'client' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    bio: { type: String, default: '' },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    savedProjects: [{ type: String }],
    subscription: {
      plan: { type: String, enum: ['free', 'starter', 'studio_pro', 'enterprise'], default: 'free' },
      status: { type: String, enum: ['active', 'inactive', 'past_due', 'trialing'], default: 'inactive' },
      stripeCustomerId: { type: String },
      stripeSubscriptionId: { type: String },
      validUntil: { type: Date },
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);
