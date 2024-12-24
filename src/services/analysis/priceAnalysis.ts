import type { MarketplaceListing, PricePoint } from '../../types';

export function calculatePriceStats(priceHistory: PricePoint[]) {
  const prices = priceHistory.map(p => p.price);
  return {
    mean: prices.reduce((a, b) => a + b, 0) / prices.length,
    median: prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)],
    min: Math.min(...prices),
    max: Math.max(...prices),
    volatility: calculateVolatility(prices),
  };
}

export function calculateArbitragePotential(listings: MarketplaceListing[]) {
  if (listings.length < 2) return 0;
  
  const prices = listings.map(l => l.price);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  
  return ((highestPrice - lowestPrice) / lowestPrice) * 100;
}

export function calculateVolatility(prices: number[]) {
  if (prices.length < 2) return 0;
  
  const returns = prices.slice(1).map((price, i) => 
    (price - prices[i]) / prices[i]
  );
  
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
  
  return Math.sqrt(variance) * 100; // Convert to percentage
}