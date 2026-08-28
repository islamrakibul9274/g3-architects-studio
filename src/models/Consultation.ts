import mongoose, { Schema, Document } from 'mongoose';

export interface IConsultationDocument extends Document {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectType: string;
  budgetRange: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

const ConsultationSchema = new Schema<IConsultationDocument>(
  {
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String },
    projectType: { type: String, required: true },
    budgetRange: { type: String, required: true },
    preferredDate: { type: String, required: true },
    preferredTimeSlot: { type: String, required: true },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Consultation =
  mongoose.models.Consultation || mongoose.model<IConsultationDocument>('Consultation', ConsultationSchema);
