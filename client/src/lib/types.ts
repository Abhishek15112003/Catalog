export interface App {
  id: string;
  name: string;
  description: string;
  publisher: string;
  category: string;
  department: string[];
  icon: string;
  rating: number;
  totalReviews: number;
  accessStatus: 'available' | 'requestRequired' | 'pending' | 'denied';
  features: string[];
  requirements: string[];
  usageStats: {
    activeUsers: number;
    monthlyGrowth: number;
  };
  tags: string[];
  lastUpdated: string;
}

export interface AccessRequest {
  id: string;
  appId: string;
  appName: string;
  userId: string;
  status: 'pending' | 'approved' | 'denied';
  requestDate: string;
  approvedDate?: string;
  justification: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  avatar: string;
}