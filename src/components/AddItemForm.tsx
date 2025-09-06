'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CATEGORIES } from '@/types/grocery'

interface AddItemFormProps {
  onAddItem: (name: string, category?: string) => void
}

export const AddItemForm = ({ onAddItem }: AddItemFormProps) => {
  const [itemName, setItemName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!itemName.trim()) return
    
    setIsLoading(true)
    
    try {
      onAddItem(
        itemName.trim(), 
        selectedCategory || undefined
      )
      
      // Reset form
      setItemName('')
      setSelectedCategory('')
    } catch (error) {
      console.error('Error adding item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <Card className="p-4 mb-6 bg-white/80 backdrop-blur-sm border-green-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl">🛒</span>
          <h2 className="text-xl font-semibold text-gray-800">
            Adicionar Item
          </h2>
        </div>
        
        {/* Item Name Input */}
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Nome do item (ex: Banana, Leite, Pão...)"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
            disabled={isLoading}
            autoFocus
          />
        </div>

        {/* Category Select */}
        <div className="space-y-2">
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
            disabled={isLoading}
          >
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
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            type="submit"
            disabled={!itemName.trim() || isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adicionando...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>➕</span>
                <span>Adicionar Item</span>
              </div>
            )}
          </Button>

          {(itemName || selectedCategory) && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setItemName('')
                setSelectedCategory('')
              }}
              disabled={isLoading}
              className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
            >
              <span>🧹</span>
              <span className="hidden sm:inline ml-1">Limpar</span>
            </Button>
          )}
        </div>

        {/* Quick Tip */}
        <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded border border-blue-200">
          💡 <strong>Dica:</strong> Pressione Enter para adicionar rapidamente ou escolha uma categoria para organizar melhor sua lista.
        </div>
      </form>
    </Card>
  )
}

// Helper function to get category icons
const getCategoryIcon = (category: string): string => {
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