import type { Product, MarketplaceListing } from '../../types';

export function calculateRiskScore(product: Product) {
  const priceVolatility = calculatePriceVolatility(product.marketplaces);
  const marketplaceRisk = assessMarketplaceRisk(product.marketplaces);
  const competitionRisk = assessCompetitionRisk(product.marketplaces);
  
  // Weighted risk score calculation
  const riskScore = (
    priceVolatility * 0.4 +
    marketplaceRisk * 0.3 +
    competitionRisk * 0.3
  );
  
  return {
    overall: riskScore,
    factors: {
      priceVolatility,
      marketplaceRisk,
      competitionRisk,
    },
    riskLevel: getRiskLevel(riskScore),
    recommendations: generateRiskRecommendations(riskScore, {
      priceVolatility,
      marketplaceRisk,
      competitionRisk,
    }),
  };
}

function calculatePriceVolatility(listings: MarketplaceListing[]): number {
  const prices = listings.map(l => l.price);
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
  return Math.sqrt(variance) / mean;
}

function assessMarketplaceRisk(listings: MarketplaceListing[]): number {
  // Assess risk based on marketplace reliability and policies
  // Mock implementation
  return 0.5;
}

function assessCompetitionRisk(listings: MarketplaceListing[]): number {
  // Assess risk based on number of competitors and their pricing
  return Math.min(listings.length / 10, 1);
}

function getRiskLevel(score: number): 'Low' | 'Medium' | 'High' {
  if (score < 0.4) return 'Low';
  if (score < 0.7) return 'Medium';
  return 'High';
}

function generateRiskRecommendations(
  overall: number,
  factors: {
    priceVolatility: number;
    marketplaceRisk: number;
    competitionRisk: number;
  }
) {
  const recommendations: string[] = [];
  
  if (factors.priceVolatility > 0.6) {
    recommendations.push('High price volatility - Consider setting price alerts');
  }
  
  if (factors.marketplaceRisk > 0.6) {
    recommendations.push('Consider diversifying across more marketplaces');
  }
  
  if (factors.competitionRisk > 0.6) {
    recommendations.push('High competition - Monitor competitor pricing closely');
  }
  
  return recommendations;
}