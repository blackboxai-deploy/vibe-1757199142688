import { GroceryItem } from '@/types/grocery'

const STORAGE_KEY = 'grocery-list'

export const saveToStorage = (items: GroceryItem[]): void => {
  try {
    const serializedItems = items.map(item => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString()
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedItems))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const loadFromStorage = (): GroceryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    
    const parsed = JSON.parse(stored)
    return parsed.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    }))
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return []
  }
}

export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}