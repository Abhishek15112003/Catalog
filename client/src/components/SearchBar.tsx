import { useState } from 'react'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onFilterChange: (filters: SearchFilters) => void
  className?: string
}

export interface SearchFilters {
  category?: string
  accessStatus?: string
  department?: string
  sortBy?: string
}

export default function SearchBar({ searchQuery, onSearchChange, onFilterChange, className }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({})

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
    console.log('Filter changed:', key, value)
  }

  const categories = ['All Categories', 'Communication', 'Design', 'CRM', 'Productivity', 'Development']
  const accessStatuses = ['All Status', 'Available', 'Request Required', 'Pending']
  const departments = ['All Departments', 'Engineering', 'Design', 'Sales', 'Marketing', 'Product']
  const sortOptions = ['Popularity', 'Name A-Z', 'Recently Added', 'Rating']

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search applications..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          data-testid="input-search"
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" data-testid="button-category-filter">
            <Filter className="h-4 w-4 mr-2" />
            Category
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((category) => (
            <DropdownMenuItem 
              key={category}
              onClick={() => handleFilterChange('category', category)}
              data-testid={`filter-category-${category.toLowerCase().replace(' ', '-')}`}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" data-testid="button-status-filter">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Status
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Filter by Access Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {accessStatuses.map((status) => (
            <DropdownMenuItem 
              key={status}
              onClick={() => handleFilterChange('accessStatus', status)}
              data-testid={`filter-status-${status.toLowerCase().replace(' ', '-')}`}
            >
              {status}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" data-testid="button-sort">
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sortOptions.map((option) => (
            <DropdownMenuItem 
              key={option}
              onClick={() => handleFilterChange('sortBy', option)}
              data-testid={`sort-${option.toLowerCase().replace(' ', '-')}`}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}