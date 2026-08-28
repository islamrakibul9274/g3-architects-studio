import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectDocument extends Document {
  title: string;
  slug: string;
  tagline: string;
  category: 'Residential' | 'Commercial' | 'Sustainable' | 'Urban Masterplan' | 'Interior & Cultural';
  description: string;
  location: string;
  client: string;
  year: number;
  area: string;
  budget: string;
  heroImage: string;
  beforeImage?: string;
  afterImage?: string;
  gallery: string[];
  blueprints: {
    title: string;
    image: string;
    level: string;
    dimensions: string;
  }[];
  specs: {
    label: string;
    value: string;
  }[];
  features: string[];
  architectLeader: {
    name: string;
    role: string;
    avatar: string;
  };
  status: 'Completed' | 'Under Construction' | 'Conceptual' | 'Award Winner';
  featured: boolean;
  awards: string[];
  createdAt: Date;
}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Residential', 'Commercial', 'Sustainable', 'Urban Masterplan', 'Interior & Cultural'],
      required: true,
    },
    description: { type: String, required: true },
    location: { type: String, required: true },
    client: { type: String, default: 'Confidential' },
    year: { type: Number, required: true },
    area: { type: String, required: true },
    budget: { type: String, default: 'On Request' },
    heroImage: { type: String, required: true },
    beforeImage: { type: String },
    afterImage: { type: String },
    gallery: [{ type: String }],
    blueprints: [
      {
        title: { type: String },
        image: { type: String },
        level: { type: String },
        dimensions: { type: String },
      },
    ],
    specs: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    features: [{ type: String }],
    architectLeader: {
      name: { type: String, default: 'Elena Vance, AIA' },
      role: { type: String, default: 'Lead Design Principal' },
      avatar: { type: String, default: '/images/team1.png' },
    },
    status: {
      type: String,
      enum: ['Completed', 'Under Construction', 'Conceptual', 'Award Winner'],
      default: 'Completed',
    },
    featured: { type: Boolean, default: false },
    awards: [{ type: String }],
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model<IProjectDocument>('Project', ProjectSchema);
