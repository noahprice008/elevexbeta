import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pricing = document.getElementById("pricing");
      if (pricing) {
        setVisible(pricing.getBoundingClientRect().top <= window.innerHeight * 0.5);
        return;
      }
      setVisible(max > 0 && window.scrollY > max * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-4 right-4 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full border border-electric/40 bg-navy text-electric shadow-lg transition-colors hover:bg-navy/90 hover:text-cloud focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
