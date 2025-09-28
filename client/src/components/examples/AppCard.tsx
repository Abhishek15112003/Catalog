import AppCard from '../AppCard'
import { mockApps } from '@/lib/mockData'

export default function AppCardExample() {
  const handleRequestAccess = (appId: string) => {
    console.log('Request access triggered for app:', appId)
  }

  const handleViewDetails = (appId: string) => {
    console.log('View details triggered for app:', appId)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {mockApps.slice(0, 3).map((app) => (
        <AppCard 
          key={app.id}
          app={app}
          onRequestAccess={handleRequestAccess}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  )
}