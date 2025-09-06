export interface GroceryItem {
  id: string
  name: string
  category?: string
  collected: boolean
  createdAt: Date
  updatedAt: Date
}

export type FilterType = 'all' | 'pending' | 'collected'

export interface GroceryStats {
  total: number
  collected: number
  pending: number
  completionRate: number
}

export const CATEGORIES = [
  'Frutas e Verduras',
  'Carnes e Peixes',
  'Laticínios',
  'Pães e Cereais',
  'Bebidas',
  'Limpeza',
  'Higiene',
  'Outros'
] as const

export type CategoryType = typeof CATEGORIES[number]