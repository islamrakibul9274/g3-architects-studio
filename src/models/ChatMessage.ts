import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessageDocument extends Document {
  roomId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'architect' | 'admin';
  senderAvatar?: string;
  message: string;
  fileUrl?: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessageDocument>(
  {
    roomId: { type: String, required: true, index: true },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    senderRole: { type: String, enum: ['client', 'architect', 'admin'], default: 'client' },
    senderAvatar: { type: String },
    message: { type: String, required: true },
    fileUrl: { type: String },
  },
  { timestamps: true }
);

export const ChatMessage =
  mongoose.models.ChatMessage || mongoose.model<IChatMessageDocument>('ChatMessage', ChatMessageSchema);
