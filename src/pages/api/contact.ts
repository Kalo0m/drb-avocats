import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly subject: string;
  readonly message: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ContactFormData = await request.json();

    // Validation basique
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({
          error: "Veuillez remplir tous les champs obligatoires.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: "Adresse email invalide." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Envoi de l'email
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["theo.letouze44@gmail.com"],
      replyTo: data.email,
      subject: `[Contact] ${data.subject || "Nouveau message"} - ${data.name}`,
      html: `
        <h2>Nouveau message depuis le site web</h2>
        <p><strong>Nom :</strong> ${data.name}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.phone || "Non renseigné"}</p>
        <p><strong>Sujet :</strong> ${data.subject || "Non renseigné"}</p>
        <hr />
        <h3>Message :</h3>
        <p>${data.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return new Response(
        JSON.stringify({
          error: "Une erreur est survenue lors de l'envoi du message.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Votre message a bien été envoyé.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Erreur:", err);
    return new Response(
      JSON.stringify({ error: "Une erreur inattendue est survenue." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};


