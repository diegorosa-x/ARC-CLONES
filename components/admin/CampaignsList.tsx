
import { MOCK_CAMPAIGNS } from '@/cosntants/adsMocks';
import { AdsCampaign } from '@/types/types';
import React, { useState } from 'react';


const CampaignsList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<AdsCampaign[]>(MOCK_CAMPAIGNS);

  const adjustBudget = (id: string, multiplier: number) => {
    setCampaigns(prev => prev.map(c => 
      c.id === id ? { ...c, dailyBudget: Math.round(c.dailyBudget * multiplier) } : c
    ));
  };

  const toggleStatus = (id: string) => {
    setCampaigns(prev => prev.map(c => 
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c
    ));
  };

  return (
    <div className="overflow-x-auto bg-brand-surface border border-brand-muted">
      <table className="w-full text-left">
        <thead className="bg-brand-muted/10 border-b border-brand-muted">
          <tr>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Campanha</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Plataforma</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Budget Diário</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Gasto Hoje</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">ROAS (7d)</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-muted">
          {campaigns.map(camp => (
            <tr key={camp.id} className="hover:bg-brand-muted/5 transition-colors">
              <td className="px-6 py-4">
                <button 
                  onClick={() => toggleStatus(camp.id)}
                  className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${camp.status === 'Active' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-slate-500/10 border-slate-500/30 text-slate-500'}`}
                >
                  {camp.status}
                </button>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{camp.name}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                  <i className={`fa-brands fa-${camp.platform.toLowerCase()} text-brand-gold`}></i>
                  {camp.platform}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">R$ {camp.dailyBudget}</span>
                  <div className="flex gap-1">
                    <button onClick={() => adjustBudget(camp.id, 1.1)} className="p-1 text-[9px] bg-brand-muted/20 hover:bg-brand-gold hover:text-brand-bg rounded-sm transition-all">+10%</button>
                    <button onClick={() => adjustBudget(camp.id, 1.2)} className="p-1 text-[9px] bg-brand-muted/20 hover:bg-brand-gold hover:text-brand-bg rounded-sm transition-all">+20%</button>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-xs font-medium text-slate-500">R$ {camp.metrics.spend}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-xs font-bold text-brand-gold">{camp.metrics7d.roas}x</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-4 text-slate-400">
                  <button className="hover:text-brand-gold transition-colors"><i className="fa-solid fa-pen-to-square"></i></button>
                  <button className="hover:text-brand-gold transition-colors"><i className="fa-solid fa-chart-simple"></i></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignsList;
