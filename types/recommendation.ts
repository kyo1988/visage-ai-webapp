export type RakutenItem = {
  id: string;
  name: string;
  brand?: string;
  price?: string;
  image: string;
  url: string;
  source: "rakuten";
  keyword: string;
};

// CrystalAI Recommendation Types
export interface RecommendationItem {
  id: string;
  name: string;
  confidence: number;
  source: 'crystalai' | 'rakuten' | 'hybrid';
  demo_mode?: boolean;
  reason?: string;
  image_url?: string;
  imageUrl?: string;
  url?: string;
}

export interface MergedRecommendation {
  id: string;
  name: string;
  brand?: string;
  price?: string;
  image: string;
  url: string;
  source: 'crystalai' | 'rakuten' | 'hybrid';
  confidence?: number;
  reason?: string;
  demo_mode?: boolean;
  // Additional metadata
  recommendation_count?: number;
  weighted_confidence?: number;
}
