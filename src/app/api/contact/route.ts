import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_TO || "abdiahma@gmail.com";
const CONTACT_FROM = process.env.CONTACT_FROM || `Portfolio <no-reply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || "example.com"}>`;

function escapeHtml(unsafe: string) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body as {
            name?: string;
            email?: string;
            message?: string;
        };

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Log the message (useful in dev/when RESEND_API_KEY is missing)
        console.log("Contact form received:", { name, email });

        // If Resend API key is not configured, return success but note that no email was sent
        if (!RESEND_API_KEY) {
            console.warn("RESEND_API_KEY not set — message will not be emailed.");
            return NextResponse.json(
                { message: "Message received (not emailed — RESEND_API_KEY not configured)" },
                { status: 200 }
            );
        }

        const subject = `New message from ${name}`;
        const text = `${message}\n\nFrom: ${name} <${email}>`;
        const html = `<p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p><p>From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`;

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: CONTACT_FROM,
                to: CONTACT_TO,
                subject,
                text,
                html,
            }),
        });

        if (!res.ok) {
            const bodyText = await res.text();
            console.error("Resend API error:", res.status, bodyText);
            return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
        }

        return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error processing contact form:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
