"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // disable on touch devices
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) {
      setVisible(false);
      return;
    }

    const cursor = ref.current;
    if (!cursor) return;

    let lastX = 0;
    let lastY = 0;

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      cursor.style.left = `${lastX}px`;
      cursor.style.top = `${lastY}px`;
    };

    const onEnterInteractive = () => cursor.classList.add("--hover");
    const onLeaveInteractive = () => cursor.classList.remove("--hover");

    window.addEventListener("mousemove", onMove);

    // Add hover listeners for interactive elements
    const interactives = Array.from(document.querySelectorAll("a, button, .interactive, input, textarea"));
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    // dynamically listen for future elements
    const observer = new MutationObserver(() => {
      const list = Array.from(document.querySelectorAll("a, button, .interactive, input, textarea"));
      list.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  if (!visible) return null;

  return <div ref={ref} className="custom-cursor" aria-hidden />;
}
