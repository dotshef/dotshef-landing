# Resend 이메일 전송 정의서

## 구조

```
src/app/api/send/route.ts        ← API Route (POST 핸들러)
src/email/contactEmailTemplate.tsx  ← 이메일 본문 템플릿
```

## 흐름

```
ContactModal (폼 제출)
  → POST /api/send { name, email, message }
  → route.ts에서 Resend SDK로 이메일 전송
  → contactEmailTemplate으로 본문 렌더링
```

## API Route — `src/app/api/send/route.ts`

ContactEmailTemplate을 사용하여 내용 발송

```ts
import { Resend } from "resend";
import { ContactEmailTemplate } from "@/email/contactEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: "모든 필드를 입력해 주세요." }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: 'Dotshef System <no-reply@dotshef.com>',
    to: "contact@dotshef.com",
    replyTo: email,                            // 고객 이메일로 답장 가능
    subject: `[닷셰프 웹사이트] ${name}님의 문의`,
    react: ContactEmailTemplate({ name, email, message }),
  });

  if (error) {
      console.error(error);
      return Response.json({ error }, { status: 500 });
  }

  return Response.json({ id: data?.id });
}
```

## 이메일 템플릿 — `src/email/contactEmailTemplate.tsx`

**props:** `{ name: string; email: string; message: string }`

렌더링 결과:

```
┌────────────────────────────────┐
│  새로운 문의가 도착했습니다      │
│                                │
│  이름: {name}                  │
│  ──────────────────            │
│  이메일: {email}               │
│  ──────────────────            │
│  문의 내용:                     │
│  {message}                     │
└────────────────────────────────┘
```
