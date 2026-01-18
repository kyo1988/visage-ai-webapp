// lib/storeConfig.ts
// Store Injection: 店舗別設定のモック（将来的にはFirestore/JSON配信に置き換え）

export interface StoreProduct {
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    ec_url: string;
    tags: string[];
}

export interface StoreConfig {
    name: string;
    logo?: string;
    products: StoreProduct[];
}

export const MOCK_STORES: Record<string, StoreConfig> = {
    "ginza_001": {
        name: "Ginza Flagship Store",
        logo: "/images/stores/ginza-logo.png",
        products: [
            {
                id: "sku_101",
                name: "Premium Moisture Lotion",
                price: "¥5,800",
                image: "/images/products/lotion.png",
                description: "当店人気No.1の保湿化粧水。ヒアルロン酸配合。",
                ec_url: "https://example.com/item/101?ref=visage",
                tags: ["dry", "sensitive"]
            },
            {
                id: "sku_102",
                name: "Vitamin C Serum",
                price: "¥8,200",
                image: "/images/products/serum.png",
                description: "毛穴が気になる方への集中美容液。",
                ec_url: "https://example.com/item/102?ref=visage",
                tags: ["pore", "oily"]
            },
            {
                id: "sku_103",
                name: "Gentle Cleansing Foam",
                price: "¥3,500",
                image: "/images/products/cleanser.png",
                description: "敏感肌にも優しい低刺激洗顔フォーム。",
                ec_url: "https://example.com/item/103?ref=visage",
                tags: ["sensitive", "normal"]
            }
        ]
    },
    "shibuya_002": {
        name: "Shibuya Beauty Lab",
        products: [
            {
                id: "sku_201",
                name: "Oil Control Toner",
                price: "¥4,200",
                image: "/images/products/toner.png",
                description: "皮脂バランスを整える収れん化粧水。",
                ec_url: "https://example.com/item/201?ref=visage",
                tags: ["oily", "combination"]
            },
            {
                id: "sku_202",
                name: "Retinol Night Cream",
                price: "¥12,000",
                image: "/images/products/cream.png",
                description: "エイジングケアのための夜用クリーム。",
                ec_url: "https://example.com/item/202?ref=visage",
                tags: ["aging", "dry"]
            }
        ]
    }
};

export function getStoreConfig(storeId: string): StoreConfig | null {
    return MOCK_STORES[storeId] || null;
}
