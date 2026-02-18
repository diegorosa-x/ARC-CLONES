import { MOCK_CREATIVES } from "@/cosntants/adsMocks";
import Image from "next/image";
import React from "react";

const CreativesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {MOCK_CREATIVES.map((ad) => (
        <div
          key={ad.id}
          className="bg-brand-surface border border-brand-muted overflow-hidden group"
        >
          <div className="relative aspect-video bg-slate-900">
            <Image
              src={ad.thumbnail}
              alt={ad.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
            />{" "}
            <div className="absolute top-2 right-2 flex gap-2">
              <span className="bg-brand-gold text-brand-bg text-[8px] font-bold px-2 py-1 uppercase tracking-widest">
                Active
              </span>
            </div>
          </div>
          <div className="p-5">
            <h5 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 truncate">
              {ad.name}
            </h5>
            <div className="grid grid-cols-2 gap-4 border-t border-brand-muted pt-4">
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">
                  CTR
                </p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {ad.ctr}%
                </p>
              </div>
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">
                  CPA
                </p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  R$ {ad.cpa}
                </p>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-brand-muted/20 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-bg transition-all">
              Ver Detalhes
            </button>
          </div>
        </div>
      ))}

      {/* Placeholder for new creative */}
      <div className="border border-dashed border-brand-muted flex flex-col items-center justify-center p-10 opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
        <i className="fa-solid fa-circle-plus text-3xl text-brand-gold mb-4"></i>
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Novo Criativo
        </span>
      </div>
    </div>
  );
};

export default CreativesGrid;
