/**
 * Recommendation Merger
 * visage-ai-webapp/app/lib/recommendation_merger.ts
 * 
 * Merges CrystalAI recommendations with Rakuten products,
 * handling duplicates with weighted averages and metadata guarantees.
 */

import type { RecommendationItem, MergedRecommendation, RakutenItem } from "@/types/recommendation";

/**
 * Merge CrystalAI and Rakuten recommendations
 * 
 * Handles duplicates by:
 * 1. Calculating weighted average confidence
 * 2. Tracking recommendation count
 * 3. Preserving metadata from both sources
 * 
 * @param crystalAI - CrystalAI recommendations
 * @param rakuten - Rakuten products
 * @returns Merged recommendations
 */
export function mergeRecommendations(
  crystalAI: RecommendationItem[],
  rakuten: RakutenItem[]
): MergedRecommendation[] {
  
  const merged: Map<string, MergedRecommendation> = new Map();
  
  // Process CrystalAI recommendations
  for (const rec of crystalAI) {
    const key = rec.id;
    
    if (!merged.has(key)) {
      merged.set(key, {
        id: rec.id,
        name: rec.name,
        source: rec.source,
        confidence: rec.confidence,
        reason: rec.reason,
        demo_mode: rec.demo_mode,
        recommendation_count: 1,
        weighted_confidence: rec.confidence,
        // Placeholder values that will be filled from Rakuten
        image: '',
        url: '',
      });
    } else {
      // Duplicate found - update with weighted average
      const existing = merged.get(key)!;
      existing.recommendation_count = (existing.recommendation_count || 1) + 1;
      
      // Weighted average confidence
      const totalConfidence = (existing.weighted_confidence || existing.confidence || 0) + rec.confidence;
      existing.weighted_confidence = totalConfidence / existing.recommendation_count;
      
      // Merge metadata
      if (rec.reason && !existing.reason) {
        existing.reason = rec.reason;
      }
      if (rec.demo_mode !== undefined) {
        existing.demo_mode = rec.demo_mode;
      }
      
      // Update source to hybrid if not already
      if (existing.source !== 'hybrid') {
        existing.source = 'hybrid';
      }
    }
  }
  
  // Process Rakuten products and merge/enhance existing items
  for (const item of rakuten) {
    const key = item.id;
    
    if (merged.has(key)) {
      // Enhance existing recommendation with Rakuten metadata
      const existing = merged.get(key)!;
      
      // Add Rakuten-specific metadata
      if (item.brand) existing.brand = item.brand;
      if (item.price) existing.price = item.price;
      if (item.image) existing.image = item.image;
      if (item.url) existing.url = item.url;
      
      // Update source to hybrid
      existing.source = 'hybrid';
    } else {
      // New item from Rakuten
      merged.set(key, {
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        image: item.image,
        url: item.url,
        source: 'rakuten',
        recommendation_count: 1,
      });
    }
  }
  
  // Convert map to array and sort by confidence (highest first)
  const result = Array.from(merged.values())
    .sort((a, b) => {
      const confA = a.weighted_confidence || a.confidence || 0;
      const confB = b.weighted_confidence || b.confidence || 0;
      return confB - confA;
    });
  
  // Ensure metadata is complete
  return result.map(rec => ensureMetadata(rec));
}

/**
 * Ensure all required metadata fields are present
 * 
 * @param rec - Recommendation to ensure metadata for
 * @returns Recommendation with guaranteed metadata
 */
function ensureMetadata(rec: MergedRecommendation): MergedRecommendation {
  return {
    ...rec,
    id: rec.id || `rec_${Math.random().toString(36).substr(2, 9)}`,
    name: rec.name || 'Product',
    image: rec.image || '/images/placeholder.png',
    url: rec.url || '#',
    source: rec.source || 'rakuten',
    confidence: rec.confidence ?? 0.5,
    recommendation_count: rec.recommendation_count || 1,
    weighted_confidence: rec.weighted_confidence || rec.confidence || 0.5,
  };
}

/**
 * Filter recommendations by confidence threshold
 * 
 * @param recommendations - Recommendations to filter
 * @param minConfidence - Minimum confidence threshold (default: 0.3)
 * @returns Filtered recommendations
 */
export function filterByConfidence(
  recommendations: MergedRecommendation[],
  minConfidence: number = 0.3
): MergedRecommendation[] {
  return recommendations.filter(rec => {
    const confidence = rec.weighted_confidence || rec.confidence || 0;
    return confidence >= minConfidence;
  });
}

/**
 * Limit recommendations to top N items
 * 
 * @param recommendations - Recommendations to limit
 * @param limit - Maximum number of recommendations to return
 * @returns Limited recommendations
 */
export function limitRecommendations(
  recommendations: MergedRecommendation[],
  limit: number = 10
): MergedRecommendation[] {
  return recommendations.slice(0, limit);
}
