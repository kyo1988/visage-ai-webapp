"use client";

import { track } from "@/app/lib/analytics";
import type { StoreProduct } from "@/lib/storeConfig";
import Image from "next/image";

interface StoreProductsClientProps {
    storeId: string;
    storeName: string;
    products: StoreProduct[];
    locale: "ja" | "en";
}

export default function StoreProductsClient({
    storeId,
    storeName,
    products,
    locale
}: StoreProductsClientProps) {

    const handleBuyClick = (product: StoreProduct) => {
        // Analytics tracking
        console.log("EC_CLICKED", { store_id: storeId, sku_id: product.id });
        track("ec_clicked", {
            store_id: storeId,
            sku_id: product.id,
            product_name: product.name,
            price: product.price
        });

        // Open EC link in new tab
        window.open(product.ec_url, "_blank", "noopener,noreferrer");
    };

    const title = locale === "ja"
        ? `${storeName} のおすすめ商品`
        : `${storeName} Recommendations`;

    const buyButtonText = locale === "ja" ? "購入する" : "Buy Online";

    return (
        <div>
            {/* Store Badge */}
            <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {storeName}
                </span>
            </div>

            {/* Product Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                    >
                        {/* Product Image */}
                        <div className="relative aspect-square bg-gray-100">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                onError={(e) => {
                                    // Fallback to placeholder if image fails
                                    (e.target as HTMLImageElement).src = "/images/placeholder-product.png";
                                }}
                            />
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 line-clamp-1">
                                {product.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                {product.description}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">
                                    {product.price}
                                </span>
                                <button
                                    onClick={() => handleBuyClick(product)}
                                    className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-600 hover:shadow-md active:scale-95"
                                >
                                    {buyButtonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Store Link Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                    {locale === "ja"
                        ? "商品は店頭でもお買い求めいただけます"
                        : "Products are also available in-store"}
                </p>
            </div>
        </div>
    );
}
