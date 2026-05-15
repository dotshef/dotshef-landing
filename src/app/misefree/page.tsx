import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "미세프리 — 광고 없는 미세먼지 앱 | 닷셰프",
  description:
    "한국환경공단 에어코리아 공식 데이터로, 지금 내 자리의 대기질을 3초 안에. 광고 없는 미세먼지 앱 미세프리.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://dotshef.com/misefree" },
};

const GOOGLE_PLAY_URL = "#";

const DIFFERENTIATORS = [
  {
    accent: "#D94A56",
    label: "광고 0개",
    title: "광고 없음, 영구 무료",
    body: "광고 제거 결제도 없습니다. 후원으로 운영하지만, 후원하지 않아도 모든 기능을 동일하게 쓸 수 있습니다.",
  },
  {
    accent: "#E89B3C",
    label: "공식 데이터",
    title: "공식 데이터 그대로",
    body: "한국환경공단 에어코리아의 공식 측정값을 그대로 보여줍니다. 관측소 이름과 갱신 시각을 화면 하단에 명시해, 데이터의 신선도를 직접 확인할 수 있습니다.",
  },
  {
    accent: "#4FAE7E",
    label: "3초 컷",
    title: "색과 표정으로 말합니다",
    body: "좋음, 보통, 나쁨, 매우나쁨에 따라 화면 그라데이션이 통째로 바뀝니다.",
  },
  {
    accent: "#3B7DCC",
    label: "홈 화면 위젯",
    title: "앱을 열지 않아도",
    body: "홈 화면 위젯이 15분마다 자동 갱신됩니다. 외출 직전, 창문을 열기 직전, 한 번 보는 것으로 충분합니다.",
  },
];

export default function MisefreePage() {
  return (
    <>
      <Header />

      <main className="relative bg-gradient-to-br from-[#1F4E96] via-[#3B7DCC] to-[#4FAE7E]">
        {/* Hero — download CTA + widget mockup */}
        <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),transparent_55%)]"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-12 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl">
                미세프리
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-2xl font-semibold">
                광고없는 미세먼지 앱
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                한국환경공단 에어코리아 공식 데이터로,
                <br className="hidden sm:block" />
                {" "}지금 내 위치의 대기질을 3초 안에.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href={GOOGLE_PLAY_URL}
                  className="inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-lg font-bold text-brand-black shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Image
                    src="/image/google_play_simbol.png"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  다운로드
                </a>
              </div>
            </div>

            <MisefreeImageBox />
          </div>
        </section>

        {/* Differentiators — 2x2 cards */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-12">

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-16">

            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
              {DIFFERENTIATORS.map((item) => (
                // 카드 크기 단일 노브 — wrapper의 `text-base sm:text-lg` 한 줄이
                // 내부 패딩·간격·글자 크기를 모두 em 비례로 결정합니다.
                // 더 크게: text-lg sm:text-xl / 더 작게: text-sm sm:text-base
                <div
                  key={item.title}
                  className="flex flex-col gap-[1.25em] rounded-2xl border border-white/40 bg-white p-[2.5em] text-base leading-relaxed text-gray-700 shadow-xl sm:text-lg"
                >
                  <span
                    className="w-fit rounded-full px-[1.1em] py-[0.4em] text-[0.85em] font-bold tracking-wide text-white"
                    style={{ backgroundColor: item.accent }}
                  >
                    {item.label}
                  </span>
                  <h3 className="text-[1.9em] font-extrabold leading-tight text-brand-black">
                    {item.title}
                  </h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Maker / sponsorship + final CTA */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-12">
          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-12 text-center">
            <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
              외출하기 전 1초가 <br/>
              광고로 낭비되지 않도록
            </h2>

            <p className="max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              미세프리는 자발적 후원으로 운영됩니다. <br/>
              후원 여부와 무관하게 모든 기능을 동일하게 사용할 수 있습니다.
            </p>

            <a
              href={GOOGLE_PLAY_URL}
              className="inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-lg font-bold text-brand-black shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Image
                src="/image/google_play_simbol.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              다운로드
            </a>

            <Link
              href="/misefree/privacy"
              className="text-sm text-white/70 underline underline-offset-4 hover:text-white"
            >
              개인정보 처리방침
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const GRADE_IMAGES = [
  { src: "/image/misefree/blue.jpg", alt: "좋음 등급 화면 미리보기" },
  { src: "/image/misefree/green.jpg", alt: "보통 등급 화면 미리보기" },
  { src: "/image/misefree/yellow.jpg", alt: "나쁨 등급 화면 미리보기" },
  { src: "/image/misefree/red.jpg", alt: "매우 나쁨 등급 화면 미리보기" },
];

function MisefreeImageBox() {
  return (
    <div className="grid w-full max-w-[520px] shrink-0 grid-cols-2 gap-4 sm:gap-5">
      {GRADE_IMAGES.map((item, i) => (
        <Image
          key={item.src}
          src={item.src}
          alt={item.alt}
          width={1080}
          height={819}
          priority={i === 0}
          className="w-full shadow-xl"
        />
      ))}
    </div>
  );
}


