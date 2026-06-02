import { Activity, MousePointerClick, Eye, Clock, Globe } from "lucide-react";
import { TopNav } from "@/components/TopNav";
import { useI18n } from "@/lib/i18n";

export default function Brands() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden pt-24 pb-12">
      <div className="absolute inset-0 pointer-events-none noise opacity-20 z-50"></div>
      <TopNav />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-primary">
            <Activity className="w-5 h-5" />
          </div>
          <h1 className="font-display font-bold text-3xl tracking-tight">{t("brands.title")}</h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-card border border-white/5 rounded-xl p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] group-hover:bg-primary/20 transition-colors"></div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">{t("brands.cpm.label")}</div>
            <div className="font-display font-extrabold text-7xl md:text-8xl tracking-tighter text-foreground mb-4">
              <span className="text-primary">$</span>15.57
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              {t("brands.cpm.note")} · <span className="text-primary">{t("brands.cpm.status")}</span> · {t("brands.cpm.velocity")}
            </div>
          </div>

          <div className="bg-card border border-white/5 rounded-xl p-8 flex flex-col justify-center">
            <div className="w-10 h-10 rounded-lg bg-[#a855f7]/10 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5 text-[#a855f7]" />
            </div>
            <div className="font-display font-bold text-4xl mb-2">{t("brands.reach.value")}</div>
            <div className="font-mono text-sm text-muted-foreground mb-4">{t("brands.reach.label")}</div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-background border border-border rounded font-mono text-[9px] uppercase tracking-widest text-muted-foreground">US</span>
              <span className="px-2 py-1 bg-[#00f5ff]/10 border border-[#00f5ff]/30 rounded font-mono text-[9px] uppercase tracking-widest text-[#00f5ff]">{t("brands.reach.tag.trending")}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-card border border-white/5 rounded-xl p-6 hover:-translate-y-1 hover:border-primary/30 transition-all">
            <div className="w-8 h-8 rounded bg-[#00ff88]/10 flex items-center justify-center mb-4">
              <Activity className="w-4 h-4 text-[#00ff88]" />
            </div>
            <div className="font-display font-bold text-2xl mb-1">{t("brands.metric.engagement.value")}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#00ff88] mb-2">{t("brands.metric.engagement.label")}</div>
            <div className="text-xs text-muted-foreground">{t("brands.metric.engagement.sub")}</div>
          </div>

          <div className="bg-card border border-white/5 rounded-xl p-6 hover:-translate-y-1 hover:border-primary/30 transition-all">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center mb-4">
              <MousePointerClick className="w-4 h-4 text-primary" />
            </div>
            <div className="font-display font-bold text-2xl mb-1">{t("brands.metric.ctr.value")}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">{t("brands.metric.ctr.label")}</div>
            <div className="text-xs text-muted-foreground">{t("brands.metric.ctr.sub")}</div>
          </div>

          <div className="bg-card border border-white/5 rounded-xl p-6 hover:-translate-y-1 hover:border-primary/30 transition-all">
            <div className="w-8 h-8 rounded bg-[#a855f7]/10 flex items-center justify-center mb-4">
              <Eye className="w-4 h-4 text-[#a855f7]" />
            </div>
            <div className="font-display font-bold text-2xl mb-1">{t("brands.metric.impressions.value")}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7] mb-2">{t("brands.metric.impressions.label")}</div>
            <div className="text-xs text-muted-foreground">{t("brands.metric.impressions.sub")}</div>
          </div>

          <div className="bg-card border border-white/5 rounded-xl p-6 hover:-translate-y-1 hover:border-primary/30 transition-all">
            <div className="w-8 h-8 rounded bg-[#ffaa00]/10 flex items-center justify-center mb-4">
              <Clock className="w-4 h-4 text-[#ffaa00]" />
            </div>
            <div className="font-display font-bold text-2xl mb-1">{t("brands.metric.peak.value")}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#ffaa00] mb-2">{t("brands.metric.peak.label")}</div>
            <div className="text-xs text-muted-foreground">{t("brands.metric.peak.sub")}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-white/5 rounded-xl p-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">{t("brands.perf.title")}</h3>
            <div className="h-48 border-b border-l border-border relative flex items-end justify-between pt-4 pr-2 pb-2 pl-2">
              {[40, 60, 45, 80, 50, 90, 100].map((h, i) => (
                <div key={i} className="w-1/12 bg-primary/20 hover:bg-primary/50 transition-colors rounded-t" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-white/5 rounded-xl p-6 flex flex-col">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">{t("brands.boost.title")}</h3>
            <p className="text-sm text-muted-foreground mb-6">{t("brands.boost.body")}</p>
            <button className="mt-auto w-full py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest rounded hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,245,255,0.2)]" data-testid="btn-boost">
              {t("brands.boost.cta")}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
