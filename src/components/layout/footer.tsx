// src/components/layout/footer.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Github, Linkedin, Code, Send } from "lucide-react";

const CONTACT_TARGET = "abdiahma@gmail.com";

export default function Footer() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill all fields.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSent(true);
        e.currentTarget.reset();
      } else {
        // fallback to mailto if API fails
        const mailto = `mailto:${CONTACT_TARGET}?subject=${encodeURIComponent("Message from " + payload.name)}&body=${encodeURIComponent(payload.message + "\n\nFrom: " + payload.email)}`;
        window.location.href = mailto;
      }
    } catch (err) {
      const mailto = `mailto:${CONTACT_TARGET}?subject=${encodeURIComponent("Message from " + payload.name)}&body=${encodeURIComponent(payload.message + "\n\nFrom: " + payload.email)}`;
      window.location.href = mailto;
    } finally {
      setSending(false);
    }
  }

  return (
    <footer className="site-footer text-(--lux-ivory) mt-12">
      <div className="site-footer-inner container mx-auto py-6 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[rgba(201,161,91,0.12)] flex items-center justify-center text-(--lux-ivory) font-semibold">AA</div>
            <div>
              <h3 className="text-base font-semibold">Abdi Ahmed</h3>
              <p className="text-xs text-(--muted-foreground)">Software developer — elegant, scalable web apps.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
            <input name="name" placeholder="Name" className="px-3 py-2 rounded bg-[rgba(255,255,255,0.02)] text-sm text-(--lux-ivory) w-full sm:w-auto" />
            <input name="email" placeholder="Email" className="px-3 py-2 rounded bg-[rgba(255,255,255,0.02)] text-sm text-(--lux-ivory) w-full sm:w-auto" />
            <input name="message" placeholder="Message" className="px-3 py-2 rounded bg-[rgba(255,255,255,0.02)] text-sm text-(--lux-ivory) w-full sm:w-48" />
            <button type="submit" disabled={sending} className="lux-btn lux-ghost text-sm">{sending ? 'Sending...' : 'Send'}</button>
            {/* status messages */}
            {sent && <div className="mt-2 text-sm text-green-400 w-full sm:w-auto">Message sent — thank you!</div>}
            {error && <div className="mt-2 text-sm text-rose-400 w-full sm:w-auto">{error}</div>}
          </form>

          <div className="flex items-center gap-2">
            <a href="https://www.linkedin.com/in/abdi-ahmed-29045925a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-md bg-[#0A66C2] hover:brightness-90 text-white"><Linkedin className="w-4 h-4"/></a>
            <a href="https://www.facebook.com/share/1EwEid3JHW/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-md bg-[#1877F2] hover:brightness-90 text-white">F</a>
            <a href="https://www.instagram.com/zeabudi?igsh=MXh2dW92OXF4ZGNleg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-md bg-[#E1306C] hover:brightness-90 text-white">IG</a>
            <a href="https://t.me/seatOfHnour" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="p-2 rounded-md bg-[#0088cc] hover:brightness-90 text-white"><Send className="w-4 h-4"/></a>
            <a href="https://github.com/AbdiAhmed6457" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-md bg-[#0f1724] hover:bg-[#111827] text-white"><Github className="w-4 h-4"/></a>
          </div>
        </div>

        <div className="mt-6 border-t border-[rgba(255,255,255,0.04)] pt-4 flex items-center justify-between text-sm text-(--muted-foreground)">
          <div>© {new Date().getFullYear()} Abdi Ahmed</div>
          <div className="flex items-center gap-2">Built with <Code className="w-4 h-4"/></div>
        </div>
      </div>
    </footer>
  );
}