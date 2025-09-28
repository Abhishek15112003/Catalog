import { useState, useMemo } from 'react'
import { Grid, List, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SearchBar, { SearchFilters } from './SearchBar'
import AppCard from './AppCard'
import { App } from '@/lib/types'

interface AppCatalogProps {
  apps: App[]
  onRequestAccess: (appId: string) => void
  onViewDetails: (appId: string) => void
}

export default function AppCatalog({ apps, onRequestAccess, onViewDetails }: AppCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter and search apps
  const filteredApps = useMemo(() => {
    let filtered = apps

    // Search by name, description, or publisher
    if (searchQuery) {
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by category
    if (filters.category && filters.category !== 'All Categories') {
      filtered = filtered.filter(app => app.category === filters.category)
    }

    // Filter by access status
    if (filters.accessStatus && filters.accessStatus !== 'All Status') {
      const statusMap: Record<string, string> = {
        'Available': 'available',
        'Request Required': 'requestRequired',
        'Pending': 'pending'
      }
      filtered = filtered.filter(app => app.accessStatus === statusMap[filters.accessStatus!])
    }

    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'Name A-Z':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'Recently Added':
          filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
          break
        case 'Rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'Popularity':
        default:
          filtered.sort((a, b) => b.usageStats.activeUsers - a.usageStats.activeUsers)
          break
      }
    }

    return filtered
  }, [apps, searchQuery, filters])

  // Get categories for filtering
  const categories = Array.from(new Set(apps.map(app => app.category)))
  const featuredApps = apps.filter(app => app.rating >= 4.7).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">App Catalog</h1>
          <p className="text-muted-foreground">
            Discover and access enterprise applications
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            data-testid="button-grid-view"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            data-testid="button-list-view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilters}
      />

      {/* Featured Apps Section */}
      {!searchQuery && Object.keys(filters).length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-chart-2" />
              Featured Applications
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Popular apps recommended by your organization
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredApps.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center gap-3 p-4 rounded-lg border hover-elevate cursor-pointer"
                  onClick={() => onViewDetails(app.id)}
                  data-testid={`featured-app-${app.id}`}
                >
                  <div className="text-3xl">{app.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{app.name}</h4>
                    <p className="text-sm text-muted-foreground">{app.publisher}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">{app.category}</Badge>
                      <span className="text-xs text-muted-foreground">⭐ {app.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Quick Filter */}
      {!searchQuery && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!filters.category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ ...filters, category: undefined })}
            data-testid="filter-all-categories"
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={filters.category === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ ...filters, category })}
              data-testid={`filter-category-${category.toLowerCase().replace(' ', '-')}`}
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground" data-testid="results-count">
          {filteredApps.length} application{filteredApps.length !== 1 ? 's' : ''} found
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* App Grid/List */}
      {filteredApps.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-semibold mb-2">No applications found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse different categories.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setFilters({})
              }}
              data-testid="button-clear-filters"
            >
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            : 'space-y-4'
        }>
          {filteredApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              onRequestAccess={onRequestAccess}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  )
}