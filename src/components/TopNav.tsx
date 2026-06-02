import { Link } from "wouter";
import logoUrl from "@assets/grok_image_1772600704959_1778993344061.jpg";
import { useI18n, type Lang } from "@/lib/i18n";

export function TopNav() {
  const { t, lang, setLang } = useI18n();

  const LangBtn = ({ value, label }: { value: Lang; label: string }) => {
    const active = lang === value;
    return (
      <button
        onClick={() => setLang(value)}
        className={`px-2 py-1 font-mono text-xs uppercase tracking-widest transition-colors ${
          active ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }`}
        data-testid={`lang-${value}`}
        aria-pressed={active}
      >
        {label}
      </button>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-display font-extrabold text-2xl tracking-tighter flex items-center gap-3" data-testid="link-home">
          <span className="relative w-11 h-11 rounded-xl overflow-hidden border border-primary/40 shadow-[0_0_20px_rgba(0,245,255,0.25)] shrink-0">
            <img src={logoUrl} alt="TrendPulse" className="w-full h-full object-cover scale-[1.35]" />
          </span>
          <span className="flex items-center">
            TrendPulse<span className="text-primary animate-pulse">_</span>
          </span>
        </Link>
        <div className="flex items-center gap-3 md:gap-6 font-mono text-sm tracking-wider">
          <Link href="/trending" className="hidden md:inline hover:text-primary transition-colors" data-testid="link-trending">{t("nav.trending")}</Link>
          <Link href="/brands" className="hidden md:inline hover:text-primary transition-colors" data-testid="link-brands">{t("nav.brands")}</Link>
          <Link href="/chat" className="hidden md:inline hover:text-primary transition-colors" data-testid="link-chat">{t("nav.chat")}</Link>

          <div className="flex items-center border border-border rounded-md overflow-hidden" role="group" aria-label="Language">
            <LangBtn value="fr" label="FR" />
            <span className="w-px h-4 bg-border" />
            <LangBtn value="en" label="EN" />
          </div>

          <button className="hidden md:inline-flex px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 uppercase tracking-widest" data-testid="btn-nav-cta">
            {t("nav.cta")}
          </button>
        </div>
      </div>
    </nav>
  );
}
