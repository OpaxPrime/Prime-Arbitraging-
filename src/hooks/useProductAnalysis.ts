import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { calculateRiskScore } from '../services/analysis/riskAnalysis';
import { analyzeSalesVelocity } from '../services/analysis/marketAnalysis';
import { calculatePriceStats, calculateArbitragePotential } from '../services/analysis/priceAnalysis';

export function useProductAnalysis(product: Product) {
  const [analysis, setAnalysis] = useState<{
    risk: ReturnType<typeof calculateRiskScore>;
    market: ReturnType<typeof analyzeSalesVelocity>;
    price: {
      stats: ReturnType<typeof calculatePriceStats>;
      arbitragePotential: number;
    };
  } | null>(null);

  useEffect(() => {
    const analyzeProduct = () => {
      const risk = calculateRiskScore(product);
      const market = analyzeSalesVelocity(product);
      const priceStats = calculatePriceStats(product.historicalPrices);
      const arbitragePotential = calculateArbitragePotential(product.marketplaces);

      setAnalysis({
        risk,
        market,
        price: {
          stats: priceStats,
          arbitragePotential,
        },
      });
    };

    analyzeProduct();
  }, [product]);

  return analysis;
}