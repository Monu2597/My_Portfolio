import { create } from "zustand";

interface PortfolioState {
  currentSection: string;
  scrollProgress: number;
  isLoading: boolean;
  
  // Actions
  setCurrentSection: (section: string) => void;
  setScrollProgress: (progress: number) => void;
  setIsLoading: (loading: boolean) => void;
  initialize: () => void;
}

export const usePortfolio = create<PortfolioState>((set) => ({
  currentSection: 'hero',
  scrollProgress: 0,
  isLoading: true,
  
  setCurrentSection: (section) => set({ currentSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  initialize: () => {
    // Initialize portfolio state
    set({ isLoading: false });
  }
}));
