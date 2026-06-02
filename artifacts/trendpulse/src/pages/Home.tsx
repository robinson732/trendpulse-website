import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "wouter";
import { useI18n, type Lang } from "@/lib/i18n";
import logoUrl from "@assets/grok_image_1772600704959_1779000519375.jpg";
import heroVideo from "@assets/grok_video_2026-05-22-04-18-47_1780040733852.mp4";
import shot1 from "@assets/Screenshot_20260528_234413_Expo_Go_1780002302979.jpg";
import shot2 from "@assets/Screenshot_20260528_235132_Expo_Go_1780002303048.jpg";
import shot3 from "@assets/Screenshot_20260528_231346_Expo_Go_1780002303008.jpg";
import shot4 from "@assets/Screenshot_20260528_231337_Expo_Go_1780002303015.jpg";
import shot5 from "@assets/Screenshot_20260528_234539_Expo_Go_1780002303030.jpg";
import shot6 from "@assets/Screenshot_20260528_234543_Expo_Go_1780002303043.jpg";
import studioShot from "@assets/Screenshot_20260522_212103_Expo_Go_1780077994646.jpg";
import tour1 from "@assets/Screenshot_20260517_135750_Expo_Go_1780162215763.jpg";
import tour2 from "@assets/Screenshot_20260517_135836_Expo_Go_1780162215769.jpg";
import tour3 from "@assets/Screenshot_20260517_135820_Expo_Go_1780162215773.jpg";
import tour4 from "@assets/Screenshot_20260517_135741_Expo_Go_1780162215778.jpg";
import tour5 from "@assets/Screenshot_20260517_135909_Expo_Go_1780162215783.jpg";
import tour6 from "@assets/Screenshot_20260520_012440_Expo_Go_1780162215789.jpg";
import tour7 from "@assets/Screenshot_20260520_012506_Expo_Go_1780162215794.jpg";
import tour8 from "@assets/Screenshot_20260520_021720_Expo_Go_1780162215799.jpg";
import tour9 from "@assets/brand_campaign_50pct_fixed_1780165336368.png";
import tour10 from "@assets/AISelect_20260520_023904_Expo_Go_1780162215808.jpg";
import tour11 from "@assets/Screenshot_20260521_195139_Expo_Go_1780162215812.jpg";
import tour12 from "@assets/Screenshot_20260520_003750_Expo_Go_1780162215816.jpg";
import pickA from "@assets/Screenshot_20260530_204334_Expo_Go_1780163493579.jpg";
import pickB from "@assets/Screenshot_20260530_204340_Expo_Go_1780163493590.jpg";
import pickC from "@assets/Screenshot_20260530_204352_Expo_Go_1780163493602.jpg";
import pickD from "@assets/Screenshot_20260530_204413_Expo_Go_1780163493614.jpg";
import pickE from "@assets/Screenshot_20260530_204419_Expo_Go_1780163493626.jpg";
import locIL from "@assets/Screenshot_20260530_204453_Expo_Go_1780163493638.jpg";
import locIL2 from "@assets/Screenshot_20260530_204503_Expo_Go_1780163493650.jpg";
import locRU from "@assets/Screenshot_20260530_204525_Expo_Go_1780163493663.jpg";
import locRU2 from "@assets/Screenshot_20260530_204531_Expo_Go_1780163493680.jpg";
import locSA from "@assets/Screenshot_20260530_204618_Expo_Go_1780163493694.jpg";
import locKR from "@assets/Screenshot_20260530_204656_Expo_Go_1780163493710.jpg";
import locBR from "@assets/Screenshot_20260530_204726_Expo_Go_1780163493725.jpg";
import locJP from "@assets/Screenshot_20260530_204843_Expo_Go_1780163493739.jpg";
import locSent from "@assets/Screenshot_20260530_204849_Expo_Go_1780163493753.jpg";
import locDet from "@assets/Screenshot_20260530_204900_Expo_Go_1780163493765.jpg";
import locDet2 from "@assets/Screenshot_20260530_204913_Expo_Go_1780163493779.jpg";
import trendingShot from "@assets/Opera_Snapshot_2026-05-30_215137_e57e0167-d738-4099-bed8-5025e_1780167275384.png";
import mark1 from "@assets/tplogo7_1780167275401.jpg";
import mark2 from "@assets/tplogo6_1780167275401.jpg";
import mark3 from "@assets/logotp4_1780167275401.jpg";
import mark4 from "@assets/tplogo_3_1780167275401.jpg";
import mark5 from "@assets/tplogo2_1780167275401.jpg";
const INACTION_SHOTS = [shot1, shot2, shot3, shot4, shot5, shot6];
const TOUR_SHOTS = [tour1, tour2, tour3, tour4, tour5, tour6, tour7, tour8, tour9, tour10, tour11, tour12];
const GLOBAL_W1 = [pickA, pickB, pickC, pickD, pickE];
const GLOBAL_W2 = [locIL, locRU, locSA, locKR, locBR, locJP];
const GLOBAL_W3 = [locIL2, locRU2, locSent, locDet, locDet2];
const FEAT_ALL = [shot1, tour4, tour7, tour1];
const FEAT_CREATORS = [locJP, locDet, shot4, tour5];
const FEAT_BRANDS = [tour3, tour2, shot3, tour8, tour9];
const FEAT_CURIOUS = [locDet2, locSent];
const LOCALES: [string, string][] = [
  ["🇺🇸", "US"], ["🇬🇧", "GB"], ["🇫🇷", "FR"], ["🇩🇪", "DE"], ["🇪🇸", "ES"], ["🇮🇹", "IT"], ["🇳🇱", "NL"],
  ["🇵🇹", "PT"], ["🇧🇪", "BE"], ["🇸🇪", "SE"], ["🇧🇷", "BR"], ["🇨🇦", "CA"], ["🇲🇽", "MX"], ["🇦🇷", "AR"],
  ["🇦🇺", "AU"], ["🇯🇵", "JP"], ["🇰🇷", "KR"], ["🇮🇳", "IN"], ["🇮🇩", "ID"], ["🇵🇭", "PH"], ["🇹🇷", "TR"],
  ["🇷🇺", "RU"], ["🇸🇦", "SA"], ["🇦🇪", "AE"], ["🇪🇬", "EG"], ["🇿🇦", "ZA"], ["🇳🇬", "NG"], ["🇵🇱", "PL"], ["🇮🇱", "IL"],
];

type PanelKey = "concept" | "algorithm" | null;

const ICONS: Record<string, string> = {
  bolt: "⚡",
  chart: "📈",
  bulb: "💡",
  shield: "🛡️",
  money: "💸",
  list: "📋",
  crystal: "🔮",
  rocket: "🚀",
  handshake: "🤝",
  chat: "💬",
  question: "❓",
};

type TrendStatus = "exploding" | "rising" | "stable" | "falling";

const STATUS_META: Record<TrendStatus, { badge: string; banner: string; spark: string }> = {
  exploding: {
    badge: "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-[0_0_18px_rgba(255,42,109,0.5)]",
    banner: "from-pink-600/40 via-rose-500/20 to-violet-600/30",
    spark: "#FF2A6D",
  },
  rising: {
    badge: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[0_0_18px_rgba(161,71,255,0.5)]",
    banner: "from-violet-600/40 via-fuchsia-500/20 to-cyan-500/20",
    spark: "#A147FF",
  },
  stable: {
    badge: "bg-amber-400/15 text-amber-300 border border-amber-300/40",
    banner: "from-amber-500/25 via-zinc-700/20 to-zinc-800/20",
    spark: "#F5B301",
  },
  falling: {
    badge: "bg-orange-500/15 text-orange-300 border border-orange-400/40",
    banner: "from-orange-600/30 via-rose-700/20 to-zinc-800/20",
    spark: "#FF5722",
  },
};

const CHANNELS: Record<string, { label: string; name: string; cls: string }> = {
  x: { label: "X", name: "X", cls: "bg-white/10 text-white" },
  ig: { label: "IG", name: "Instagram", cls: "bg-pink-500/20 text-pink-300" },
  tt: { label: "TT", name: "TikTok", cls: "bg-cyan-400/15 text-cyan-200" },
  reddit: { label: "Re", name: "Reddit", cls: "bg-orange-500/20 text-orange-300" },
  twitch: { label: "Tw", name: "Twitch", cls: "bg-violet-500/20 text-violet-300" },
  spotify: { label: "Sp", name: "Spotify", cls: "bg-green-500/20 text-green-300" },
  yt: { label: "YT", name: "YouTube", cls: "bg-red-500/20 text-red-300" },
  music: { label: "♪", name: "Apple Music", cls: "bg-pink-400/15 text-pink-200" },
};

type Trend = {
  rank: number;
  name: string;
  country: string;
  status: TrendStatus;
  mentions: string;
  change: string;
  up: boolean;
  sentiment: [number, number, number];
  spark: number[];
  channels: string[];
};

const TRENDS: Trend[] = [
  { rank: 3, name: "Knicks", country: "FR", status: "exploding", mentions: "758K", change: "+222%", up: true, sentiment: [71, 16, 13], spark: [10, 14, 12, 20, 26, 24, 34, 40, 52, 60], channels: ["x", "ig", "tt", "twitch", "spotify", "yt", "music"] },
  { rank: 1, name: "Chelsea", country: "US", status: "exploding", mentions: "1.9M", change: "+109%", up: true, sentiment: [65, 18, 17], spark: [30, 20, 40, 28, 46, 38, 55, 48, 62, 70], channels: ["x", "ig", "spotify"] },
  { rank: 4, name: "Save America", country: "US", status: "exploding", mentions: "1.3M", change: "+426%", up: true, sentiment: [80, 14, 6], spark: [8, 12, 10, 18, 30, 28, 44, 55, 70, 85], channels: ["x", "spotify"] },
  { rank: 4, name: "Imerica Act", country: "US", status: "exploding", mentions: "1.2M", change: "+246%", up: true, sentiment: [72, 16, 12], spark: [20, 30, 18, 40, 32, 52, 44, 60, 55, 72], channels: ["x"] },
  { rank: 3, name: "Brighton", country: "US", status: "rising", mentions: "1.3M", change: "+25%", up: true, sentiment: [25, 55, 20], spark: [30, 38, 32, 44, 40, 50, 46, 56, 52, 60], channels: ["x", "ig", "music", "spotify"] },
  { rank: 3, name: "Virginia", country: "US", status: "stable", mentions: "1.3M", change: "+10%", up: true, sentiment: [60, 20, 20], spark: [40, 42, 38, 44, 41, 43, 40, 45, 42, 44], channels: ["x", "ig", "music"] },
  { rank: 4, name: "Gabriel", country: "US", status: "stable", mentions: "1.5M", change: "-7%", up: false, sentiment: [60, 19, 21], spark: [50, 46, 52, 44, 48, 42, 46, 40, 44, 38], channels: ["x", "ig", "music"] },
  { rank: 2, name: "Paxton", country: "US", status: "falling", mentions: "1.5M", change: "-23%", up: false, sentiment: [79, 13, 8], spark: [70, 64, 58, 60, 50, 46, 40, 38, 30, 26], channels: ["x"] },
];

function Spark({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / range) * 26 - 2}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-9" aria-hidden>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrendCard({ trend }: { trend: Trend }) {
  const { t } = useI18n();
  const m = STATUS_META[trend.status];
  const [pos, neu, neg] = trend.sentiment;
  return (
    <article className="group relative rounded-[28px] bg-[#121C2C] border border-white/10 overflow-hidden hover:border-white/25 transition shadow-xl" data-testid={`trend-card-${trend.name.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className={`h-20 bg-gradient-to-br ${m.banner} relative`}>
        <span className="absolute top-3 left-4 font-display text-2xl font-bold text-white/40">#{trend.rank}</span>
        <span className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${m.badge}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>{t(`home.tracker.status.${trend.status}`)}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl font-bold text-white leading-tight">{trend.name}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-xs font-mono uppercase tracking-widest text-white/40">{t("home.tracker.trending")} · {trend.country}</p>
          <div className="flex gap-1">
            {trend.channels.map((c) => (
              <span key={c} title={CHANNELS[c]?.name ?? c} aria-label={CHANNELS[c]?.name ?? c} className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-md text-[9px] font-bold ${CHANNELS[c]?.cls ?? "bg-white/10 text-white"}`}>{CHANNELS[c]?.label ?? "?"}</span>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between gap-3 mt-4">
          <div>
            <div className="font-display text-3xl font-bold text-white tabular-nums leading-none">{trend.mentions}</div>
            <div className="mt-1 text-sm font-semibold">
              <span className={trend.up ? "text-green-400" : "text-red-400"}>{trend.change}</span>
              <span className="text-white/40 font-normal ml-1">24h</span>
            </div>
          </div>
          <div className="w-24 shrink-0"><Spark data={trend.spark} color={m.spark} /></div>
        </div>
        <div className="mt-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1.5">{t("home.tracker.sentiment")}</div>
          <div className="flex h-1.5 rounded-full overflow-hidden bg-white/5">
            <span className="bg-green-500" style={{ width: `${pos}%` }}></span>
            <span className="bg-amber-400" style={{ width: `${neu}%` }}></span>
            <span className="bg-rose-500" style={{ width: `${neg}%` }}></span>
          </div>
          <div className="flex justify-between mt-1 text-[10px] font-mono tabular-nums">
            <span className="text-green-400">{pos}%</span>
            <span className="text-amber-300">{neu}%</span>
            <span className="text-rose-400">{neg}%</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function CountUp({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 1800;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start * 10) / 10);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref} className="font-display text-3xl md:text-4xl font-bold text-white tabular-nums">{count}{suffix}</div>;
}

function LandingNav({ panel, onPanel }: { panel: PanelKey; onPanel: (p: PanelKey) => void }) {
  const { t, lang, setLang } = useI18n();
  const langs: Lang[] = ["fr", "en"];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between gap-4">
        <Link href="/" aria-label="TrendPulse — home" className="flex items-center gap-3" data-testid="link-home-logo">
          <div className="relative w-10 h-10 rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
            <img src={logoUrl} alt="" className="w-full h-full object-cover scale-[1.35]" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-pink-300">TrendPulse</span>
        </Link>

        <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-white/80">
          <button type="button" onClick={() => onPanel(panel === "concept" ? null : "concept")} aria-pressed={panel === "concept"} className={`whitespace-nowrap transition ${panel === "concept" ? "text-pink-300" : "hover:text-pink-300"}`} data-testid="link-nav-concept">{t("home.nav.concept")}</button>
          <button type="button" onClick={() => onPanel(panel === "algorithm" ? null : "algorithm")} aria-pressed={panel === "algorithm"} className={`whitespace-nowrap transition ${panel === "algorithm" ? "text-pink-300" : "hover:text-pink-300"}`} data-testid="link-nav-algo">{t("home.nav.algo")}</button>
          <a href="#live-tracker" className="whitespace-nowrap hover:text-pink-300 transition" data-testid="link-nav-live">{t("home.nav.live")}</a>
          <a href="#features" className="whitespace-nowrap hover:text-pink-300 transition" data-testid="link-nav-features">{t("home.nav.features")}</a>
          <a href="#in-action" className="whitespace-nowrap hover:text-pink-300 transition" data-testid="link-nav-inaction">{t("home.nav.inaction")}</a>
          <a href="#tour" className="whitespace-nowrap hover:text-pink-300 transition" data-testid="link-nav-tour">{t("home.nav.tour")}</a>
          <a href="#global" className="whitespace-nowrap hover:text-pink-300 transition" data-testid="link-nav-global">{t("home.nav.global")}</a>
          <a href="#studio" className="whitespace-nowrap hover:text-pink-300 transition" data-testid="link-nav-studio">{t("home.nav.studio")}</a>
          <a href="#value" className="whitespace-nowrap hover:text-pink-300 transition" data-testid="link-nav-why">{t("home.nav.why")}</a>
          <a href="#testimonials" className="whitespace-nowrap hover:text-pink-300 transition" data-testid="link-nav-testimonials">{t("home.nav.testimonials")}</a>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div role="group" aria-label="Language" className="flex items-center border border-white/20 rounded-full overflow-hidden text-[11px] font-mono uppercase tracking-widest shrink-0">
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 transition ${lang === l ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
                aria-pressed={lang === l}
                aria-label={l === "fr" ? "Passer en français" : "Switch to English"}
                data-testid={`btn-lang-${l}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="hidden md:inline-flex whitespace-nowrap px-4 py-2 rounded-full border border-white/25 text-sm font-medium text-white hover:bg-white/10 transition" data-testid="btn-nav-signin">
            {t("home.nav.signin")}
          </button>
          <a href="#download" className="whitespace-nowrap px-4 md:px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:scale-[1.03] transition" data-testid="btn-nav-download">
            {t("home.nav.download")}
          </a>
        </div>
      </div>
    </nav>
  );
}

function AutoSlideWindow({
  shots,
  slides,
  title,
  accent,
  startAt = 0,
  interval = 3400,
}: {
  shots: string[];
  slides: string[];
  title: string;
  accent: "cyan" | "pink" | "violet";
  startAt?: number;
  interval?: number;
}) {
  const [idx, setIdx] = useState(startAt % Math.max(shots.length, 1));

  useEffect(() => {
    if (shots.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % shots.length), interval);
    return () => window.clearInterval(id);
  }, [shots.length, interval]);

  const tint = {
    cyan: { ring: "border-cyan-500/40", glow: "shadow-[0_0_50px_rgba(34,211,238,0.28)]", text: "text-cyan-300", dot: "bg-cyan-400" },
    pink: { ring: "border-pink-500/40", glow: "shadow-[0_0_50px_rgba(236,72,153,0.28)]", text: "text-pink-300", dot: "bg-pink-400" },
    violet: { ring: "border-violet-500/40", glow: "shadow-[0_0_50px_rgba(139,92,246,0.28)]", text: "text-violet-300", dot: "bg-violet-400" },
  }[accent];

  const [flag, label] = (slides[idx] ?? "🌍|").split("|");

  return (
    <div className="flex flex-col items-center" data-testid={`global-window-${accent}`}>
      <p className={`mb-4 font-mono text-[11px] uppercase tracking-widest ${tint.text}`}>{title}</p>
      <div className={`relative w-full max-w-[300px] rounded-[40px] p-3 bg-black/40 backdrop-blur-xl border-2 ${tint.ring} ${tint.glow}`}>
        <div className="relative aspect-[9/19.5] rounded-[30px] overflow-hidden bg-black">
          {shots.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={(slides[i] ?? "").split("|")[1] ?? title}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[9px] font-mono uppercase tracking-widest text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>LIVE
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/65 backdrop-blur-md border border-white/10">
            <span className="text-lg leading-none" aria-hidden>{flag}</span>
            <span className="text-sm font-medium text-white/90 truncate" data-testid={`global-caption-${accent}`}>{label}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label={title}>
        {shots.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === idx}
            aria-label={`${title} — ${(slides[i] ?? "").split("|")[1] ?? String(i + 1)}`}
            onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all ${i === idx ? `w-6 ${tint.dot}` : "w-2 bg-white/25 hover:bg-white/40"}`}
            data-testid={`global-dot-${accent}-${i}`}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureShot({
  shot,
  text,
  icon,
  accent,
  testid,
}: {
  shot: string;
  text: string;
  icon?: string;
  accent: "pink" | "cyan" | "amber";
  testid: string;
}) {
  const tint = {
    pink: { ring: "border-pink-500/30", glow: "group-hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]", text: "text-pink-300" },
    cyan: { ring: "border-cyan-500/30", glow: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]", text: "text-cyan-300" },
    amber: { ring: "border-amber-500/30", glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]", text: "text-amber-300" },
  }[accent];
  return (
    <figure className="group" data-testid={testid}>
      <div className={`relative rounded-2xl overflow-hidden border ${tint.ring} bg-zinc-950 shadow-lg transition-all duration-300 group-hover:-translate-y-1 ${tint.glow}`}>
        <div className="relative aspect-[9/16] overflow-hidden bg-black">
          <img src={shot} alt={text} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
          <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[8px] font-mono uppercase tracking-widest text-white/90">
            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></span>LIVE
          </div>
        </div>
      </div>
      <figcaption className="mt-3 flex items-start gap-2 text-sm text-white/85 leading-snug">
        {icon && <span className={`${tint.text} shrink-0`} aria-hidden>{ICONS[icon] ?? "•"}</span>}
        <span>{text}</span>
      </figcaption>
    </figure>
  );
}

function LogoMark({ src, className }: { src: string; className?: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      loading="lazy"
      className={`pointer-events-none select-none absolute z-0 opacity-[0.10] mix-blend-screen ${className ?? ""}`}
    />
  );
}

export default function Home() {
  const { t, tList, lang } = useI18n();
  const [panel, setPanel] = useState<PanelKey>(null);

  const algoBullets = useMemo(() => tList("home.algo.bullets").map(s => {
    const [title, desc] = s.split("|");
    return { title, desc };
  }), [tList]);

  const featureBlock = (key: string) => tList(key).map(s => {
    const [icon, text] = s.split("|");
    return { icon, text };
  });

  const creatorsItems = useMemo(() => featureBlock("home.features.creators.items"), [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  const brandsItems = useMemo(() => featureBlock("home.features.brands.items"), [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  const curiousItems = useMemo(() => featureBlock("home.features.curious.items"), [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  const allItems = useMemo(() => tList("home.features.all.items"), [tList]);
  const valueBullets = useMemo(() => tList("home.value.bullets"), [tList]);

  // Live pulse score for the hero card
  const [score, setScore] = useState(94.2);
  useEffect(() => {
    const id = setInterval(() => {
      setScore(p => Number((p + (Math.random() * 0.6 - 0.3)).toFixed(1)));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!panel) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPanel(null); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [panel]);

  const [trackerCountry, setTrackerCountry] = useState<"all" | "US" | "FR">("all");
  const trackerCountries: ("all" | "US" | "FR")[] = ["all", "US", "FR"];
  const filteredTrends = useMemo(
    () => TRENDS.filter((tr) => trackerCountry === "all" || tr.country === trackerCountry),
    [trackerCountry]
  );

  const pulseBg = { background: "linear-gradient(135deg, #6b46c1 0%, #ec4899 100%)" };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden">
      <LandingNav panel={panel} onPanel={setPanel} />

      {panel && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/80 backdrop-blur-md px-4 py-24 sm:px-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={panel === "concept" ? "panel-concept-title" : "panel-algo-title"}
          onClick={() => setPanel(null)}
          data-testid="panel-overlay"
        >
          <div className="relative w-full max-w-screen-xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPanel(null)}
              aria-label={t("home.panel.close")}
              data-testid="btn-panel-close"
              className="absolute right-0 -top-12 sm:-top-3 sm:right-3 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-2xl leading-none transition"
            >
              ×
            </button>

            {panel === "concept" && (
              <div className="rounded-[32px] bg-zinc-900 border border-white/10 p-8 md:p-14 shadow-2xl" data-testid="panel-concept">
                <div className="max-w-3xl mx-auto">
                  <h2 id="panel-concept-title" className="font-display text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight" data-testid="text-concept-title">{t("home.concept.title")}</h2>
                  <div className="space-y-6 text-lg md:text-xl leading-relaxed text-white/80">
                    <p data-testid="text-concept-p1">{t("home.concept.p1")}</p>
                    <p data-testid="text-concept-p2">{t("home.concept.p2")}</p>
                  </div>
                </div>
              </div>
            )}

            {panel === "algorithm" && (
              <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-zinc-950 via-violet-950/40 to-zinc-950 p-8 md:p-14 shadow-2xl" data-testid="panel-algorithm">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 id="panel-algo-title" className="font-display text-4xl md:text-5xl font-bold mb-8 tracking-tight" data-testid="text-algo-title">{t("home.algo.title")}</h2>
                    <ul className="space-y-5">
                      {algoBullets.map((b, i) => (
                        <li key={b.title} className="flex gap-4 text-lg text-white/80" data-testid={`algo-bullet-${i}`}>
                          <span className="text-pink-400 font-bold mt-1">•</span>
                          <span><strong className="text-white">{b.title}</strong> — {b.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl bg-gradient-to-br from-violet-900/60 to-pink-900/40 border border-white/10 p-10 relative overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-500/40 blur-[80px] rounded-full"></div>
                    <div className="relative">
                      <div className="text-6xl mb-6" aria-hidden>💗</div>
                      <p className="font-display text-2xl md:text-3xl font-bold leading-tight mb-3" data-testid="text-heart-card-title">{t("home.algo.card.title")}</p>
                      <p className="text-white/70 leading-relaxed" data-testid="text-heart-card-body">{t("home.algo.card.body")}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden" style={pulseBg}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-500/30 blur-[120px]"></div>
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-400/20 blur-[120px]"></div>
        </div>

        <div className="relative max-w-screen-2xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white text-sm font-medium px-5 py-2 rounded-full" data-testid="badge-hero-live">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span className="font-mono uppercase tracking-widest text-xs">{t("home.hero.live")}</span>
            </div>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight" data-testid="text-hero-title">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-100 to-cyan-200">TrendPulse</span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/95 max-w-xl leading-snug" data-testid="text-hero-tagline1">
              {t("home.hero.tagline1")}
            </p>
            <p className="text-lg md:text-xl text-white/75 max-w-md" data-testid="text-hero-tagline2">
              {t("home.hero.tagline2")}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href="#download" className="px-8 py-4 rounded-2xl bg-white text-black text-lg font-semibold hover:scale-[1.03] transition shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center gap-3" data-testid="btn-hero-download">
                {t("home.hero.download")}
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-white/90 pt-2">
              <div className="flex items-center gap-2" data-testid="text-hero-pulses">
                <span aria-hidden>❤️</span> {t("home.hero.pulses")}
              </div>
              <div className="flex -space-x-3" aria-hidden>
                <div className="w-9 h-9 rounded-2xl border-2 border-white bg-yellow-400 flex items-center justify-center text-base">🇺🇸</div>
                <div className="w-9 h-9 rounded-2xl border-2 border-white bg-pink-400 flex items-center justify-center text-base">🇧🇷</div>
                <div className="w-9 h-9 rounded-2xl border-2 border-white bg-cyan-400 flex items-center justify-center text-base">🇯🇵</div>
              </div>
            </div>
          </div>

          {/* Right — phone-style logo showcase */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="bg-black/40 backdrop-blur-xl rounded-[40px] p-3 border border-white/20 shadow-2xl w-[300px] md:w-[360px]">
                <div className="relative aspect-[9/16] rounded-[32px] overflow-hidden">
                  <video
                    src={heroVideo}
                    poster={logoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    data-testid="video-hero"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                  {[0, 1, 2].map(i => (
                    <span key={i} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-cyan-300/40" style={{ animation: `pulse-ring 3s ${i * 0.6}s infinite ease-out` }}></span>
                  ))}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="font-mono text-[10px] text-cyan-200 uppercase tracking-widest mb-1">Pulse · Live</div>
                    <div className="font-display text-5xl font-bold text-white tabular-nums drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]" data-testid="text-pulse-score">{score.toFixed(1)}</div>
                    <div className="font-mono text-[10px] text-white/70 uppercase tracking-widest">/ 100 momentum</div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white text-black px-5 py-3 rounded-2xl font-semibold shadow-xl flex items-center gap-3" data-testid="badge-exploding">
                <span className="text-3xl" aria-hidden>💥</span>
                <div>
                  <div className="text-pink-500 text-[10px] font-mono uppercase tracking-widest">{t("home.hero.badge.label")}</div>
                  <div className="text-lg leading-tight">{t("home.hero.badge.sub")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`@keyframes pulse-ring { 0% { transform: translate(-50%, -50%) scale(0.7); opacity: 0.8; } 100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; } }`}</style>
      </section>

      {/* Stats strip */}
      <section className="py-12 border-y border-white/10 bg-black">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { end: 4.8, suffix: "M", labelKey: "stats.sources" },
            { end: 140, suffix: "ms", labelKey: "stats.latency" },
            { end: 99.2, suffix: "%", labelKey: "stats.precision" },
            { end: 12.4, suffix: "K", labelKey: "stats.pulses" },
          ].map(s => (
            <div key={s.labelKey} className="flex flex-col items-center text-center">
              <CountUp end={s.end} suffix={s.suffix} />
              <div className="font-mono text-[11px] text-white/50 mt-2 uppercase tracking-widest">{t(s.labelKey)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE TRACKER */}
      <section id="live-tracker" className="relative overflow-hidden py-24 px-6 md:px-8 bg-[#0B131F] border-t border-white/10">
        <LogoMark src={mark1} className="top-8 right-[-50px] w-72 rotate-6" />
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-green-400">{t("home.tracker.live")}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-3 tracking-tight" data-testid="text-tracker-title">{t("home.tracker.title")}</h2>
          <p className="text-center text-white/60 text-lg mb-10 max-w-2xl mx-auto" data-testid="text-tracker-sub">{t("home.tracker.sub")}</p>

          <div className="flex justify-center mb-10">
            <div role="group" aria-label={t("home.tracker.filterLabel")} className="inline-flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
              {trackerCountries.map((c) => (
                <button
                  key={c}
                  onClick={() => setTrackerCountry(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${trackerCountry === c ? "bg-cyan-400 text-black shadow-[0_0_18px_rgba(0,245,255,0.4)]" : "text-white/60 hover:text-white"}`}
                  aria-pressed={trackerCountry === c}
                  data-testid={`btn-country-${c}`}
                >
                  {c === "all" ? t("home.tracker.all") : c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrends.map((tr) => (
              <TrendCard key={`${tr.name}-${tr.country}`} trend={tr} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 md:px-8 bg-zinc-900">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight" data-testid="text-features-title">{t("home.features.title")}</h2>

          {/* For All */}
          <div className="mb-12">
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3">
              <span className="text-pink-400" aria-hidden>❤️</span>
              {t("home.features.all.title")}
            </h3>
            <figure className="mb-10 max-w-3xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-pink-500/30 bg-zinc-950 shadow-lg shadow-pink-500/10">
                <img src={trendingShot} alt={t("home.features.all.redirect")} loading="lazy" className="w-full h-auto" />
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[9px] font-mono uppercase tracking-widest text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>LIVE
                </div>
              </div>
              <figcaption className="mt-3 text-center text-sm md:text-base text-pink-300 font-medium" data-testid="text-all-redirect">{t("home.features.all.redirect")}</figcaption>
            </figure>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {allItems.map((item, i) => (
                <FeatureShot key={item} shot={FEAT_ALL[i] ?? logoUrl} text={item} accent="pink" testid={`feature-all-${i}`} />
              ))}
            </div>
          </div>

          {/* Creators — pink */}
          <div className="mb-8 border border-pink-500/30 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-pink-900/20 to-transparent">
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">{t("home.features.creators.title")}</h3>
            <div className="text-pink-300 font-mono text-sm uppercase tracking-widest mb-6">{t("home.features.creators.tier")}</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {creatorsItems.map((item, i) => (
                <FeatureShot key={item.text} shot={FEAT_CREATORS[i] ?? logoUrl} text={item.text} icon={item.icon} accent="pink" testid={`feature-creators-${i}`} />
              ))}
            </div>
          </div>

          {/* Brands — cyan */}
          <div className="mb-8 border border-cyan-500/30 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-cyan-900/20 to-transparent">
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">{t("home.features.brands.title")}</h3>
            <div className="text-cyan-300 font-mono text-sm uppercase tracking-widest mb-6">{t("home.features.brands.tier")}</div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
              {brandsItems.map((item, i) => (
                <FeatureShot key={item.text} shot={FEAT_BRANDS[i] ?? logoUrl} text={item.text} icon={item.icon} accent="cyan" testid={`feature-brands-${i}`} />
              ))}
            </div>
          </div>

          {/* Curious / Explorer — amber */}
          <div className="border border-amber-500/30 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-amber-900/20 to-transparent">
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">{t("home.features.curious.title")}</h3>
            <div className="text-amber-300 font-mono text-sm uppercase tracking-widest mb-6">{t("home.features.curious.tier")}</div>
            <div className="grid grid-cols-2 gap-5 max-w-md">
              {curiousItems.map((item, i) => (
                <FeatureShot key={item.text} shot={FEAT_CURIOUS[i] ?? logoUrl} text={item.text} icon={item.icon} accent="amber" testid={`feature-curious-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IN ACTION */}
      <section id="in-action" className="relative overflow-hidden py-24 px-6 md:px-8 bg-black border-t border-white/10">
        <LogoMark src={mark3} className="bottom-10 left-[-40px] w-80 -rotate-3" />
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-3 tracking-tight" data-testid="text-inaction-title">{t("home.inaction.title")}</h2>
          <p className="text-center text-white/60 text-lg mb-14" data-testid="text-inaction-sub">{t("home.inaction.sub")}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(() => {
              const items = tList("home.inaction.items");
              const total = String(items.length).padStart(2, "0");
              return items.map((raw, i) => {
                const [color, , title, sub] = raw.split("|");
                const tint: Record<string, { text: string; ring: string; glow: string }> = {
                  pink: { text: "text-pink-300", ring: "border-pink-500/40", glow: "shadow-[0_0_50px_rgba(236,72,153,0.3)]" },
                  cyan: { text: "text-cyan-300", ring: "border-cyan-500/40", glow: "shadow-[0_0_50px_rgba(34,211,238,0.3)]" },
                  amber: { text: "text-amber-300", ring: "border-amber-500/40", glow: "shadow-[0_0_50px_rgba(245,158,11,0.3)]" },
                };
                const a = tint[color] ?? tint.pink;
                const shot = INACTION_SHOTS[i] ?? logoUrl;
                return (
                  <div key={title} className="group" data-testid={`inaction-card-${i}`}>
                    <div className={`relative bg-zinc-950 rounded-[28px] overflow-hidden border-2 ${a.ring} ${a.glow} transition-transform duration-300 group-hover:-translate-y-1`}>
                      <div className="relative aspect-[9/19.5] overflow-hidden bg-black">
                        <img src={shot} alt={title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                        <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[9px] font-mono uppercase tracking-widest text-white/90">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>LIVE
                        </div>
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[9px] font-mono uppercase tracking-widest text-white/70">
                          {String(i + 1).padStart(2, "0")} / {total}
                        </div>
                      </div>
                    </div>
                    <p className={`text-center mt-4 font-semibold ${a.text}`}>{title}</p>
                    <p className="text-center text-sm text-white/60 mt-1">{sub}</p>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* AI STUDIO */}
      <section id="studio" className="relative overflow-hidden py-24 px-6 md:px-8 bg-[#0B131F] border-t border-white/10">
        <LogoMark src={mark4} className="top-12 left-[-40px] w-72 rotate-3" />
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-3 tracking-tight" data-testid="text-studio-title">{t("home.studio.title")}</h2>
          <p className="text-center text-white/60 text-lg mb-12 max-w-2xl mx-auto" data-testid="text-studio-sub">{t("home.studio.sub")}</p>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
          <div className="relative rounded-[32px] bg-[#121C2C] border border-white/10 p-7 md:p-10 shadow-2xl overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-pink-500/10 blur-[90px] rounded-full pointer-events-none"></div>

            <div className="relative flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full bg-cyan-400/15 text-cyan-300 text-[11px] font-mono uppercase tracking-widest">04 Auto</span>
              <span className="font-display text-lg font-bold text-cyan-300">{t("home.studio.pack.label")}</span>
            </div>

            <div className="relative space-y-7">
              <div data-testid="studio-hook">
                <div className="text-[11px] font-mono uppercase tracking-widest text-pink-400 mb-2">{t("home.studio.pack.hook")}</div>
                <p className="font-display text-xl md:text-2xl font-bold text-white leading-snug">"The sign he's hooked but plays indifferent"</p>
              </div>

              <div data-testid="studio-script">
                <div className="text-[11px] font-mono uppercase tracking-widest text-pink-400 mb-2">{t("home.studio.pack.script")}</div>
                <div className="rounded-2xl bg-black/40 border border-white/10 p-4 font-mono text-sm text-white/80 leading-relaxed space-y-1.5">
                  <p><span className="text-cyan-300">[0-2s]</span> Brutal zoom on intense stare</p>
                  <p><span className="text-cyan-300">[2-18s]</span> "He pretends to be indifferent, but here are the 3 micro-signals that betray him"</p>
                  <p><span className="text-cyan-300">[18-25s]</span> Strong CTA + "Comment OBSESSION for the full guide"</p>
                </div>
              </div>

              <div data-testid="studio-caption">
                <div className="text-[11px] font-mono uppercase tracking-widest text-pink-400 mb-2">{t("home.studio.pack.caption")}</div>
                <p className="text-white/85 leading-relaxed">"This one sign changes everything in your relationship... Comment OBSESSION for the full guide 🔥"</p>
                <p className="mt-2 text-cyan-300 font-medium">#DarkPsychology #RelationTips #DatingAdvice</p>
              </div>

              <div data-testid="studio-prompt">
                <div className="text-[11px] font-mono uppercase tracking-widest text-pink-400 mb-2">{t("home.studio.pack.prompt")}</div>
                <div className="rounded-2xl bg-gradient-to-br from-violet-900/40 to-pink-900/30 border border-white/10 p-4">
                  <p className="text-white/80 italic leading-relaxed">"Cinematic dark style, beautiful woman with intense eye contact, slow dramatic zoom, moody lighting, luxury bedroom background, emotional tension, trending reel aesthetic, high quality, 9:16"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Real app screenshot — Auto Workflow */}
          <div className="hidden lg:block sticky top-28">
            <div className="relative bg-black/40 backdrop-blur-xl rounded-[40px] p-3 border border-white/20 shadow-2xl">
              <div className="relative aspect-[9/19.5] rounded-[32px] overflow-hidden bg-black">
                <img src={studioShot} alt={t("home.studio.title")} className="absolute inset-0 w-full h-full object-cover object-top" data-testid="img-studio-shot" />
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[9px] font-mono uppercase tracking-widest text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>LIVE
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* GUIDED TOUR */}
      <section id="tour" className="py-24 px-6 md:px-8 bg-black border-t border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-3 tracking-tight" data-testid="text-tour-title">{t("home.tour.title")}</h2>
          <p className="text-center text-white/60 text-lg mb-14 max-w-2xl mx-auto" data-testid="text-tour-sub">{t("home.tour.sub")}</p>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
            {tList("home.tour.items").map((raw, i) => {
              const [color, tag, title, desc] = raw.split("|");
              const tint: Record<string, { text: string; ring: string; glow: string }> = {
                pink: { text: "text-pink-300", ring: "border-pink-500/30", glow: "hover:shadow-[0_0_45px_rgba(236,72,153,0.28)]" },
                cyan: { text: "text-cyan-300", ring: "border-cyan-500/30", glow: "hover:shadow-[0_0_45px_rgba(34,211,238,0.28)]" },
                violet: { text: "text-violet-300", ring: "border-violet-500/30", glow: "hover:shadow-[0_0_45px_rgba(139,92,246,0.28)]" },
                amber: { text: "text-amber-300", ring: "border-amber-500/30", glow: "hover:shadow-[0_0_45px_rgba(245,158,11,0.28)]" },
              };
              const a = tint[color] ?? tint.cyan;
              const shot = TOUR_SHOTS[i] ?? logoUrl;
              return (
                <figure key={title} className="group break-inside-avoid mb-6 md:mb-8" data-testid={`tour-card-${i}`}>
                  <div className={`rounded-2xl overflow-hidden border ${a.ring} bg-zinc-900/60 shadow-lg transition-all duration-300 group-hover:-translate-y-1 ${a.glow}`}>
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/50">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-400/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-violet-400/80"></span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">{tag}</span>
                    </div>
                    <img src={shot} alt={title} loading="lazy" className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <figcaption className="px-1 mt-3">
                    <h3 className={`font-semibold ${a.text}`}>{title}</h3>
                    <p className="text-sm text-white/60 mt-0.5 leading-relaxed">{desc}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* GLOBAL / 29 LANGUAGES */}
      <section id="global" className="relative py-24 px-6 md:px-8 bg-[#0B131F] border-t border-white/10 overflow-hidden">
        <LogoMark src={mark5} className="bottom-[-30px] right-[-50px] w-80 -rotate-6" />
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <div className="text-center mb-4">
            <span className="inline-block font-mono text-[11px] uppercase tracking-widest text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10" data-testid="text-global-badge">🌍 {t("home.global.badge")}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-3 tracking-tight" data-testid="text-global-title">{t("home.global.title")}</h2>
          <p className="text-center text-white/60 text-lg mb-12 max-w-2xl mx-auto" data-testid="text-global-sub">{t("home.global.sub")}</p>

          {/* Flag marquee */}
          <div className="relative mb-16" aria-hidden>
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#0B131F] to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#0B131F] to-transparent pointer-events-none"></div>
            <div className="flex w-max animate-ticker motion-reduce:animate-none" data-testid="global-marquee">
              {[...LOCALES, ...LOCALES].map(([flag, code], i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 mx-2 rounded-full border border-white/10 bg-white/5 shrink-0">
                  <span className="text-xl leading-none">{flag}</span>
                  <span className="font-mono text-sm tracking-widest text-white/70">{code}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-slide windows */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-10 justify-items-center">
            <AutoSlideWindow accent="cyan" title={t("home.global.win1.title")} shots={GLOBAL_W1} slides={tList("home.global.win1.slides")} startAt={0} interval={3600} />
            <AutoSlideWindow accent="pink" title={t("home.global.win2.title")} shots={GLOBAL_W2} slides={tList("home.global.win2.slides")} startAt={1} interval={3200} />
            <AutoSlideWindow accent="violet" title={t("home.global.win3.title")} shots={GLOBAL_W3} slides={tList("home.global.win3.slides")} startAt={2} interval={4000} />
          </div>
        </div>
      </section>

      {/* VALUE */}
      <section id="value" className="py-24 px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-12 tracking-tight" data-testid="text-value-title">{t("home.value.title")}</h2>
          <div className="space-y-8 text-lg md:text-xl leading-relaxed text-white/80">
            <p data-testid="text-value-p1">{t("home.value.p1")}</p>
            <p data-testid="text-value-p2">{t("home.value.p2")}</p>
            <ul className="text-left max-w-xl mx-auto space-y-4">
              {valueBullets.map((b, i) => (
                <li key={b} className="flex gap-3" data-testid={`value-bullet-${i}`}>
                  <span className="text-pink-400 mt-1">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="pt-4 text-white/90" data-testid="text-value-p3">{t("home.value.p3")}</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative overflow-hidden py-24 px-6 md:px-8 bg-zinc-900 border-t border-white/10">
        <LogoMark src={mark2} className="top-10 right-[-40px] w-72 rotate-6" />
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight" data-testid="text-testimonials-title">{t("home.testimonials.title")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tList("home.testimonials.items").map((raw, i) => {
              const [color, emoji, name, role, quote] = raw.split("|");
              const accentMap: Record<string, { ring: string; text: string; from: string; to: string }> = {
                amber: { ring: "border-amber-500/30", text: "text-amber-300", from: "from-amber-400", to: "to-yellow-400" },
                pink: { ring: "border-pink-500/30", text: "text-pink-300", from: "from-pink-400", to: "to-rose-400" },
                cyan: { ring: "border-cyan-500/30", text: "text-cyan-300", from: "from-cyan-400", to: "to-blue-400" },
                violet: { ring: "border-violet-500/30", text: "text-violet-300", from: "from-violet-400", to: "to-purple-400" },
              };
              const a = accentMap[color] ?? accentMap.pink;
              return (
                <div key={name} className={`bg-white/5 hover:bg-white/[0.07] transition rounded-3xl p-8 border ${a.ring}`} data-testid={`testimonial-${i}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${a.from} ${a.to} flex items-center justify-center text-xl`} aria-hidden>{emoji}</div>
                    <div>
                      <div className="font-semibold text-white">{name}</div>
                      <div className={`${a.text} text-xs font-mono uppercase tracking-widest`}>{role}</div>
                    </div>
                  </div>
                  <p className="text-white/85 leading-relaxed italic">{quote}</p>
                  <div className="mt-6 text-pink-400 text-sm tracking-widest" aria-label="5 out of 5 stars">★★★★★</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="download" className="py-28 px-6 md:px-8 text-center relative overflow-hidden" style={pulseBg}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-400/15 blur-[100px]"></div>
          <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-400/20 blur-[100px]"></div>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 tracking-tight" data-testid="text-final-title">{t("home.final.title")}</h2>
          <p className="text-xl md:text-2xl mb-12 text-white/85" data-testid="text-final-sub">{t("home.final.sub")}</p>
          <a href="#" className="inline-flex items-center gap-4 text-xl md:text-2xl px-10 py-6 bg-white text-black rounded-2xl font-semibold hover:scale-[1.04] transition shadow-[0_20px_60px_rgba(0,0,0,0.4)]" data-testid="btn-final-cta">
            <span className="text-3xl" aria-hidden>⬇</span>
            {t("home.final.cta")}
          </a>
          <p className="mt-8 text-sm text-white/60 font-mono tracking-widest uppercase" data-testid="text-final-note">{t("home.final.note")}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-10 text-center border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <div className="relative w-7 h-7 rounded-xl overflow-hidden border border-white/15">
              <img src={logoUrl} alt="" className="w-full h-full object-cover scale-[1.35]" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-pink-300">TrendPulse</span>
          </div>
          <div className="text-white/40 text-sm" data-testid="text-footer-made">{t("home.footer.made")}</div>
        </div>
      </footer>
    </div>
  );
}
