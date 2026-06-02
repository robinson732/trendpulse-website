import { useParams, Link } from "wouter";
import { ArrowLeft, Activity, Search, ExternalLink } from "lucide-react";
import { SiX, SiInstagram, SiTiktok, SiSpotify, SiYoutube } from "react-icons/si";
import { TopNav } from "@/components/TopNav";
import { StatusBadge } from "@/components/StatusBadge";
import { trends } from "@/data/trends";
import { useI18n } from "@/lib/i18n";

export default function TrendDetail() {
  const { t } = useI18n();
  const { slug } = useParams();
  const trend = trends.find(tr => tr.slug === slug) || trends[0];

  const isFalling = trend.status === 'falling';
  const color = isFalling ? '#a855f7' : trend.status === 'exploding' ? '#ff00c8' : '#00f5ff';

  const width = 800;
  const height = 200;
  const min = Math.min(...trend.sparkline);
  const max = Math.max(...trend.sparkline);
  const range = max - min || 1;
  const points = trend.sparkline.map((d, i) => {
    const x = (i / (trend.sparkline.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");
  const polygonPoints = `${width},${height} 0,${height} ${points}`;

  const lowerName = trend.name.toLowerCase();
  const keywords = [
    `${lowerName} ${t("detail.keywords.suffix.trending")}`,
    `${lowerName} ${t("detail.keywords.suffix.why")}`,
    `${lowerName} ${t("detail.keywords.suffix.drama")}`,
    `${lowerName} ${t("detail.keywords.suffix.latest")}`,
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden pt-24 pb-12">
      <div className="absolute inset-0 pointer-events-none noise opacity-20 z-50"></div>
      <TopNav />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-8">
          <Link href="/trending" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs uppercase tracking-widest" data-testid="link-back">
            <ArrowLeft className="w-3 h-3" /> {t("detail.back")}
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border border-white/5 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-[80px] pointer-events-none" style={{ backgroundColor: color }}></div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 relative z-10">
                <div>
                  <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-2">{trend.name}</h1>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{t("detail.trending")} · {t(`region.${trend.country}`)}</span>
                    <StatusBadge status={trend.status as any} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-2xl font-bold ${isFalling ? 'text-destructive' : 'text-primary'}`}>
                    {trend.change}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t("detail.stat.volume")}</div>
                  <div className="font-mono text-xl font-bold">{trend.volume}</div>
                </div>
                <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t("detail.stat.change")}</div>
                  <div className={`font-mono text-xl font-bold ${isFalling ? 'text-destructive' : 'text-primary'}`}>{trend.change}</div>
                </div>
                <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t("detail.stat.rank")}</div>
                  <div className="font-mono text-xl font-bold">#1</div>
                </div>
                <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t("detail.stat.peak")}</div>
                  <div className="font-mono text-xl font-bold text-accent">{t("detail.stat.peak.value")}</div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">{t("detail.volume.title")}</h3>
                <div className="h-[200px] w-full relative">
                  <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polygon fill="url(#chartGradient)" points={polygonPoints} />
                    <polyline fill="none" stroke={color} strokeWidth="3" points={points} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">{t("detail.sentiment.title")}</h3>
                <div className="space-y-3">
                  <div className="flex h-3 rounded-full overflow-hidden bg-background">
                    <div style={{ width: `${trend.sentiment[0]}%` }} className="bg-[#00ff88]"></div>
                    <div style={{ width: `${trend.sentiment[1]}%` }} className="bg-[#ffaa00]"></div>
                    <div style={{ width: `${trend.sentiment[2]}%` }} className="bg-[#ff4466]"></div>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-[#00ff88]">{t("detail.sentiment.positive")} {trend.sentiment[0]}%</span>
                    <span className="text-[#ffaa00]">{t("detail.sentiment.neutral")} {trend.sentiment[1]}%</span>
                    <span className="text-[#ff4466]">{t("detail.sentiment.negative")} {trend.sentiment[2]}%</span>
                  </div>
                </div>
              </div>

              <Link href={`/chat?topic=${trend.slug}`} className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest rounded hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,245,255,0.2)]" data-testid="btn-view-feed">
                <Activity className="w-5 h-5" /> {t("detail.viewfeed")}
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-white/5 rounded-xl p-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">{t("detail.platforms.title")}</h3>
              <div className="grid grid-cols-2 gap-3">
                {trend.platforms.map(p => {
                  const icons: Record<string, any> = { x: SiX, instagram: SiInstagram, tiktok: SiTiktok, spotify: SiSpotify, youtube: SiYoutube };
                  const names: Record<string, string> = { x: 'X/Twitter', instagram: 'Instagram', tiktok: 'TikTok', spotify: 'Spotify', youtube: 'YouTube' };
                  const Icon = icons[p] || Activity;
                  return (
                    <div key={p} className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg hover:border-primary/30 transition-colors cursor-pointer group">
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-mono text-xs">{names[p]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-card border border-white/5 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{t("detail.keywords.title")}</h3>
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map(kw => (
                  <div key={kw} className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-full font-mono text-[10px] text-muted-foreground hover:text-foreground hover:border-primary/30 cursor-pointer transition-colors">
                    <Search className="w-3 h-3" />
                    {kw}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-white/5 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ff88] to-primary"></div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">{t("detail.chat.title")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("detail.chat.sub")}</p>
              <div className="space-y-3 mb-6">
                {[1,2,3].map(i => (
                  <div key={i} className="flex gap-2 opacity-50">
                    <div className="w-1 h-1 mt-1.5 rounded-full bg-primary/50"></div>
                    <div className="h-2 bg-border/50 rounded w-full mt-1"></div>
                  </div>
                ))}
              </div>
              <Link href={`/chat?topic=${trend.slug}`} className="flex items-center justify-between w-full p-3 bg-background border border-border hover:border-primary text-xs font-mono uppercase tracking-widest transition-colors rounded">
                {t("detail.chat.cta")} <ExternalLink className="w-3 h-3 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
