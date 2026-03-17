"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SectionFx from "@/components/SectionFx";
import GrowthBars from "@/components/GrowthBars";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";

const CubeAnimation = dynamic(
  () => import("@/components/cube/CubeAnimation"),
  { ssr: false },
);

export default function Home() {
  const [requestOpen, setRequestOpen] = useState(false);

  return (
    <>
      <Header />

      <main>
        {/* Product Section */}
        <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-white px-6 py-24">
          <SectionFx variant="white" />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 md:flex-row md:justify-center">
            <h1 className="text-5xl font-extrabold leading-tight text-brand-black sm:text-6xl md:text-7xl">
              당신을 위한
              <br />
              맛있는 소프트웨어
            </h1>
            <div className="h-[300px] w-[300px] shrink-0 sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
              <CubeAnimation
                width="100%"
                height="100%"
                enableParallax={true}
              />
            </div>
          </div>
        </section>

        {/* Outsourcing Section */}
        <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-white px-6 py-24">
          <SectionFx variant="white" />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16">
            {/* 제목(좌) + GrowthBars(우) */}
            <div className="flex w-full flex-col items-center gap-12 md:flex-row md:justify-center">
              <h1 className="text-5xl font-extrabold leading-tight text-brand-black sm:text-6xl md:text-7xl">
                당신의 사업에
                <br />
                꼭 필요한 웹서비스
              </h1>
              <GrowthBars width={300} height={220} holdMs={2500} color="var(--color-brand-black)" />
            </div>

            {/* 버튼 */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setRequestOpen(true)}
                className="rounded-xl border-2 border-brand-black px-8 py-4 text-base font-bold text-brand-black transition-colors duration-300 hover:bg-brand-black hover:text-white cursor-pointer"
              >
                견적 요청하기
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <RequestModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </>
  );
}
