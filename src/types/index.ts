export interface IUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'client' | 'architect' | 'admin';
  avatar?: string;
  bio?: string;
  phone?: string;
  company?: string;
  savedProjects?: string[];
  subscription?: {
    plan: 'free' | 'starter' | 'studio_pro' | 'enterprise';
    status: 'active' | 'inactive' | 'past_due' | 'trialing';
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    validUntil?: string;
  };
  createdAt?: string;
}

export interface IProject {
  _id?: string;
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
  featured?: boolean;
  awards?: string[];
}

export interface IConsultation {
  _id?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectType: string;
  budgetRange: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt?: string;
}

export interface IChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'architect' | 'admin';
  senderAvatar?: string;
  message: string;
  timestamp: string;
  fileUrl?: string;
}
