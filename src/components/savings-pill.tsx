import { useEffect, useState } from "react";

export function SavingsPill() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("roi-calculator");

    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      let inView = false;
      if (target) {
        const rect = target.getBoundingClientRect();
        inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
      }
      setVisible(pastHero && !inView);
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
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-20 right-4 z-40 cursor-pointer rounded-full border border-electric/50 bg-electric px-5 py-3 text-sm font-extrabold text-navy shadow-lg transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      Calculate My Savings →
    </button>
  );
}
