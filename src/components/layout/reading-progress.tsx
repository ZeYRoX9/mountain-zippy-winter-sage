import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("main");
      const height = (el?.scrollHeight ?? document.documentElement.scrollHeight) - window.innerHeight;
      setW(height <= 0 ? 0 : Math.min(100, Math.max(0, (window.scrollY / height) * 100)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="read-progress" style={{ width: `${w}%` }} aria-hidden />;
}
