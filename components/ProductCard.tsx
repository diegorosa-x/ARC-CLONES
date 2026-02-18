import React from "react";
import { Product } from "../types/types";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onViewDetails: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onQuickAdd,
}) => {
  return (
    <div className="group relative flex flex-col bg-brand-surface overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-900 transition-colors">
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-110 transition-transform duration-1000"
          />
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="bg-slate-950 dark:bg-brand-bg text-brand-gold text-[9px] font-bold px-3 py-1 shadow-xl uppercase tracking-[0.2em] border border-brand-gold/30">
            {product.brand} CLONE
          </span>
          {product.factories && (
            <span className="bg-brand-gold text-brand-bg text-[9px] font-bold px-3 py-1 shadow-xl uppercase tracking-[0.2em]">
              SUPER CLONE
            </span>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/60 dark:bg-brand-bg/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 backdrop-blur-[2px]">
          {/* View Details Button */}
          <button
            onClick={() => onViewDetails(product)}
            className="w-14 h-14 rounded-full bg-white dark:bg-brand-surface text-slate-900 dark:text-brand-bg flex items-center justify-center shadow-2xl hover:bg-brand-gold hover:text-brand-bg hover:scale-110 transition-all duration-300"
            title="Ver Detalhes"
          >
            <i className="fa-regular fa-eye text-xl"></i>
          </button>

          {/* Quick Add Button */}
          <button
            onClick={() => onQuickAdd(product)}
            className="w-14 h-14 rounded-full bg-brand-gold text-brand-bg flex items-center justify-center shadow-2xl hover:bg-white dark:hover:bg-brand-surface hover:text-slate-900 dark:hover:text-brand-bg hover:scale-110 transition-all duration-300"
            title="Adicionar à Sacola"
          >
            <i className="fa-solid fa-plus text-xl"></i>
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-[9px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">
          {product.brand}
        </p>
        <h3 className="text-base font-serif font-bold text-slate-900 leading-tight mb-4 min-h-[48px]">
          {product.name}
        </h3>
        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-brand-muted/30">
          <p className="text-[10px] text-slate-400 dark:text-slate-400 uppercase tracking-widest mb-1">
            Valor do Investimento
          </p>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">
              R$ {product.basePrice.toLocaleString("pt-BR")}
            </span>
            {product.movement && (
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                {product.movement}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
