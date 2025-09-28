import { useState } from 'react'
import SearchBar, { SearchFilters } from '../SearchBar'

export default function SearchBarExample() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    console.log('Search query changed:', query)
  }

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    console.log('Filters changed:', newFilters)
  }

  return (
    <div className="p-4">
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Search: "{searchQuery}"</p>
        <p>Filters: {JSON.stringify(filters, null, 2)}</p>
      </div>
    </div>
  )
}