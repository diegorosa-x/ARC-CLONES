
import React, { useState } from 'react';
import AdsOverview from './AdsOverview';
import CampaignsList from './CampaignsList';
import CreativesGrid from './CreativesGrid';


const AdsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'creatives' | 'config'>('overview');

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-brand-bg text-slate-900 dark:text-white">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-brand-muted p-6 flex flex-col space-y-2 shrink-0">
        <div className="mb-8 px-2">
          <h2 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em]">Ads Cockpit</h2>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">v2.4 Agent Connected</p>
        </div>

        <button 
          onClick={() => setActiveTab('overview')}
          className={`flex items-center space-x-3 px-4 py-3 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-brand-gold text-brand-bg shadow-lg' : 'hover:bg-brand-muted/20 text-slate-500'}`}
        >
          <i className="fa-solid fa-chart-line w-5"></i>
          <span>Overview</span>
        </button>

        <button 
          onClick={() => setActiveTab('campaigns')}
          className={`flex items-center space-x-3 px-4 py-3 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === 'campaigns' ? 'bg-brand-gold text-brand-bg shadow-lg' : 'hover:bg-brand-muted/20 text-slate-500'}`}
        >
          <i className="fa-solid fa-layer-group w-5"></i>
          <span>Campanhas</span>
        </button>

        <button 
          onClick={() => setActiveTab('creatives')}
          className={`flex items-center space-x-3 px-4 py-3 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === 'creatives' ? 'bg-brand-gold text-brand-bg shadow-lg' : 'hover:bg-brand-muted/20 text-slate-500'}`}
        >
          <i className="fa-solid fa-photo-film w-5"></i>
          <span>Criativos</span>
        </button>

        <div className="mt-auto border-t border-brand-muted pt-6 px-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Agente Stats</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <button 
            onClick={() => setActiveTab('config')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === 'config' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'hover:bg-brand-muted/20 text-slate-500'}`}
          >
            <i className="fa-solid fa-gears w-5"></i>
            <span>Configurações</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto hide-scrollbar">
        <header className="flex justify-between items-end mb-12 border-b border-brand-muted pb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold uppercase tracking-tight">
              {activeTab === 'overview' && 'Overview de Performance'}
              {activeTab === 'campaigns' && 'Gerenciamento de Campanhas'}
              {activeTab === 'creatives' && 'Hub de Criativos'}
              {activeTab === 'config' && 'Integrações & Logs'}
            </h1>
            <p className="text-[11px] text-slate-500 uppercase tracking-[0.3em] mt-2">
              Dados atualizados há 4 minutos • Sync Ativo
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-brand-muted/30 border border-brand-muted px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-bg transition-all">
              Exportar CSV
            </button>
            <button className="bg-brand-gold text-brand-bg px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl">
              Sync Agora
            </button>
          </div>
        </header>

        {activeTab === 'overview' && <AdsOverview />}
        {activeTab === 'campaigns' && <CampaignsList />}
        {activeTab === 'creatives' && <CreativesGrid />}
        {activeTab === 'config' && (
          <div className="text-center py-20 bg-brand-muted/10 border border-dashed border-brand-muted">
            <i className="fa-solid fa-plug-circle-check text-5xl text-brand-gold mb-6"></i>
            <h3 className="text-xl font-serif font-bold">API Gateway Meta & Google</h3>
            <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">Conexão via Agent V3.0 • Status: Conectado</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdsDashboard;
