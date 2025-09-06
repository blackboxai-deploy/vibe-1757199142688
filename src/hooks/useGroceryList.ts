'use client'

import { useState, useEffect, useMemo } from 'react'
import { GroceryItem, FilterType, GroceryStats } from '@/types/grocery'
import { saveToStorage, loadFromStorage, clearStorage } from '@/lib/storage'

export const useGroceryList = () => {
  const [items, setItems] = useState<GroceryItem[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load items from localStorage on mount
  useEffect(() => {
    const loadedItems = loadFromStorage()
    setItems(loadedItems)
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      saveToStorage(items)
    }
  }, [items, isLoaded])

  // Add new item
  const addItem = (name: string, category?: string) => {
    const newItem: GroceryItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      category,
      collected: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setItems(prev => [newItem, ...prev])
    return newItem
  }

  // Toggle item collected status
  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, collected: !item.collected, updatedAt: new Date() }
        : item
    ))
  }

  // Update item
  const updateItem = (id: string, updates: Partial<Pick<GroceryItem, 'name' | 'category'>>) => {
    setItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, ...updates, updatedAt: new Date() }
        : item
    ))
  }

  // Remove item
  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  // Clear all collected items
  const clearCompleted = () => {
    setItems(prev => prev.filter(item => !item.collected))
  }

  // Clear all items
  const clearAll = () => {
    setItems([])
    clearStorage()
  }

  // Filtered items based on current filter and search
  const filteredItems = useMemo(() => {
    let result = items

    // Apply search filter
    if (searchTerm) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply status filter
    switch (filter) {
      case 'pending':
        result = result.filter(item => !item.collected)
        break
      case 'collected':
        result = result.filter(item => item.collected)
        break
      default:
        // 'all' - no additional filtering
        break
    }

    return result
  }, [items, filter, searchTerm])

  // Statistics
  const stats: GroceryStats = useMemo(() => {
    const total = items.length
    const collected = items.filter(item => item.collected).length
    const pending = total - collected
    const completionRate = total > 0 ? Math.round((collected / total) * 100) : 0

    return {
      total,
      collected,
      pending,
      completionRate
    }
  }, [items])

  return {
    items: filteredItems,
    allItems: items,
    filter,
    searchTerm,
    stats,
    isLoaded,
    setFilter,
    setSearchTerm,
    addItem,
    toggleItem,
    updateItem,
    removeItem,
    clearCompleted,
    clearAll
  }
}