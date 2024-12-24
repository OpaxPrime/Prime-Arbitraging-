import { create } from 'zustand';
import type { Product, User } from '../types';

interface Store {
  user: User | null;
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  setUser: (user: User | null) => void;
  setProducts: (products: Product[]) => void;
  filterProducts: (category: string) => void;
  addToWatchlist: (product: Product) => void;
  removeFromWatchlist: (productId: string) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  products: [],
  filteredProducts: [],
  loading: false,
  setUser: (user) => set({ user }),
  setProducts: (products) => set({ products, filteredProducts: products }),
  filterProducts: (category) =>
    set((state) => ({
      filteredProducts: category === 'all' 
        ? state.products 
        : state.products.filter(p => p.category === category)
    })),
  addToWatchlist: (product) =>
    set((state) => ({
      user: state.user 
        ? { 
            ...state.user,
            watchlist: [...state.user.watchlist, product]
          }
        : null
    })),
  removeFromWatchlist: (productId) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            watchlist: state.user.watchlist.filter(p => p.id !== productId)
          }
        : null
    })),
}));