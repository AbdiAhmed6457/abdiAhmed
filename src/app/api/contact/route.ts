import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Here you would typically send the email using Nodemailer or Resend
        // For example with Resend:
        // await resend.emails.send({
        //   from: 'Portfolio <onboarding@resend.dev>',
        //   to: 'your-email@example.com',
        //   subject: `New message from ${name}`,
        //   text: message,
        // });

        console.log('Message received:', { name, email, message });

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
