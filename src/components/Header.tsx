"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactModal from "./ContactModal";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icon/logo-white-bg.png"
              alt="Dotshef"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-extrabold tracking-tight text-white">
              dotshef
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="border-2 border-white px-4 py-2 text-base font-bold text-white
              rounded-lg
              transition-colors hover:bg-white hover:text-brand-black cursor-pointer"
            >
              문의하기
            </button>
          </div>
        </div>
      </header>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}