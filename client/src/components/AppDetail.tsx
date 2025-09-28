import { useState } from 'react'
import { ArrowLeft, Star, Users, TrendingUp, Calendar, Shield, Download, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { App } from '@/lib/types'

interface AppDetailProps {
  app: App
  onBack: () => void
  onRequestAccess: (appId: string) => void
}

export default function AppDetail({ app, onBack, onRequestAccess }: AppDetailProps) {
  const [activeTab, setActiveTab] = useState('overview')

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
      case 'available': return <CheckCircle className="h-4 w-4" />
      case 'requestRequired': return <Clock className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'denied': return <XCircle className="h-4 w-4" />
    }
  }

  const getActionButton = () => {
    switch (app.accessStatus) {
      case 'available':
        return (
          <Button size="lg" className="w-full sm:w-auto" data-testid="button-install-app">
            <Download className="h-4 w-4 mr-2" />
            Install Application
          </Button>
        )
      case 'requestRequired':
        return (
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => onRequestAccess(app.id)}
            data-testid="button-request-access"
          >
            Request Access
          </Button>
        )
      case 'pending':
        return (
          <Button size="lg" variant="secondary" disabled className="w-full sm:w-auto" data-testid="button-access-pending">
            <Clock className="h-4 w-4 mr-2" />
            Access Pending
          </Button>
        )
      case 'denied':
        return (
          <Button size="lg" variant="destructive" disabled className="w-full sm:w-auto" data-testid="button-access-denied">
            Access Denied
          </Button>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} data-testid="button-back">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Catalog
        </Button>
      </div>

      {/* Hero Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="text-6xl bg-card rounded-lg p-4 border w-fit" data-testid="app-icon">
              {app.icon}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2" data-testid="app-name">{app.name}</h1>
                <p className="text-muted-foreground mb-3" data-testid="app-publisher">{app.publisher}</p>
                <p className="text-sm leading-relaxed" data-testid="app-description">{app.description}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-chart-2 text-chart-2" />
                  <span className="font-medium">{app.rating}</span>
                  <span className="text-muted-foreground">({app.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{app.usageStats.activeUsers} active users</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{app.usageStats.monthlyGrowth}% this month</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge className={getStatusColor(app.accessStatus)} data-testid="app-status">
                  {getStatusIcon(app.accessStatus)}
                  <span className="ml-1">
                    {app.accessStatus === 'available' ? 'Available' :
                     app.accessStatus === 'requestRequired' ? 'Request Required' :
                     app.accessStatus === 'pending' ? 'Pending' : 'Access Denied'}
                  </span>
                </Badge>
                <Badge variant="secondary">{app.category}</Badge>
                {app.department.map((dept, index) => (
                  <Badge key={index} variant="outline">{dept}</Badge>
                ))}
              </div>
              
              <div className="pt-2">
                {getActionButton()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="features" data-testid="tab-features">Features</TabsTrigger>
          <TabsTrigger value="requirements" data-testid="tab-requirements">Requirements</TabsTrigger>
          <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Users</span>
                  <span className="font-medium">{app.usageStats.activeUsers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monthly Growth</span>
                  <span className="font-medium text-chart-1">+{app.usageStats.monthlyGrowth}%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Adoption Rate</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Application Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Last Updated
                  </span>
                  <span className="font-medium">{app.lastUpdated}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Security Level
                  </span>
                  <Badge variant="outline">Enterprise</Badge>
                </div>
                <div>
                  <span className="text-sm block mb-2">Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {app.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {app.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-chart-1 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {app.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-chart-2 mt-0.5 flex-shrink-0" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-2 text-sm">
                <div>5 stars</div>
                <div className="col-span-3"><Progress value={75} className="h-2" /></div>
                <div className="text-right">75%</div>
                
                <div>4 stars</div>
                <div className="col-span-3"><Progress value={15} className="h-2" /></div>
                <div className="text-right">15%</div>
                
                <div>3 stars</div>
                <div className="col-span-3"><Progress value={7} className="h-2" /></div>
                <div className="text-right">7%</div>
                
                <div>2 stars</div>
                <div className="col-span-3"><Progress value={2} className="h-2" /></div>
                <div className="text-right">2%</div>
                
                <div>1 star</div>
                <div className="col-span-3"><Progress value={1} className="h-2" /></div>
                <div className="text-right">1%</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}