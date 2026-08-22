export interface Therapist {
  id: string;
  name: string;
  title: string;
  credentials: string;
  specialties: string[];
  bio: string;
  rating: number;
  reviewsCount: number;
  availableDays: string[];
  avatar: string;
  badge?: string;
  experienceYears: number;
}

export type ServiceCategory = 'All' | 'Individual' | 'Couples' | 'Group' | 'Workshops';

export interface ServiceProgram {
  id: string;
  title: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  longDescription: string;
  duration: string;
  sessions: string;
  price: string;
  features: string[];
  image: string;
  therapistLead: string;
  recommendedFor: string[];
  methods: string[];
}

export interface ApproachTab {
  id: string;
  title: string;
  subtitle: string;
  headline: string;
  description: string;
  detailedPoints: {
    title: string;
    desc: string;
  }[];
  image: string;
  statNumber: string;
  statLabel: string;
  badge: string;
}

export interface BookingFormData {
  focusArea: string;
  preferredTherapistId: string;
  selectedDate: string;
  selectedTimeSlot: string;
  sessionType: 'video' | 'in-person' | 'chat';
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  quote: string;
  avatar: string;
  focus: string;
  timeframe: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Therapy' | 'Insurance & Pricing' | 'Privacy';
}
