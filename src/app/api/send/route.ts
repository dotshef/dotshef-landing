import { Resend } from "resend";
import { ContactEmailTemplate } from "@/email/contactEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: "모든 필드를 입력해 주세요." }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: "Dotshef System <no-reply@dotshef.com>",
    to: "contact@dotshef.com",
    replyTo: email,
    subject: `[닷셰프 웹사이트] ${name}님의 문의`,
    react: ContactEmailTemplate({ name, email, message }),
  });

  if (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ id: data?.id });
}
