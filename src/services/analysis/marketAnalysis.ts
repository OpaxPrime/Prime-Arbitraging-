import type { Product } from '../../types';

export function analyzeSalesVelocity(product: Product) {
  // Analyze sales frequency and volume
  const velocityScore = calculateVelocityScore(product);
  const competitionLevel = analyzeCompetition(product);
  const seasonality = analyzeSeasonality(product);
  
  return {
    velocityScore,
    competitionLevel,
    seasonality,
    recommendation: generateRecommendation(velocityScore, competitionLevel, seasonality),
  };
}

function calculateVelocityScore(product: Product): number {
  // Implementation would use real sales data
  // For now, returning mock score
  return product.velocity;
}

function analyzeCompetition(product: Product) {
  const competitors = product.marketplaces.length;
  if (competitors <= 2) return 'Low';
  if (competitors <= 5) return 'Medium';
  return 'High';
}

function analyzeSeasonality(product: Product) {
  // Analyze historical price/sales data for seasonal patterns
  // Mock implementation
  return {
    hasSeasonal: true,
    peakMonths: ['November', 'December'],
    lowMonths: ['June', 'July'],
  };
}

function generateRecommendation(
  velocityScore: number,
  competition: string,
  seasonality: { hasSeasonal: boolean; peakMonths: string[]; lowMonths: string[] }
) {
  if (velocityScore > 8 && competition !== 'High') {
    return 'Strong Buy - High velocity with manageable competition';
  }
  if (velocityScore > 6 && competition === 'Low') {
    return 'Consider Buy - Good velocity with low competition';
  }
  return 'Monitor - Wait for better conditions';
}