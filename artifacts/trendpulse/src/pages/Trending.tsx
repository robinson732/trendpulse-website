import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { Activity, ChevronDown, Globe, Search, X } from "lucide-react";
import { SiX, SiInstagram, SiTiktok, SiSpotify, SiYoutube } from "react-icons/si";
import { TopNav } from "@/components/TopNav";
import { StatusBadge } from "@/components/StatusBadge";
import { Sparkline } from "@/components/Sparkline";
import { trends, COUNTRIES } from "@/data/trends";
import { useI18n } from "@/lib/i18n";

const PLATFORM_DEFS = [
  { id: "x", label: "X", icon: SiX },
  { id: "instagram", label: "Instagram", icon: SiInstagram },
  { id: "tiktok", label: "TikTok", icon: SiTiktok },
  { id: "spotify", label: "Spotify", icon: SiSpotify },
  { id: "youtube", label: "YouTube", icon: SiYoutube },
];

export default function Trending() {
  const { t } = useI18n();
  const PLATFORMS = [{ id: "all", label: t("trending.platform.all"), icon: null }, ...PLATFORM_DEFS];
  const [activePlatform, setActivePlatform] = useState("all");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [country, setCountry] = useState<typeof COUNTRIES[number]>(COUNTRIES[0]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!pickerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPickerOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickerOpen]);

  const filteredTrends = useMemo(() => {
    return trends.filter(t => {
      const platformOk = activePlatform === "all" || (t.platforms as readonly string[]).includes(activePlatform);
      const countryOk = country.code === "GLOBAL" || t.country === country.code || t.country === "GLOBAL";
      return platformOk && countryOk;
    });
  }, [activePlatform, country]);

  const filteredCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(c => t(`region.${c.code}`).toLowerCase().includes(q) || c.label.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [countryQuery, t]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden pt-24 pb-12">
      <div className="absolute inset-0 pointer-events-none noise opacity-20 z-50"></div>
      <TopNav />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,245,255,0.15)]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl tracking-tight">{t("trending.title")}</h1>
              <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                {t("trending.updated")} {time}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-card border border-border rounded-md font-mono text-xs hover:border-primary/50 transition-colors flex items-center gap-2" data-testid="filter-volume">
              {t("trending.filter.volume")} <ChevronDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => setPickerOpen(true)}
              className="px-3 py-1.5 bg-card border border-border rounded-md font-mono text-xs hover:border-primary/50 transition-colors flex items-center gap-2"
              data-testid="filter-country"
            >
              <span className="text-base leading-none">{country.flag}</span>
              <span>{country.code}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="px-3 py-1.5 bg-card border border-border rounded-md font-mono text-xs hover:border-primary/50 transition-colors flex items-center gap-2 text-primary border-primary/30" data-testid="filter-topics">
              {t("trending.filter.topics")} <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </header>

        <div className="flex overflow-x-auto pb-4 mb-4 gap-2 scrollbar-hide hide-scrollbar">
          {PLATFORMS.map(platform => {
            const Icon = platform.icon;
            const isActive = activePlatform === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setActivePlatform(platform.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs whitespace-nowrap transition-all ${
                  isActive 
                    ? "bg-primary/10 border-primary text-primary shadow-[0_0_10px_rgba(0,245,255,0.2)]" 
                    : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                } border`}
                data-testid={`filter-platform-${platform.id}`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                {platform.label}
              </button>
            );
          })}
        </div>

        {filteredTrends.length === 0 ? (
          <div className="border border-border bg-card/40 rounded-xl p-12 text-center" data-testid="empty-trends">
            <div className="font-display text-2xl mb-2">{t("trending.empty.title")} {t(`region.${country.code}`)}</div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{t("trending.empty.sub")}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrends.map((trend, index) => (
              <Link 
                key={trend.slug} 
                href={`/trend/${trend.slug}`}
                className="block group relative"
                data-testid={`card-trend-${trend.slug}`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <div className="bg-card border border-white/5 rounded-xl p-5 h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 flex flex-col relative overflow-hidden">
                  
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground mb-1">#{index + 1}</div>
                      <h3 className="font-display font-bold text-xl tracking-tight leading-tight">{trend.name}</h3>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{t("trending.card.trending")} · {t(`region.${trend.country}`)}</div>
                    </div>
                    <StatusBadge status={trend.status as any} />
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    {trend.platforms.map(p => {
                      const PIcon = PLATFORMS.find(pl => pl.id === p)?.icon;
                      return PIcon ? <PIcon key={p} className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" /> : null;
                    })}
                  </div>

                  <div className="mt-auto space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t("trending.card.volume")}</div>
                        <div className="font-mono font-bold text-xl">{trend.volume}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-mono text-xs ${trend.status === 'falling' ? 'text-destructive' : 'text-primary'}`}>
                          {trend.change}
                        </div>
                        <div className="h-8 w-24 opacity-80 group-hover:opacity-100 transition-opacity">
                          <Sparkline 
                            data={trend.sparkline} 
                            color={trend.status === 'falling' ? '#ff4466' : trend.status === 'exploding' ? '#ff00c8' : '#00f5ff'} 
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">
                        <span>{t("trending.card.sentiment")}</span>
                        <span>{t("trending.card.sentiment.legend")}</span>
                      </div>
                      <div className="flex h-1.5 rounded-full overflow-hidden bg-background">
                        <div style={{ width: `${trend.sentiment[0]}%` }} className="bg-[#00ff88]"></div>
                        <div style={{ width: `${trend.sentiment[1]}%` }} className="bg-[#ffaa00]"></div>
                        <div style={{ width: `${trend.sentiment[2]}%` }} className="bg-[#ff4466]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Country picker modal */}
      {pickerOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-background/70 backdrop-blur-sm animate-fade-up"
          onClick={() => setPickerOpen(false)}
          data-testid="country-picker-overlay"
        >
          <div
            className="w-full max-w-md bg-card border border-border rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <span className="font-display font-bold text-lg">{t("country.title")}</span>
              </div>
              <button
                onClick={() => setPickerOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                data-testid="country-picker-close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  autoFocus
                  value={countryQuery}
                  onChange={(e) => setCountryQuery(e.target.value)}
                  placeholder={t("country.search")}
                  className="w-full pl-10 pr-3 py-2.5 bg-background border border-border rounded-md font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
                  data-testid="input-country-search"
                />
              </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {filteredCountries.length === 0 ? (
                <div className="p-6 text-center font-mono text-xs text-muted-foreground uppercase tracking-widest">{t("country.nomatch")}</div>
              ) : (
                filteredCountries.map((c) => {
                  const isActive = c.code === country.code;
                  return (
                    <button
                      key={c.code}
                      onClick={() => { setCountry(c); setPickerOpen(false); setCountryQuery(""); }}
                      className={`w-full flex items-center justify-between px-5 py-3.5 text-left border-b border-border/40 hover:bg-primary/5 transition-colors ${isActive ? "bg-primary/5" : ""}`}
                      data-testid={`country-option-${c.code}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl leading-none">{c.flag}</span>
                        <span className={`font-display font-bold text-base ${isActive ? "text-primary" : "text-foreground"}`}>{t(`region.${c.code}`)}</span>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground tracking-widest">{c.code}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
