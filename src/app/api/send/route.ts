import { Resend } from 'resend';
import {ContactEmailTemplate} from "@/email/contactEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <no-reply@dotshef.com>',
            to: ['contact@dotshef.com'],
            subject: 'Hello world',
            react: ContactEmailTemplate({ name: 'John' }),
        });

        if (error) {
            console.error(error);
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error }, { status: 500 });
    }
}