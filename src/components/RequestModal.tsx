"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RequestModal({ open, onClose }: RequestModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setTopic("");
    setMessage("");
    setStatus("idle");
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, topic, message, type: "request" }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  const inputClass =
    "w-full rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-2.5 text-brand-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-black focus:border-2 disabled:bg-neutral-200 disabled:text-neutral-400";

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-full max-w-lg bg-transparent p-4 backdrop:bg-black/30"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="overflow-hidden rounded-2xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between bg-brand-black px-6 py-4">
          <h2 className="text-lg font-bold text-white">견적 요청하기</h2>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-brand-black text-xl leading-none text-white transition-colors hover:bg-neutral-800"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === "success" ? (
            <p className="py-8 text-center text-lg font-bold text-brand-black">
              견적 요청이 전송되었습니다.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 이름 + 전화번호 */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="mb-1 block text-base font-bold text-brand-black">
                    이름 <span className="text-red-500">*</span>
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
                  <label className="mb-1 block text-base font-bold text-brand-black">
                    전화번호
                  </label>
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

              {/* 이메일 */}
              <div>
                <label className="mb-1 block text-base font-bold text-brand-black">
                  이메일 <span className="text-red-500">*</span>
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
                <label className="mb-1 block text-base font-bold text-brand-black">
                  웹사이트 주제 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={sending}
                  placeholder="ex) 쇼핑몰, 기업 홈페이지"
                  className={inputClass}
                />
              </div>

              {/* 내용 */}
              <div>
                <label className="mb-1 block text-base font-bold text-brand-black">
                  내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={sending}
                  placeholder="문의 내용을 입력해 주세요."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* 에러 메시지 */}
              {status === "error" && (
                <p className="text-sm font-medium text-red-600">
                  전송에 실패했습니다. 다시 시도해 주세요.
                </p>
              )}

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-lg bg-brand-black px-4 py-2.5 font-bold
                text-white transition-colors hover:bg-neutral-800 disabled:bg-neutral-600 disabled:text-neutral-400
                cursor-pointer"
              >
                {sending ? "전송 중..." : "견적 요청 보내기"}
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
