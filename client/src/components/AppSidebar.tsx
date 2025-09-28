import { Home, Search, Clock, User, Settings, HelpCircle, Grid3X3 } from 'lucide-react'
import { Link, useLocation } from 'wouter'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
    testId: 'nav-dashboard'
  },
  {
    title: 'App Catalog',
    url: '/catalog',
    icon: Grid3X3,
    testId: 'nav-catalog'
  },
  {
    title: 'My Requests',
    url: '/requests',
    icon: Clock,
    testId: 'nav-requests'
  }
]

const supportItems = [
  {
    title: 'Help & Support',
    url: '/support',
    icon: HelpCircle,
    testId: 'nav-support'
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    testId: 'nav-settings'
  }
]

export function AppSidebar() {
  const [location] = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground rounded-md p-2">
            <Grid3X3 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">App Catalog</h2>
            <p className="text-xs text-muted-foreground">Enterprise Apps</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={item.testId}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={item.testId}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="justify-start" data-testid="user-profile">
            <User className="h-4 w-4 mr-2" />
            <span className="text-sm">Profile</span>
          </Button>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}