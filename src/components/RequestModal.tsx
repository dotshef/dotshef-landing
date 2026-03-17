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
    "w-full rounded-lg border border-neutral-200 bg-transparent px-4 py-3 text-brand-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-black transition-colors disabled:text-neutral-400";

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-full max-w-lg bg-transparent p-4 backdrop:bg-black/30"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative rounded-2xl bg-white px-8 py-10">
        {/* 닫기 */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-2xl leading-none text-neutral-400 transition-colors hover:text-brand-black hover:bg-neutral-100"
        >
          &times;
        </button>

        {status === "success" ? (
          <p className="py-12 text-center text-lg font-bold text-brand-black">
            견적 요청이 전송되었습니다.
          </p>
        ) : (
          <>
            <h2 className="mb-8 text-2xl font-extrabold text-brand-black">견적 요청하기</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 이름 + 전화번호 */}
              <div className="flex gap-6">
                <input
                  type="text"
                  required
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={sending}
                  placeholder="이름 *"
                  className={`flex-1 ${inputClass}`}
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={sending}
                  placeholder="전화번호"
                  className={`flex-1 ${inputClass}`}
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sending}
                  placeholder="이메일 *"
                  className={inputClass}
                />
              </div>

              <div>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={sending}
                  placeholder="웹사이트 주제 *"
                  className={inputClass}
                />
              </div>

              <div>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={sending}
                  placeholder="내용을 입력해 주세요. *"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="text-sm font-medium text-red-600">
                  전송에 실패했습니다. 다시 시도해 주세요.
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-brand-black py-3.5 text-base font-bold
                text-white transition-colors hover:bg-neutral-800 disabled:bg-neutral-300 disabled:text-neutral-500
                cursor-pointer"
              >
                {sending ? "전송 중..." : "견적 요청 보내기"}
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
