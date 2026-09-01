import { useEffect, useState } from "react";
import { Calculator } from "lucide-react";

export function SavingsPill() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("roi-calculator");

    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      let beforeSection = true;
      if (target) {
        const rect = target.getBoundingClientRect();
        beforeSection = rect.top > window.innerHeight * 0.85;
      }
      setVisible(pastHero && beforeSection);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => document.getElementById("roi-calculator")?.scrollIntoView({ behavior: "smooth", block: "start" })}
      aria-label="Calculate my savings"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-4 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-electric/50 bg-electric text-navy shadow-lg shadow-electric/20 transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <Calculator className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}
