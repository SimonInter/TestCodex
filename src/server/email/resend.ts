import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export const sendOrderConfirmation = async ({
  to,
  subject,
  html
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY non configurée");
    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "atelier@example.com",
    to,
    subject,
    html
  });
};
