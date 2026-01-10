export interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  imageUrl: string;
  cases: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface LawyerFilters {
  specialization: string;
  experience: string;
  rating: string;
}