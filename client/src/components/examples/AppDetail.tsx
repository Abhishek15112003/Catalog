import AppDetail from '../AppDetail'
import { mockApps } from '@/lib/mockData'

export default function AppDetailExample() {
  const app = mockApps[1] // Figma app with requestRequired status

  const handleBack = () => {
    console.log('Back to catalog clicked')
  }

  const handleRequestAccess = (appId: string) => {
    console.log('Request access triggered for app:', appId)
  }

  return (
    <AppDetail 
      app={app}
      onBack={handleBack}
      onRequestAccess={handleRequestAccess}
    />
  )
}