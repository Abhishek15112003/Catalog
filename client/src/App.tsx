import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "@/components/Dashboard";
import AppCatalog from "@/components/AppCatalog";
import AppDetail from "@/components/AppDetail";
import AccessRequestFlow from "@/components/AccessRequestFlow";
import { mockApps, mockAccessRequests, mockUserProfile } from "@/lib/mockData";
import type { App as AppType } from "@/lib/types";
import NotFound from "@/pages/not-found";

function Router() {
  const [selectedApp, setSelectedApp] = useState<AppType | null>(null);
  const [showAccessRequest, setShowAccessRequest] = useState(false);
  
  // todo: remove mock functionality
  const activeApps = mockApps.filter(app => app.accessStatus === 'available');
  const recommendedApps = mockApps.filter(app => app.accessStatus === 'requestRequired');

  const handleViewApp = (appId: string) => {
    const app = mockApps.find(a => a.id === appId);
    if (app) {
      setSelectedApp(app);
    }
  };

  const handleRequestAccess = (appId: string) => {
    const app = mockApps.find(a => a.id === appId);
    if (app) {
      setSelectedApp(app);
      setShowAccessRequest(true);
    }
  };

  const handleBackToCatalog = () => {
    setSelectedApp(null);
    setShowAccessRequest(false);
  };

  const handleSubmitRequest = (justification: string) => {
    console.log('Access request submitted:', justification);
    setShowAccessRequest(false);
    setSelectedApp(null);
  };

  if (showAccessRequest && selectedApp) {
    return (
      <AccessRequestFlow
        app={selectedApp}
        onBack={handleBackToCatalog}
        onSubmit={handleSubmitRequest}
      />
    );
  }

  if (selectedApp) {
    return (
      <AppDetail
        app={selectedApp}
        onBack={handleBackToCatalog}
        onRequestAccess={handleRequestAccess}
      />
    );
  }

  return (
    <Switch>
      <Route path="/">
        <Dashboard
          userProfile={mockUserProfile}
          activeApps={activeApps}
          pendingRequests={mockAccessRequests}
          recommendedApps={recommendedApps}
          onViewCatalog={() => window.location.href = '/catalog'}
          onViewApp={handleViewApp}
        />
      </Route>
      <Route path="/catalog">
        <AppCatalog
          apps={mockApps}
          onRequestAccess={handleRequestAccess}
          onViewDetails={handleViewApp}
        />
      </Route>
      <Route path="/requests">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">My Requests</h1>
          <p className="text-muted-foreground">Request management functionality coming soon...</p>
        </div>
      </Route>
      <Route path="/support">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
          <p className="text-muted-foreground">Support documentation and resources coming soon...</p>
        </div>
      </Route>
      <Route path="/settings">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <p className="text-muted-foreground">User settings and preferences coming soon...</p>
        </div>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1">
                <header className="flex items-center justify-between p-4 border-b bg-background">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <h1 className="font-semibold">Enterprise App Catalog</h1>
                  <div className="w-10" /> {/* Spacer for alignment */}
                </header>
                <main className="flex-1 overflow-auto">
                  <div className="p-6">
                    <Router />
                  </div>
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
