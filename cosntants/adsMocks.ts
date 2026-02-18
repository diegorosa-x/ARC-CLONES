
import { AdsCampaign, AdCreative, AdsAlert, AdsSyncLog } from '../types/types';

export const MOCK_CAMPAIGNS: AdsCampaign[] = [
  {
    id: 'camp-1',
    name: 'Rolex Submariner - VSF Focus - BR',
    platform: 'Meta',
    status: 'Active',
    dailyBudget: 450,
    metrics: { spend: 312, revenue: 2800, roas: 8.97, cpa: 156, ctr: 2.4, cpm: 18.5, conversions: 2, clicks: 1240 },
    metrics7d: { spend: 2100, revenue: 14500, roas: 6.9, cpa: 175, ctr: 2.1, cpm: 17.2, conversions: 12, clicks: 8500 }
  },
  {
    id: 'camp-2',
    name: 'Daytona Panda - Google Search - High Intent',
    platform: 'Google',
    status: 'Active',
    dailyBudget: 800,
    metrics: { spend: 645, revenue: 0, roas: 0, cpa: 0, ctr: 12.5, cpm: 45.2, conversions: 0, clicks: 85 },
    metrics7d: { spend: 4500, revenue: 22000, roas: 4.8, cpa: 450, ctr: 11.2, cpm: 42.1, conversions: 10, clicks: 640 }
  },
  {
    id: 'camp-3',
    name: 'Retargeting - Abandoned Cart - Master',
    platform: 'Meta',
    status: 'Paused',
    dailyBudget: 150,
    metrics: { spend: 0, revenue: 0, roas: 0, cpa: 0, ctr: 0, cpm: 0, conversions: 0, clicks: 0 },
    metrics7d: { spend: 1050, revenue: 9800, roas: 9.3, cpa: 87.5, ctr: 4.5, cpm: 12.1, conversions: 12, clicks: 2100 }
  }
];

export const MOCK_CREATIVES: AdCreative[] = [
  { id: 'ad-1', name: 'Video Review VSF Submariner', campaignId: 'camp-1', thumbnail: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=200', ctr: 3.2, cpa: 142, spend: 1200 },
  { id: 'ad-2', name: 'Carousel Luxury Lifestyle', campaignId: 'camp-1', thumbnail: 'https://images.unsplash.com/photo-1587836374828-4dbaba94cf0e?w=200', ctr: 1.8, cpa: 185, spend: 900 },
];

export const MOCK_ALERTS: AdsAlert[] = [
  { id: 'alt-1', severity: 'high', message: 'CPA Crítico: Campanha Daytona excedeu R$ 400 por conversão.', campaignName: 'Daytona Panda' },
  { id: 'alt-2', severity: 'medium', message: 'Anúncio Reprovado no Meta Ads: "Video Review VSF" por política de marcas.', campaignName: 'Rolex Submariner' }
];

export const MOCK_LOGS: AdsSyncLog[] = [
  { id: 'l1', timestamp: '2024-05-20 14:30:05', agent: 'Ads', status: 'success', message: 'Métricas Meta Ads atualizadas com sucesso.' },
  { id: 'l2', timestamp: '2024-05-20 14:00:12', agent: 'Catalog', status: 'warning', message: 'Estoque da Fábrica CLEAN Submariner zerado. Agente pausou anúncios relacionados.' }
];
