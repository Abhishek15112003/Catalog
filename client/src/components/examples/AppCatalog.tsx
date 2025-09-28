import AppCatalog from '../AppCatalog'
import { mockApps } from '@/lib/mockData'

export default function AppCatalogExample() {
  const handleRequestAccess = (appId: string) => {
    console.log('Request access triggered for app:', appId)
  }

  const handleViewDetails = (appId: string) => {
    console.log('View details triggered for app:', appId)
  }

  return (
    <div className="p-6">
      <AppCatalog
        apps={mockApps}
        onRequestAccess={handleRequestAccess}
        onViewDetails={handleViewDetails}
      />
    </div>
  )
}