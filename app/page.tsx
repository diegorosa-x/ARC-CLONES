"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";

import type { CartItem, Manufacturer, Product } from "../types/types";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductDetailsPage from "@/components/ProductDetailsPage";
import Cart from "@/components/Cart";
import AIShopper from "@/components/AIShopper";
import { PRODUCTS } from "@/cosntants/contants";


type ViewMode = "Home" | "Catalog" | "Details";

export default function HomeClient() {
  const [viewMode, setViewMode] = useState<ViewMode>("Home");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [filterIds, setFilterIds] = useState<string[] | null>(null);

  const filteredProducts = useMemo(() => {
    let list: Product[] = PRODUCTS as Product[];

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (filterIds) {
      list = list.filter((p) => filterIds.includes(p.id));
    }

    return list;
  }, [selectedCategory, searchQuery, filterIds]);

  const handleAddToCart = useCallback(
    (product: Product, factory?: Manufacturer, finalPrice?: number) => {
      const pPrice = finalPrice ?? product.basePrice;

      setCart((prev) => {
        const itemKey = `${product.id}-${factory || "default"}`;
        const existing = prev.find(
          (item) =>
            `${item.id}-${item.selectedFactory || "default"}` === itemKey,
        );

        if (existing) {
          return prev.map((item) =>
            `${item.id}-${item.selectedFactory || "default"}` === itemKey
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [
          ...prev,
          { ...product, quantity: 1, selectedFactory: factory, finalPrice: pPrice },
        ];
      });

      setIsCartOpen(true);
    },
    [],
  );

  const handleRemoveFromCart = useCallback((id: string, factory?: Manufacturer) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.selectedFactory === factory)),
    );
  }, []);

  const handleCategorySelect = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setFilterIds(null);
    setViewMode(cat === "All" ? "Home" : "Catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleViewProduct = useCallback((product: Product) => {
    setActiveProduct(product);
    setViewMode("Details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-bg text-slate-900 dark:text-white transition-colors duration-300 selection:bg-brand-gold selection:text-brand-bg">
      <Header
        cartCount={cartCount}
        onSearch={setSearchQuery}
        onCategorySelect={handleCategorySelect}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {viewMode === "Home" && !searchQuery && !filterIds && (
        <section className="relative h-[70vh] md:h-[90vh] bg-brand-bg overflow-hidden border-b border-brand-muted">
          <Image
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=2000"
            alt="ARC Store Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg/50" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-4xl">
                <span className="text-[11px] font-brand font-bold uppercase tracking-[0.6em] mb-6 block text-brand-gold animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  Engenharia de Precisão
                </span>

                <h1 className="text-6xl md:text-9xl font-brand font-bold leading-none mb-8 tracking-tighter text-slate-900 dark:text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                  ARC{" "}
                  <span className="text-slate-400 dark:text-brand-muted transition-colors">
                    STORE
                  </span>
                </h1>

                <div className="flex space-x-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
                  <button
                    onClick={() => {
                      setViewMode("Catalog");
                      window.scrollTo({ top: 600, behavior: "smooth" });
                    }}
                    className="bg-brand-gold text-brand-bg px-12 py-5 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all shadow-2xl"
                  >
                    Ver Catálogo
                  </button>

                  <button
                    onClick={() => setFilterIds(["id-1", "id-2"])}
                    className="bg-transparent border border-brand-muted text-slate-900 dark:text-white px-12 py-5 font-bold uppercase tracking-[0.3em] text-[11px] hover:border-brand-gold hover:text-brand-gold transition-all"
                  >
                    Destaques
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <main>
        {viewMode === "Details" && activeProduct ? (
          <ProductDetailsPage
            product={activeProduct}
            onBack={() => setViewMode("Catalog")}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {filteredProducts.length > 0 ? (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  viewMode === "Catalog" ? "lg:grid-cols-3" : "lg:grid-cols-4"
                } gap-10`}
              >
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onViewDetails={handleViewProduct}
                    onQuickAdd={(prod: Product) => {
                      if (prod.factories) handleViewProduct(prod);
                      else handleAddToCart(prod);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-48 bg-brand-muted/10 rounded-sm">
                <h3 className="text-2xl font-serif font-bold text-slate-400">
                  Nenhum item encontrado.
                </h3>
                <p className="text-slate-500 mt-4 uppercase tracking-widest text-xs">
                  Tente ajustar a busca/filtros.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={(id: string) => {
          const item = cart.find((c) => c.id === id);
          handleRemoveFromCart(id, item?.selectedFactory);
        }}
      />

      <AIShopper
        onRecommendationClick={(ids: string[]) => {
          setFilterIds(ids);
          setViewMode("Catalog");
          window.scrollTo({ top: 600, behavior: "smooth" });
        }}
      />
    </div>
  );
}
