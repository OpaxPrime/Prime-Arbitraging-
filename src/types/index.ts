export interface Product {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  historicalPrices: PricePoint[];
  marketplaces: MarketplaceListing[];
  riskScore: number;
  profitPotential: number;
  velocity: number; // Sales velocity score
}

export interface PricePoint {
  price: number;
  timestamp: string;
  marketplace: string;
}

export interface MarketplaceListing {
  marketplace: string;
  price: number;
  url: string;
  lastUpdated: string;
}

export interface User {
  id: string;
  email: string;
  isPremium: boolean;
  inventory: InventoryItem[];
  watchlist: Product[];
}

export interface InventoryItem {
  productId: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  listings: MarketplaceListing[];
}