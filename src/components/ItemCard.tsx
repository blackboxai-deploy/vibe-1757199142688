'use client'

import { useState } from 'react'
import { GroceryItem } from '@/types/grocery'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CATEGORIES } from '@/types/grocery'

interface ItemCardProps {
  item: GroceryItem
  onToggle: (id: string) => void
  onUpdate: (id: string, updates: Partial<Pick<GroceryItem, 'name' | 'category'>>) => void
  onRemove: (id: string) => void
}

export const ItemCard = ({ item, onToggle, onUpdate, onRemove }: ItemCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(item.name)
  const [editCategory, setEditCategory] = useState(item.category || '')
  const [isRemoving, setIsRemoving] = useState(false)

  const handleSaveEdit = () => {
    if (editName.trim()) {
      onUpdate(item.id, {
        name: editName.trim(),
        category: editCategory || undefined
      })
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditName(item.name)
    setEditCategory(item.category || '')
    setIsEditing(false)
  }

  const handleRemove = async () => {
    setIsRemoving(true)
    // Small delay for UX feedback
    setTimeout(() => {
      onRemove(item.id)
    }, 200)
  }

  const getCategoryIcon = (category?: string): string => {
    if (!category) return '📦'
    
    const icons: Record<string, string> = {
      'Frutas e Verduras': '🥬',
      'Carnes e Peixes': '🥩',
      'Laticínios': '🥛',
      'Pães e Cereais': '🍞',
      'Bebidas': '🥤',
      'Limpeza': '🧽',
      'Higiene': '🧴',
      'Outros': '📦'
    }
    return icons[category] || '📦'
  }

  return (
    <Card 
      className={`
        p-4 transition-all duration-300 border-l-4
        ${item.collected 
          ? 'bg-green-50/80 border-l-green-500 border-green-200' 
          : 'bg-white/80 border-l-blue-500 border-gray-200'
        }
        ${isRemoving ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
        hover:shadow-md backdrop-blur-sm
      `}
    >
      {isEditing ? (
        // Edit Mode
        <div className="space-y-3">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSaveEdit()
              if (e.key === 'Escape') handleCancelEdit()
            }}
            autoFocus
          />
          
          <Select value={editCategory} onValueChange={setEditCategory}>
            <SelectTrigger className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500">
              <SelectValue placeholder="Categoria (opcional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Sem categoria</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  <div className="flex items-center space-x-2">
                    <span>{getCategoryIcon(category)}</span>
                    <span>{category}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={handleSaveEdit}
              disabled={!editName.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              ✅ Salvar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancelEdit}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
            >
              ❌ Cancelar
            </Button>
          </div>
        </div>
      ) : (
        // Display Mode
        <div className="flex items-center space-x-3">
          {/* Checkbox */}
          <Checkbox
            checked={item.collected}
            onCheckedChange={() => onToggle(item.id)}
            className="w-5 h-5 border-2 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 
                className={`
                  font-medium text-lg leading-tight
                  ${item.collected 
                    ? 'line-through text-gray-500' 
                    : 'text-gray-800'
                  }
                `}
              >
                {item.name}
              </h3>
              
              {item.category && (
                <Badge 
                  variant="secondary" 
                  className={`
                    text-xs flex items-center space-x-1
                    ${item.collected 
                      ? 'bg-gray-200 text-gray-500' 
                      : 'bg-blue-100 text-blue-800'
                    }
                  `}
                >
                  <span>{getCategoryIcon(item.category)}</span>
                  <span>{item.category}</span>
                </Badge>
              )}
            </div>
            
            {/* Timestamp */}
            <div className="text-xs text-gray-400">
              {item.collected && item.updatedAt.getTime() !== item.createdAt.getTime() && (
                <span>✅ Coletado em {item.updatedAt.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              )}
              {!item.collected && (
                <span>➕ Adicionado em {item.createdAt.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-blue-100 text-blue-600"
              title="Editar item"
            >
              ✏️
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRemove}
              disabled={isRemoving}
              className="p-2 hover:bg-red-100 text-red-600"
              title="Remover item"
            >
              🗑️
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}