"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
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

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-full max-w-xl bg-transparent p-4 backdrop:bg-black/70"
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose();
      }}
    >
      <div className="overflow-hidden rounded-2xl bg-brand-yellow">
        {/* Header — 검정 바 */}
        <div className="flex items-center justify-between bg-brand-black px-6 py-4">
          <h2 className="text-lg font-bold text-brand-yellow">문의하기</h2>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-brand-black text-xl leading-none text-brand-yellow transition-opacity hover:opacity-70"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === "success" ? (
            <p className="py-8 text-center text-lg font-bold text-brand-black">
              문의가 전송되었습니다.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 이름 */}
              <div>
                <label className="mb-1 block text-base font-bold text-brand-black">
                  이름
                </label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={sending}
                  placeholder="이름"
                  className="w-full rounded-lg border border-brand-black/20 bg-brand-yellow-light px-4 py-2.5 text-brand-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-black disabled:opacity-50"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className="mb-1 block text-base font-bold text-brand-black">
                  이메일
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sending}
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-brand-black/20 bg-brand-yellow-light px-4 py-2.5 text-brand-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-black disabled:opacity-50"
                />
              </div>

              {/* 문의 내용 */}
              <div>
                <label className="mb-1 block text-base font-bold text-brand-black">
                  문의 내용
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={sending}
                  placeholder="문의 내용을 입력해 주세요."
                  className="w-full resize-none rounded-lg border border-brand-black/20 bg-brand-yellow-light px-4 py-2.5 text-brand-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-black disabled:opacity-50"
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
                className="w-full rounded-lg bg-brand-black px-4 py-2.5 font-bold text-brand-yellow transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {sending ? "전송 중..." : "제출하기"}
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
