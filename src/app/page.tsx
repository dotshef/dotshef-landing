"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SectionFx from "@/components/SectionFx";

const GrowthBars3D = dynamic(
  () => import("@/components/growth/GrowthBars3DAnimation"),
  { ssr: false },
);
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";

const PORTFOLIO_ITEMS = [
  { image: "/image/allpass.png", url: "https://allpsn.com", name: "올패스컨설팅그룹" },
  { image: "/image/eterno-yongsan.png", url: "https://www.xn--o80bk5mz7f7tf74a404b.com/", name: "에테르노용산" },
  { image: "/image/once-interior.png", url: "https://www.once-design.com/", name: "원스인테리어" },
  { image: "/image/snc-auto.png", url: "https://www.xn--snc-rh9nm37b.com/", name: "S&C 신차 장기 렌트 리스" },
  { image: "/image/goumfactory.png", url: "https://www.goeumfactory.kr/", name: "고음 팩토리" },
  { image: "/image/exit.png", url: "#", name: "광고 관리 SaaS" },
];

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
              <div className="h-[300px] w-[300px] shrink-0 sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
                <GrowthBars3D width="100%" height="100%" />
              </div>
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

        {/* Portfolio Section */}
        <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-white px-6 py-24">
          <SectionFx variant="white" />

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-16">
            <h1 className="text-4xl font-extrabold leading-tight text-brand-black sm:text-5xl md:text-6xl">
              실제 제작된 웹사이트를 확인해보세요
            </h1>

            <div className="grid w-full max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
              {PORTFOLIO_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden bg-gray-100 p-2"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 text-center text-lg font-semibold text-brand-black">
                    {item.name}
                  </p>
                </a>
              ))}
            </div>

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
