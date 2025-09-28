import Dashboard from '../Dashboard'
import { mockApps, mockAccessRequests, mockUserProfile } from '@/lib/mockData'

export default function DashboardExample() {
  // todo: remove mock functionality
  const activeApps = mockApps.filter(app => app.accessStatus === 'available')
  const recommendedApps = mockApps.filter(app => app.accessStatus === 'requestRequired')

  const handleViewCatalog = () => {
    console.log('View catalog clicked')
  }

  const handleViewApp = (appId: string) => {
    console.log('View app clicked:', appId)
  }

  return (
    <div className="p-6">
      <Dashboard
        userProfile={mockUserProfile}
        activeApps={activeApps}
        pendingRequests={mockAccessRequests}
        recommendedApps={recommendedApps}
        onViewCatalog={handleViewCatalog}
        onViewApp={handleViewApp}
      />
    </div>
  )
}