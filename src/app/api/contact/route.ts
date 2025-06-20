// archivo: src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactFormEmail } from "@/emails/ContactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = "smartcaribbeanimport@yahoo.com"; // <-- REEMPLAZA CON TU CORREO

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Smart Caribbean Minimart <onboarding@resend.dev>", // Usar el dominio de Resend para empezar
      to: [toEmail],
      subject: "New Message from Contact Form",
      replyTo: email,
      react: await ContactFormEmail({ name, email, message }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully!", data });
  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}