import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type Status = "exploding" | "rising" | "falling";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useI18n();
  const styles = {
    exploding: "border-[#ff00c8] text-[#ff00c8] bg-[#ff00c8]/5",
    rising: "border-[#00f5ff] text-[#00f5ff] bg-[#00f5ff]/5",
    falling: "border-[#a855f7] text-[#a855f7] bg-[#a855f7]/5"
  };

  return (
    <span className={cn("px-2 py-0.5 rounded-full border font-mono text-[9px] uppercase tracking-widest flex items-center gap-1", styles[status], className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse",
        status === "exploding" ? "bg-[#ff00c8]" :
        status === "rising" ? "bg-[#00f5ff]" : "bg-[#a855f7]"
      )}></span>
      {t(`status.${status}`)}
    </span>
  );
}
