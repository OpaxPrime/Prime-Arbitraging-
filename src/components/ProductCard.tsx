import React from 'react';
import { TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { user, addToWatchlist } = useStore();
  const profitClass = product.profitPotential > 20 
    ? 'text-green-400' 
    : product.profitPotential > 10 
    ? 'text-yellow-400' 
    : 'text-red-400';

  return (
    <div className="bg-navy-900 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-blue-900">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{product.name}</h3>
        <div className="flex gap-2">
          {product.velocity > 8 && (
            <TrendingUp className="text-green-400" size={20} />
          )}
          {product.riskScore > 7 && (
            <AlertTriangle className="text-yellow-400" size={20} />
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Current Price</span>
          <span className="text-white font-mono">${product.currentPrice}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Profit Potential</span>
          <span className={`font-mono ${profitClass}`}>
            {product.profitPotential}%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Marketplaces</span>
          <span className="text-white font-mono">
            {product.marketplaces.length}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => addToWatchlist(product)}
          disabled={!user}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
        >
          Watch
        </button>
        <button className="p-2 bg-navy-800 hover:bg-navy-700 rounded-md transition-colors duration-200">
          <BarChart3 size={20} className="text-blue-400" />
        </button>
      </div>
    </div>
  );
}