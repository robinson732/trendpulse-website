export const trends = [
  { slug: "chelsea", name: "Chelsea", region: "United Kingdom", country: "GB", status: "exploding", volume: "1.9M", change: "+109%", sentiment: [60, 20, 20], platforms: ["x", "instagram", "tiktok"], sparkline: [10, 20, 15, 30, 45, 60, 80] },
  { slug: "merlofc", name: "MerloFC", region: "France", country: "FR", status: "exploding", volume: "850K", change: "+234%", sentiment: [75, 15, 10], platforms: ["youtube", "tiktok"], sparkline: [5, 10, 20, 35, 50, 70, 95] },
  { slug: "nikkettstar", name: "NIKKETTStar", region: "United States", country: "US", status: "rising", volume: "420K", change: "+89%", sentiment: [50, 30, 20], platforms: ["instagram", "spotify"], sparkline: [20, 25, 22, 30, 40, 45, 55] },
  { slug: "mattheo", name: "Matthéo", region: "France", country: "FR", status: "rising", volume: "150K", change: "+73%", sentiment: [15, 27, 58], platforms: ["x", "spotify", "tiktok", "youtube"], sparkline: [10, 18, 28, 35, 50, 62, 80] },
  { slug: "synthetic-media", name: "Synthetic Media", region: "Global", country: "GLOBAL", status: "exploding", volume: "2.1M", change: "+412%", sentiment: [40, 40, 20], platforms: ["x", "youtube"], sparkline: [10, 15, 30, 50, 65, 80, 100] },
  { slug: "quantum-compute", name: "Quantum Compute", region: "United States", country: "US", status: "falling", volume: "310K", change: "-45%", sentiment: [30, 50, 20], platforms: ["x", "youtube"], sparkline: [80, 75, 60, 50, 45, 30, 20] },
  { slug: "zero-knowledge", name: "Zero-Knowledge", region: "Global", country: "GLOBAL", status: "exploding", volume: "1.2M", change: "+620%", sentiment: [80, 15, 5], platforms: ["x", "youtube"], sparkline: [5, 15, 25, 45, 60, 85, 100] },
  { slug: "spatial-audio", name: "Spatial Audio", region: "Germany", country: "DE", status: "rising", volume: "560K", change: "+143%", sentiment: [65, 25, 10], platforms: ["spotify", "youtube", "tiktok"], sparkline: [15, 20, 30, 45, 55, 65, 75] },
  { slug: "chuck-norris", name: "Chuck Norris", region: "Global", country: "GLOBAL", status: "falling", volume: "142K", change: "-92%", sentiment: [72, 13, 15], platforms: ["x", "instagram", "youtube"], sparkline: [100, 80, 60, 40, 20, 10, 5] },
  { slug: "ferragni-pulse", name: "Ferragni Pulse", region: "Italy", country: "IT", status: "exploding", volume: "780K", change: "+312%", sentiment: [55, 25, 20], platforms: ["instagram", "tiktok"], sparkline: [10, 22, 35, 50, 70, 85, 95] },
  { slug: "barcelona-derby", name: "Barcelona Derby", region: "Spain", country: "ES", status: "rising", volume: "640K", change: "+118%", sentiment: [70, 20, 10], platforms: ["x", "youtube", "tiktok"], sparkline: [20, 28, 35, 48, 55, 68, 82] },
  { slug: "favela-funk", name: "Favela Funk", region: "Brazil", country: "BR", status: "exploding", volume: "1.4M", change: "+289%", sentiment: [82, 12, 6], platforms: ["spotify", "tiktok", "youtube"], sparkline: [12, 18, 32, 50, 72, 88, 100] },
  { slug: "amsterdam-tech", name: "Amsterdam Tech", region: "Netherlands", country: "NL", status: "rising", volume: "210K", change: "+62%", sentiment: [60, 30, 10], platforms: ["x", "youtube"], sparkline: [25, 30, 35, 42, 48, 55, 62] },
] as const;

export type Trend = typeof trends[number];

export const COUNTRIES = [
  { code: "GLOBAL", label: "Global", flag: "🌐" },
  { code: "US", label: "United States", flag: "🇺🇸" },
  { code: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { code: "FR", label: "France", flag: "🇫🇷" },
  { code: "DE", label: "Germany", flag: "🇩🇪" },
  { code: "ES", label: "Spain", flag: "🇪🇸" },
  { code: "IT", label: "Italy", flag: "🇮🇹" },
  { code: "NL", label: "Netherlands", flag: "🇳🇱" },
  { code: "BR", label: "Brazil", flag: "🇧🇷" },
] as const;

export type Country = typeof COUNTRIES[number];
