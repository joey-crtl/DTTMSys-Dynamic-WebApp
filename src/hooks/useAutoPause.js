// src/hooks/useAutoPause.js
import { useEffect } from "react";

export default function useAutoPause(selector = "video") {
  useEffect(() => {
    const videos = Array.from(document.querySelectorAll(selector));
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (entry.isIntersecting) {
            // play small muted autoplay behavior if desired
            // don't autoplay to avoid UX surprises
          } else {
            try {
              if (!vid.paused) vid.pause();
            } catch (e) {}
          }
        });
      },
      { threshold: 0.4 }
    );

    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, [selector]);
}
