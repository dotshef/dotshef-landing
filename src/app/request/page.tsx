"use client"

import type { Metadata } from "next"
import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { summarizeAnswers } from "@/lib/estimate/summarize"
import type { AnswerState } from "@/lib/estimate/types"

export default function RequestPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [topic, setTopic] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  useEffect(() => {
    const raw = sessionStorage.getItem("estimate_answers")
    if (raw) {
      try {
        const answers = JSON.parse(raw) as AnswerState
        setMessage(summarizeAnswers(answers))
      } catch {
        // 파싱 실패 시 빈 내용으로 시작
      }
    }
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus("sending")

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, topic, message, type: "request" }),
      })

      if (!res.ok) throw new Error()

      sessionStorage.removeItem("estimate_answers")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const sending = status === "sending"

  const inputClass =
    "w-full rounded-xl border-2 bg-brand-yellow-light px-4 py-3 text-brand-black placeholder:text-brand-black/40 focus:outline-none focus:border-brand-black disabled:opacity-50"

  if (status === "success") {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-brand-black px-6 py-24">
        <div className="w-full max-w-xl rounded-2xl bg-brand-yellow p-10 text-center">
          <p className="text-2xl font-extrabold text-brand-black">견적 요청이 전송됐어요!</p>
          <p className="mt-3 text-base text-brand-black/70">빠르게 검토 후 연락드리겠습니다.</p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-8 rounded-xl bg-brand-black px-8 py-3 text-base font-bold text-brand-yellow transition-opacity hover:opacity-80 cursor-pointer"
          >
            홈으로 돌아가기
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-brand-black px-6 py-24">
      <div className="w-full max-w-xl">
        <h1 className="mb-8 text-3xl font-extrabold text-brand-yellow">견적 요청하기</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* 이름 + 전화번호 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-bold text-brand-yellow/70">
                이름 <span className="text-brand-yellow">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={50}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={sending}
                placeholder="홍길동"
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-bold text-brand-yellow/70">전화번호</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={sending}
                placeholder="010-0000-0000"
                className={inputClass}
              />
            </div>
          </div>

          {/* 이메일 (필수) */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-brand-yellow/70">
              이메일 주소 <span className="text-brand-yellow">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={sending}
              placeholder="example@email.com"
              className={inputClass}
            />
          </div>

          {/* 웹사이트 주제 */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-brand-yellow/70">
              웹사이트 주제 <span className="text-brand-yellow">*</span>
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={sending}
              placeholder=""
              className={inputClass}
            />
          </div>

          {/* 내용 */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-brand-yellow/70">
              내용 <span className="text-brand-yellow">*</span>
            </label>
            <textarea
              required
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={sending}
              placeholder="문의 내용을 입력해 주세요."
              className={`${inputClass} resize-y`}
            />
          </div>

          {status === "error" && (
            <p className="text-sm font-medium text-red-400">
              전송에 실패했습니다. 다시 시도해 주세요.
            </p>
          )}

          {/* 제출 */}
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-xl bg-brand-yellow py-4 text-base font-bold text-brand-black
                       border-2 border-brand-yellow
                       transition-all duration-300
                       hover:bg-brand-yellow-action
                       disabled:opacity-50 cursor-pointer"
          >
            {sending ? "전송 중..." : "견적 요청 보내기"}
          </button>
        </form>
      </div>
    </main>
  )
}
