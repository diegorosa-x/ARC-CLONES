"use client";

import React, { useMemo, useState } from "react";
import type { Product, Manufacturer } from "../types/types";
import Image from "next/image";

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (
    p: Product,
    factory?: Manufacturer,
    finalPrice?: number,
  ) => void;
}

/* =========================
   🔹 MOVIDO PARA FORA
========================= */
interface SpecSectionProps {
  title: string;
  items: Record<string, string>;
}

const SpecSection: React.FC<SpecSectionProps> = ({ title, items }) => {
  return (
    <div className="mb-8">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4 border-b border-brand-muted pb-2">
        {title}
      </h4>

      <div className="flex flex-col">
        {Object.entries(items).map(([label, value], idx) => (
          <div
            key={label}
            className={`flex py-3 px-4 text-[11px] ${
              idx % 2 === 0 ? "bg-brand-muted/10" : ""
            }`}
          >
            <span className="w-1/3 font-bold uppercase tracking-wider">
              {label}
            </span>
            <span className="w-2/3">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ========================= */

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onBack,
  onAddToCart,
}) => {
  /* =========================
     🔹 STATES SIMPLES
  ========================= */

  const [selectedFactory, setSelectedFactory] = useState<
    Manufacturer | undefined
  >(product.factories?.[0]?.factory);

  const [mainImage, setMainImage] = useState(product.image);
  const [showFullDesc, setShowFullDesc] = useState(false);

  /* =========================
     🔹 DERIVED DATA (SEM useEffect)
  ========================= */

  const currentFactoryData = useMemo(() => {
    return product.factories?.find((f) => f.factory === selectedFactory);
  }, [product, selectedFactory]);

  const finalPrice = currentFactoryData
    ? currentFactoryData.price
    : product.basePrice;

  const galleryImages = useMemo(() => {
    return (product.images || [product.image]).slice(0, 3);
  }, [product]);

  /* ========================= */

  return (
    <div className="bg-brand-bg">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]"
        >
          ← Voltar
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* ===== TOP SECTION ===== */}
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          {/* Gallery */}
          <div className="w-full lg:w-3/5 flex gap-6">
            <div className="hidden md:flex flex-col gap-4 w-20">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`relative aspect-square border ${
                    mainImage === img
                      ? "border-brand-gold"
                      : "border-brand-muted"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumb ${idx}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>

            <div className="relative flex-1 aspect-square border border-brand-muted overflow-hidden">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Config + Buy */}
          <div className="w-full lg:w-2/5">
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">
              {product.brand}
            </span>

            <h1 className="text-4xl font-serif font-bold my-6">
              {product.name}
            </h1>

            <div className="text-3xl font-bold text-brand-gold mb-8">
              R$ {finalPrice.toLocaleString("pt-BR")}
            </div>

            {/* Factory Selector */}
            {product.factories && (
              <div className="mb-12 space-y-4">
                {product.factories.map((f) => (
                  <button
                    key={f.factory}
                    onClick={() => setSelectedFactory(f.factory)}
                    className={`w-full p-4 border ${
                      selectedFactory === f.factory
                        ? "border-brand-gold"
                        : "border-brand-muted"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-bold uppercase text-xs">
                        {f.factory}
                      </span>
                      <span>R$ {f.price.toLocaleString("pt-BR")}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => onAddToCart(product, selectedFactory, finalPrice)}
              className="w-full bg-brand-gold py-4 font-bold uppercase tracking-widest"
            >
              ADD TO BAG
            </button>
          </div>
        </div>

        {/* ===== BOTTOM SECTION ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t pt-16">
          {/* Specs */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-10 uppercase">
              Product Details
            </h3>

            {product.specs?.general && (
              <SpecSection title="General" items={product.specs.general} />
            )}
            {product.specs?.case && (
              <SpecSection title="Case" items={product.specs.case} />
            )}
            {product.specs?.band && (
              <SpecSection title="Band" items={product.specs.band} />
            )}
            {product.specs?.dial && (
              <SpecSection title="Dial" items={product.specs.dial} />
            )}
            {product.specs?.movement && (
              <SpecSection title="Movement" items={product.specs.movement} />
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-6">
              Description
            </h4>

            <div
              className={`text-sm leading-loose overflow-hidden transition-all ${
                showFullDesc ? "max-h-[2000px]" : "max-h-24"
              }`}
            >
              <p>{product.description}</p>
            </div>

            <button
              onClick={() => setShowFullDesc((prev) => !prev)}
              className="mt-4 text-xs font-bold uppercase text-brand-gold"
            >
              {showFullDesc ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
