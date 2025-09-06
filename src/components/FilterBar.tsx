'use client'

import { FilterType } from '@/types/grocery'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface FilterBarProps {
  filter: FilterType
  searchTerm: string
  itemCount: number
  onFilterChange: (filter: FilterType) => void
  onSearchChange: (search: string) => void
  onClearCompleted: () => void
  hasCompletedItems: boolean
}

export const FilterBar = ({
  filter,
  searchTerm,
  itemCount,
  onFilterChange,
  onSearchChange,
  onClearCompleted,
  hasCompletedItems
}: FilterBarProps) => {
  const filterButtons = [
    { key: 'all' as FilterType, label: 'Todos', icon: '📝' },
    { key: 'pending' as FilterType, label: 'Pendentes', icon: '⏳' },
    { key: 'collected' as FilterType, label: 'Coletados', icon: '✅' }
  ]

  return (
    <Card className="p-4 mb-6 bg-white/80 backdrop-blur-sm border-green-200">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Pesquisar itens..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-400 text-lg">🔍</span>
          </div>
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <span className="text-lg">✕</span>
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((btn) => (
            <Button
              key={btn.key}
              variant={filter === btn.key ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(btn.key)}
              className={`
                flex items-center space-x-2 transition-all duration-200
                ${filter === btn.key 
                  ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' 
                  : 'bg-white hover:bg-green-50 text-gray-700 border-gray-300'
                }
              `}
            >
              <span>{btn.icon}</span>
              <span>{btn.label}</span>
            </Button>
          ))}
          
          {/* Clear Completed Button */}
          {hasCompletedItems && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearCompleted}
              className="flex items-center space-x-2 bg-white hover:bg-red-50 text-red-600 border-red-300 hover:border-red-400 ml-auto"
            >
              <span>🗑️</span>
              <span>Limpar Coletados</span>
            </Button>
          )}
        </div>

        {/* Results Count */}
        {(searchTerm || filter !== 'all') && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {itemCount} {itemCount === 1 ? 'item encontrado' : 'itens encontrados'}
            </Badge>
            
            {searchTerm && (
              <Badge variant="outline" className="border-green-300 text-green-700">
                Pesquisa: "{searchTerm}"
              </Badge>
            )}
            
            {filter !== 'all' && (
              <Badge variant="outline" className="border-green-300 text-green-700">
                Filtro: {filterButtons.find(b => b.key === filter)?.label}
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}