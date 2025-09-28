import AccessRequestFlow from '../AccessRequestFlow'
import { mockApps } from '@/lib/mockData'

export default function AccessRequestFlowExample() {
  const app = mockApps[1] // Figma app

  const handleBack = () => {
    console.log('Back clicked')
  }

  const handleSubmit = (justification: string) => {
    console.log('Request submitted with justification:', justification)
  }

  return (
    <AccessRequestFlow 
      app={app}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  )
}