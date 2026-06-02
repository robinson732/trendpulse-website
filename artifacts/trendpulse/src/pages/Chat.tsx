import { useState, useEffect, useMemo } from "react";
import { MessageCircle, Sparkles, Brain, Star, Flame, X } from "lucide-react";
import { TopNav } from "@/components/TopNav";
import { useI18n } from "@/lib/i18n";

type Reaction = { user: string; text: string; time: string };

export default function Chat() {
  const { t, tList, lang } = useI18n();
  const pool = useMemo<Reaction[]>(
    () =>
      tList("chat.reactions").map((raw, i) => {
        const [user, text] = raw.split("|");
        const minutes = [1, 2, 4, 7, 12, 15, 22][i] ?? (i + 1);
        return { user, text, time: `${minutes}${t("chat.time.minute")}` };
      }),
    [tList, t]
  );

  const [reactions, setReactions] = useState<Reaction[]>(pool.slice(2));
  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    setReactions(pool.slice(2));
  }, [lang, pool]);

  useEffect(() => {
    const timer = setInterval(() => {
      setReactions(prev => {
        if (pool.length === 0) return prev;
        const src = pool[Math.floor(Math.random() * Math.min(2, pool.length))];
        const newReaction: Reaction = { ...src, time: t("chat.time.justnow") };
        return [newReaction, ...prev.slice(0, 8)];
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [pool, t]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden pt-24 pb-12">
      <div className="absolute inset-0 pointer-events-none noise opacity-20 z-50"></div>
      <TopNav />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl tracking-tight mb-1">{t("chat.title")}</h1>
            <p className="font-mono text-xs text-muted-foreground">
              {t("chat.sub.prefix")} <span className="text-[#00ff88]">#NIKKETTStar</span>
            </p>
          </div>
          <div className="px-4 py-1.5 border border-border rounded-full font-mono text-[10px] uppercase tracking-widest text-muted-foreground bg-card">
            {t("chat.feed.badge")}
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-[#00ff88]/30 rounded-xl p-4 cursor-pointer hover:bg-[#00ff88]/5 transition-colors">
            <MessageCircle className="w-5 h-5 text-[#00ff88] mb-3" />
            <div className="font-mono font-bold text-[10px] uppercase tracking-widest mb-1">{t("chat.card.reactions.title")}</div>
            <div className="text-[10px] text-muted-foreground line-clamp-2">{t("chat.card.reactions.sub")}</div>
          </div>
          <div className="bg-card border border-[#ff4488]/30 rounded-xl p-4 cursor-pointer hover:bg-[#ff4488]/5 transition-colors">
            <Sparkles className="w-5 h-5 text-[#ff4488] mb-3" />
            <div className="font-mono font-bold text-[10px] uppercase tracking-widest mb-1">{t("chat.card.meme.title")}</div>
            <div className="text-[10px] text-muted-foreground line-clamp-2">{t("chat.card.meme.sub")}</div>
          </div>
          <div className="bg-card border border-[#4488ff]/30 rounded-xl p-4 cursor-pointer hover:bg-[#4488ff]/5 transition-colors">
            <Brain className="w-5 h-5 text-[#4488ff] mb-3" />
            <div className="font-mono font-bold text-[10px] uppercase tracking-widest mb-1">{t("chat.card.theories.title")}</div>
            <div className="text-[10px] text-muted-foreground line-clamp-2">{t("chat.card.theories.sub")}</div>
          </div>
          <div className="bg-card border border-[#ffaa00]/30 rounded-xl p-4 cursor-pointer hover:bg-[#ffaa00]/5 transition-colors">
            <Star className="w-5 h-5 text-[#ffaa00] mb-3" />
            <div className="font-mono font-bold text-[10px] uppercase tracking-widest mb-1">{t("chat.card.highlight.title")}</div>
            <div className="text-[10px] text-muted-foreground line-clamp-2">{t("chat.card.highlight.sub")}</div>
          </div>
        </div>

        <div className="bg-card border border-white/5 rounded-xl overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-border flex items-center gap-2 bg-background/50">
            <Flame className="w-4 h-4 text-[#ff4488]" />
            <span className="font-mono text-xs uppercase tracking-widest">{t("chat.live")}</span>
            <span className="text-[#00ff88] font-mono text-xs ml-auto">#NIKKETTStar</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {showAd && (
              <div className="border border-[#ff00c8]/30 bg-[#ff00c8]/5 rounded-lg p-4 relative group">
                <button onClick={() => setShowAd(false)} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground" data-testid="btn-close-ad">
                  <X className="w-3 h-3" />
                </button>
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-2">{t("chat.sponsored")}</div>
                <p className="text-sm mb-3">{t("chat.ad.body")}</p>
                <button className="px-4 py-1.5 bg-[#ff00c8] text-white font-mono text-[10px] uppercase tracking-widest rounded hover:bg-[#ff00c8]/80 transition-colors">
                  {t("chat.ad.cta")}
                </button>
              </div>
            )}

            {reactions.map((r, i) => (
              <div key={i + r.time + r.user} className="p-4 bg-background border border-border rounded-lg animate-fade-up">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs text-[#00ff88]">{r.user}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{r.time}</span>
                </div>
                <p className="text-sm text-foreground/90">{r.text}</p>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-border bg-background/50">
            <div className="relative">
              <input type="text" placeholder={t("chat.input.placeholder")} className="w-full bg-background border border-border rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary transition-colors pr-24" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary/20 text-primary font-mono text-[10px] uppercase tracking-widest rounded hover:bg-primary/30 transition-colors">
                {t("chat.send")}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
