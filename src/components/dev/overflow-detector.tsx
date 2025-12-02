"use client";

import { useEffect, useState } from "react";

export default function OverflowDetector() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const LABEL_CLASS = "__overflow-detector-label";
    const HIGHLIGHT_CLASS = "__overflow-detector-highlight";

    function clear() {
      document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach((el) => el.remove());
      document.querySelectorAll(`.${LABEL_CLASS}`).forEach((el) => el.remove());
    }

    function scan() {
      clear();
      const offenders: Array<{ el: Element; width: number; scrollWidth: number }> = [];
      const all = Array.from(document.querySelectorAll("*")) as Element[];
      all.forEach((el) => {
        try {
          const rect = (el as HTMLElement).getBoundingClientRect();
          const computed = window.getComputedStyle(el as Element);
          if (computed.display === "none" || computed.visibility === "hidden") return;
          const sw = (el as HTMLElement).scrollWidth;
          const cw = Math.ceil(rect.width);
          if (sw > cw + 1) {
            offenders.push({ el, width: cw, scrollWidth: sw });
          }
        } catch (e) {
          // ignore
        }
      });

      console.group("Overflow Detector — Offending elements",
        `%cFound ${offenders.length} offenders`, "font-weight:bold;color:#c97f2b");
      offenders.forEach(({ el, width, scrollWidth }, i) => {
        console.groupCollapsed(`%c#${i + 1} %c${(el as HTMLElement).tagName.toLowerCase()} ${((el as HTMLElement).id ? `#${(el as HTMLElement).id}` : '')} ${((el as HTMLElement).className ? `.${(el as HTMLElement).className.toString().split(' ').slice(0,3).join('.')}` : '')}`,
          "color:#fff;background:#c97f2b;padding:2px 6px;border-radius:4px;margin-right:6px;",
          "color:#ddd");
        console.log("Element:", el);
        console.log("client width:", width, "scrollWidth:", scrollWidth);
        console.log("computed style:", window.getComputedStyle(el as Element));
        console.groupEnd();

        // draw highlight
        const r = (el as HTMLElement).getBoundingClientRect();
        const marker = document.createElement("div");
        marker.className = HIGHLIGHT_CLASS;
        Object.assign(marker.style, {
          position: "absolute",
          left: `${window.scrollX + r.left}px`,
          top: `${window.scrollY + r.top}px`,
          width: `${r.width}px`,
          height: `${r.height}px`,
          border: "2px solid rgba(255,0,80,0.9)",
          background: "rgba(255,0,80,0.06)",
          zIndex: "999999",
          pointerEvents: "none",
        });
        document.body.appendChild(marker);

        const label = document.createElement("div");
        label.className = LABEL_CLASS;
        label.textContent = `${Math.round(scrollWidth)} > ${Math.round(width)}`;
        Object.assign(label.style, {
          position: "absolute",
          left: `${window.scrollX + r.left}px`,
          top: `${window.scrollY + r.top - 18}px`,
          background: "#c97f2b",
          color: "#090909",
          padding: "2px 6px",
          borderRadius: "6px",
          fontSize: "12px",
          zIndex: "999999",
          pointerEvents: "none",
        });
        document.body.appendChild(label);
      });
      console.groupEnd();
    }

    function onResize() {
      scan();
    }

    scan();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(scan);
    ro.observe(document.documentElement);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      clear();
    };
  }, [visible]);

  return (
    <div style={{ position: "fixed", right: 12, bottom: 12, zIndex: 999999 }}>
      <button
        onClick={() => setVisible((v) => !v)}
        style={{
          background: "rgba(201,161,91,0.95)",
          color: "#090909",
          padding: "8px 12px",
          borderRadius: 9999,
          border: "none",
          fontWeight: 700,
          boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
        }}
      >
        {visible ? "Hide overflow detector" : "Show overflow detector"}
      </button>
    </div>
  );
}
