import { Clock, CheckCircle, TrendingUp, Plus, Star, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { App, AccessRequest, UserProfile } from '@/lib/types'

interface DashboardProps {
  userProfile: UserProfile
  activeApps: App[]
  pendingRequests: AccessRequest[]
  recommendedApps: App[]
  onViewCatalog: () => void
  onViewApp: (appId: string) => void
}

export default function Dashboard({ 
  userProfile, 
  activeApps, 
  pendingRequests, 
  recommendedApps,
  onViewCatalog,
  onViewApp 
}: DashboardProps) {
  const stats = {
    totalApps: activeApps.length,
    pendingRequests: pendingRequests.length,
    weeklyUsage: 32, // hours
    completedTraining: 8
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl bg-primary/10 rounded-full p-3" data-testid="user-avatar">
            {userProfile.avatar}
          </div>
          <div>
            <h1 className="text-2xl font-bold" data-testid="welcome-title">
              Welcome back, {userProfile.name}
            </h1>
            <p className="text-muted-foreground" data-testid="user-role">
              {userProfile.role} • {userProfile.department}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-chart-1/10 p-2 rounded-md">
                <CheckCircle className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Apps</p>
                <p className="text-2xl font-bold" data-testid="stat-active-apps">{stats.totalApps}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-chart-2/10 p-2 rounded-md">
                <Clock className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold" data-testid="stat-pending">{stats.pendingRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-chart-3/10 p-2 rounded-md">
                <TrendingUp className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weekly Usage</p>
                <p className="text-2xl font-bold" data-testid="stat-usage">{stats.weeklyUsage}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-chart-4/10 p-2 rounded-md">
                <Star className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Training</p>
                <p className="text-2xl font-bold" data-testid="stat-training">{stats.completedTraining}/10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Applications</CardTitle>
            <Button variant="ghost" size="sm" onClick={onViewCatalog} data-testid="button-browse-catalog">
              <Plus className="h-4 w-4 mr-2" />
              Browse Catalog
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeApps.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No applications installed yet</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={onViewCatalog}>
                  Explore Apps
                </Button>
              </div>
            ) : (
              activeApps.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover-elevate cursor-pointer"
                  onClick={() => onViewApp(app.id)}
                  data-testid={`active-app-${app.id}`}
                >
                  <div className="text-2xl">{app.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{app.name}</h4>
                    <p className="text-sm text-muted-foreground truncate">{app.category}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {app.usageStats.activeUsers} users
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-chart-1" />
                <p>No pending requests</p>
              </div>
            ) : (
              pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                  data-testid={`pending-request-${request.id}`}
                >
                  <div>
                    <h4 className="font-medium">{request.appName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Requested on {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {request.status}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommended Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on your role and department
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedApps.slice(0, 3).map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-lg border hover-elevate cursor-pointer"
                onClick={() => onViewApp(app.id)}
                data-testid={`recommended-app-${app.id}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-2xl">{app.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{app.name}</h4>
                    <p className="text-sm text-muted-foreground">{app.publisher}</p>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {app.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-chart-2 text-chart-2" />
                    <span>{app.rating}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {app.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" onClick={onViewCatalog} data-testid="action-browse">
              <Plus className="h-5 w-5" />
              <span className="text-sm">Browse Apps</span>
            </Button>
            
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" data-testid="action-requests">
              <Clock className="h-5 w-5" />
              <span className="text-sm">View Requests</span>
            </Button>
            
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" data-testid="action-training">
              <Star className="h-5 w-5" />
              <span className="text-sm">Training</span>
            </Button>
            
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" data-testid="action-support">
              <Users className="h-5 w-5" />
              <span className="text-sm">Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}