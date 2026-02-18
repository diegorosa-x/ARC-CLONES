import { MOCK_ALERTS, MOCK_CAMPAIGNS } from "@/cosntants/adsMocks";
import React from "react";

type MetricCardProps = {
  label: string;
  value: string | number;
  trend?: string;
  suffix?: string;
};

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  suffix = "",
}) => (
  <div className="bg-brand-surface border border-brand-muted p-6 shadow-sm">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
      {label}
    </p>
    <div className="flex items-end justify-between">
      <h3 className="text-3xl font-brand font-bold text-slate-900 dark:text-white">
        {suffix}
        {value}
      </h3>
      {trend ? (
        <span
          className={`text-[10px] font-bold ${
            trend.startsWith("+") ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend}{" "}
          <i
            className={`fa-solid fa-arrow-trend-${trend.startsWith("+") ? "up" : "down"}`}
          ></i>
        </span>
      ) : null}
    </div>
  </div>
);

const AdsOverview: React.FC = () => {
  // Simple summary calculations from mocks
  const totalSpend = MOCK_CAMPAIGNS.reduce(
    (acc, c) => acc + c.metrics.spend,
    0,
  );
  const totalConversions = MOCK_CAMPAIGNS.reduce(
    (acc, c) => acc + c.metrics.conversions,
    0,
  );
  const totalRevenue = MOCK_CAMPAIGNS.reduce(
    (acc, c) => acc + c.metrics.revenue,
    0,
  );
  const avgRoas = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : "0";

  return (
    <div className="space-y-12">
      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Gasto Hoje"
          value={totalSpend.toLocaleString("pt-BR")}
          suffix="R$ "
          trend="+12%"
        />
        <MetricCard label="Conversões" value={totalConversions} trend="+5%" />
        <MetricCard
          label="Receita Estimada"
          value={totalRevenue.toLocaleString("pt-BR")}
          suffix="R$ "
          trend="+8%"
        />
        <MetricCard
          label="ROAS Global"
          value={avgRoas}
          suffix="x"
          trend="-2%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Alerts Section */}
        <div className="lg:col-span-2 space-y-6">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation"></i> Alertas do
            Agente
          </h4>
          <div className="space-y-4">
            {MOCK_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className={`p-5 border flex items-start gap-4 ${alert.severity === "high" ? "bg-red-500/5 border-red-500/20" : "bg-yellow-500/5 border-yellow-500/20"}`}
              >
                <i
                  className={`fa-solid fa-circle-exclamation mt-1 ${alert.severity === "high" ? "text-red-500" : "text-yellow-500"}`}
                ></i>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {alert.message}
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 mt-1">
                    Campanha: {alert.campaignName}
                  </p>
                </div>
                <button className="ml-auto text-[9px] font-bold uppercase tracking-widest text-brand-gold hover:underline">
                  Resolver
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Performance List */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">
            Top Plataformas
          </h4>
          <div className="bg-brand-surface border border-brand-muted overflow-hidden">
            <div className="p-4 border-b border-brand-muted flex justify-between items-center bg-brand-muted/10">
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Plataforma
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                ROAS
              </span>
            </div>
            {["Meta Ads", "Google Ads"].map((p, i) => (
              <div
                key={p}
                className="p-4 flex justify-between items-center border-b border-brand-muted last:border-0"
              >
                <div className="flex items-center gap-3">
                  <i
                    className={`fa-brands fa-${p.toLowerCase().split(" ")[0]} text-brand-gold`}
                  ></i>
                  <span className="text-xs font-medium">{p}</span>
                </div>
                <span
                  className={`text-xs font-bold ${i === 0 ? "text-green-500" : "text-slate-900 dark:text-white"}`}
                >
                  {i === 0 ? "8.4x" : "4.2x"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsOverview;
