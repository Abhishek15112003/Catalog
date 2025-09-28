import { App, AccessRequest, UserProfile } from './types';

// todo: remove mock functionality
export const mockApps: App[] = [
  {
    id: '1',
    name: 'Slack',
    description: 'Team communication and collaboration platform for modern workplace',
    publisher: 'Slack Technologies',
    category: 'Communication',
    department: ['Engineering', 'Marketing', 'Sales'],
    icon: '💬',
    rating: 4.8,
    totalReviews: 1240,
    accessStatus: 'available',
    features: ['Real-time messaging', 'File sharing', 'Video calls', 'App integrations'],
    requirements: ['Active employee status', 'Manager approval for external channels'],
    usageStats: { activeUsers: 2840, monthlyGrowth: 12 },
    tags: ['communication', 'collaboration', 'productivity'],
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Figma',
    description: 'Collaborative design tool for creating user interfaces and prototypes',
    publisher: 'Figma Inc.',
    category: 'Design',
    department: ['Design', 'Product', 'Marketing'],
    icon: '🎨',
    rating: 4.9,
    totalReviews: 890,
    accessStatus: 'requestRequired',
    features: ['Real-time collaboration', 'Prototyping', 'Component libraries', 'Version control'],
    requirements: ['Design team member', 'Project-based access', 'Training completion'],
    usageStats: { activeUsers: 156, monthlyGrowth: 8 },
    tags: ['design', 'prototyping', 'collaboration'],
    lastUpdated: '2024-01-12'
  },
  {
    id: '3',
    name: 'Salesforce',
    description: 'Customer relationship management platform for sales and marketing',
    publisher: 'Salesforce.com',
    category: 'CRM',
    department: ['Sales', 'Marketing', 'Customer Success'],
    icon: '☁️',
    rating: 4.6,
    totalReviews: 2100,
    accessStatus: 'available',
    features: ['Lead management', 'Opportunity tracking', 'Reports & dashboards', 'Mobile app'],
    requirements: ['Sales team member', 'CRM training certification'],
    usageStats: { activeUsers: 340, monthlyGrowth: 5 },
    tags: ['crm', 'sales', 'marketing'],
    lastUpdated: '2024-01-18'
  },
  {
    id: '4',
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, and project management',
    publisher: 'Notion Labs Inc.',
    category: 'Productivity',
    department: ['All Departments'],
    icon: '📝',
    rating: 4.7,
    totalReviews: 1560,
    accessStatus: 'pending',
    features: ['Note-taking', 'Database management', 'Team wikis', 'Template gallery'],
    requirements: ['Manager approval', 'Data handling training'],
    usageStats: { activeUsers: 890, monthlyGrowth: 15 },
    tags: ['productivity', 'documentation', 'collaboration'],
    lastUpdated: '2024-01-10'
  },
  {
    id: '5',
    name: 'Zoom',
    description: 'Video conferencing and virtual meeting platform',
    publisher: 'Zoom Video Communications',
    category: 'Communication',
    department: ['All Departments'],
    icon: '📹',
    rating: 4.5,
    totalReviews: 3200,
    accessStatus: 'available',
    features: ['HD video meetings', 'Screen sharing', 'Recording', 'Breakout rooms'],
    requirements: ['Active employee status'],
    usageStats: { activeUsers: 4200, monthlyGrowth: 3 },
    tags: ['video', 'meetings', 'communication'],
    lastUpdated: '2024-01-20'
  },
  {
    id: '6',
    name: 'Adobe Creative Suite',
    description: 'Professional creative tools for design and content creation',
    publisher: 'Adobe Inc.',
    category: 'Design',
    department: ['Design', 'Marketing', 'Content'],
    icon: '🎭',
    rating: 4.8,
    totalReviews: 950,
    accessStatus: 'requestRequired',
    features: ['Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro'],
    requirements: ['Creative role', 'License justification', 'Budget approval'],
    usageStats: { activeUsers: 78, monthlyGrowth: 2 },
    tags: ['design', 'creative', 'multimedia'],
    lastUpdated: '2024-01-08'
  }
];

// todo: remove mock functionality
export const mockAccessRequests: AccessRequest[] = [
  {
    id: '1',
    appId: '2',
    appName: 'Figma',
    userId: '1',
    status: 'pending',
    requestDate: '2024-01-20',
    justification: 'Need access for upcoming product redesign project'
  },
  {
    id: '2',
    appId: '6',
    appName: 'Adobe Creative Suite',
    userId: '1',
    status: 'approved',
    requestDate: '2024-01-15',
    approvedDate: '2024-01-17',
    justification: 'Required for marketing campaign assets'
  }
];

// todo: remove mock functionality
export const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  department: 'Product Design',
  role: 'Senior UX Designer',
  avatar: '👩‍💻'
};