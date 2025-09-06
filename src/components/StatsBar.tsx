'use client'

import { GroceryStats } from '@/types/grocery'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface StatsBarProps {
  stats: GroceryStats
}

export const StatsBar = ({ stats }: StatsBarProps) => {
  if (stats.total === 0) {
    return (
      <Card className="p-4 mb-6 bg-white/80 backdrop-blur-sm border-green-200">
        <div className="text-center text-gray-600">
          <p className="text-lg font-medium">Lista vazia</p>
          <p className="text-sm">Adicione itens à sua lista de compras</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4 mb-6 bg-white/80 backdrop-blur-sm border-green-200">
      <div className="space-y-4">
        {/* Progress Section */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Progresso das Compras
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              {stats.completionRate}%
            </div>
            <div className="text-xs text-gray-500">
              {stats.collected} de {stats.total}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress 
          value={stats.completionRate} 
          className="h-3 bg-gray-200"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">
              Total
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.pending}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">
              Pendentes
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.collected}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">
              Coletados
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {stats.completionRate === 100 && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <div className="text-green-600 text-xl">🎉</div>
              <div className="text-green-800 font-medium">
                Parabéns! Você coletou todos os itens!
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}