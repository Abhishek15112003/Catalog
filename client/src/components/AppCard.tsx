import { Star, Users, TrendingUp, Download, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { App } from '@/lib/types'

interface AppCardProps {
  app: App
  onRequestAccess: (appId: string) => void
  onViewDetails: (appId: string) => void
}

export default function AppCard({ app, onRequestAccess, onViewDetails }: AppCardProps) {
  const getStatusColor = (status: App['accessStatus']) => {
    switch (status) {
      case 'available': return 'bg-chart-1 text-white'
      case 'requestRequired': return 'bg-chart-2 text-white'
      case 'pending': return 'bg-chart-2 text-white'
      case 'denied': return 'bg-destructive text-destructive-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusIcon = (status: App['accessStatus']) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-3 w-3" />
      case 'requestRequired': return <Clock className="h-3 w-3" />
      case 'pending': return <Clock className="h-3 w-3" />
      case 'denied': return <XCircle className="h-3 w-3" />
    }
  }

  const getStatusText = (status: App['accessStatus']) => {
    switch (status) {
      case 'available': return 'Available'
      case 'requestRequired': return 'Request Required'
      case 'pending': return 'Pending'
      case 'denied': return 'Access Denied'
    }
  }

  const getActionButton = () => {
    switch (app.accessStatus) {
      case 'available':
        return (
          <Button size="sm" className="flex-1" data-testid={`button-install-${app.id}`}>
            <Download className="h-3 w-3 mr-1" />
            Install
          </Button>
        )
      case 'requestRequired':
        return (
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => onRequestAccess(app.id)}
            data-testid={`button-request-${app.id}`}
          >
            Request Access
          </Button>
        )
      case 'pending':
        return (
          <Button size="sm" variant="secondary" disabled className="flex-1" data-testid={`button-pending-${app.id}`}>
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Button>
        )
      case 'denied':
        return (
          <Button size="sm" variant="destructive" disabled className="flex-1" data-testid={`button-denied-${app.id}`}>
            Access Denied
          </Button>
        )
    }
  }

  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`card-app-${app.id}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="text-2xl bg-card rounded-md p-2 border" data-testid={`icon-app-${app.id}`}>
            {app.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm mb-1 truncate" data-testid={`text-app-name-${app.id}`}>
              {app.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-2" data-testid={`text-app-publisher-${app.id}`}>
              {app.publisher}
            </p>
            <Badge 
              className={`text-xs px-2 py-1 ${getStatusColor(app.accessStatus)}`}
              data-testid={`badge-status-${app.id}`}
            >
              {getStatusIcon(app.accessStatus)}
              <span className="ml-1">{getStatusText(app.accessStatus)}</span>
            </Badge>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2" data-testid={`text-app-description-${app.id}`}>
          {app.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1" data-testid={`rating-${app.id}`}>
            <Star className="h-3 w-3 fill-chart-2 text-chart-2" />
            <span>{app.rating}</span>
            <span>({app.totalReviews})</span>
          </div>
          <div className="flex items-center gap-1" data-testid={`users-${app.id}`}>
            <Users className="h-3 w-3" />
            <span>{app.usageStats.activeUsers}</span>
          </div>
          <div className="flex items-center gap-1" data-testid={`growth-${app.id}`}>
            <TrendingUp className="h-3 w-3" />
            <span>+{app.usageStats.monthlyGrowth}%</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="secondary" className="text-xs px-2 py-0" data-testid={`badge-category-${app.id}`}>
            {app.category}
          </Badge>
          {app.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-0" data-testid={`badge-tag-${app.id}-${index}`}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        {getActionButton()}
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => onViewDetails(app.id)}
          data-testid={`button-details-${app.id}`}
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  )
}