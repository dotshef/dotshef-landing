import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";

export const metadata: Metadata = {
  title: "미세프리 — 광고 없는 미세먼지 앱 | 닷셰프",
  description:
    "한국환경공단 에어코리아 공식 데이터로, 지금 내 자리의 대기질을 3초 안에. 광고 없는 미세먼지 앱 미세프리.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://dotshef.com/misefree" },
};

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.dotshef.misefree";

type Feature = {
  title: string;
  description: string;
  image: { src: string; alt: string };
};

const FEATURES: Feature[] = [
  {
    title: "번거로운 광고 그만",
    description:
      "클릭 한 번으로 기다림 없이 미세먼지 현황을 확인하세요",
    image: {
      src: "/image/misefree/mylocation.jpg",
      alt: "내 위치 미세먼지 현황 화면",
    },
  },
  {
    title: "직관적인 UI",
    description: "색상과 표정을 통해 빠르게 알 수 있어요",
    image: {
      src: "/image/misefree/forecast.jpg",
      alt: "일별 미세먼지 예보 화면",
    },
  },
  {
    title: "위젯도 있답니다",
    description: "앱을 열지 않고도 미세먼지 현황을 알 수 있어요",
    image: {
      src: "/image/misefree/widget.jpg",
      alt: "홈 화면 위젯 미리보기",
    },
  },
  {
    title: "전국의 미세먼지 현황이 궁금하신가요",
    description: "위치별 미세먼지 수치도 확인할 수 있어요",
    image: {
      src: "/image/misefree/location.jpg",
      alt: "위치별 미세먼지 현황 지도",
    },
  },
];

const GRADE_IMAGES = [
  { src: "/image/misefree/blue.jpg", alt: "좋음 등급 화면 미리보기" },
  { src: "/image/misefree/green.jpg", alt: "보통 등급 화면 미리보기" },
  { src: "/image/misefree/yellow.jpg", alt: "나쁨 등급 화면 미리보기" },
  { src: "/image/misefree/red.jpg", alt: "매우 나쁨 등급 화면 미리보기" },
];

export default function MisefreePage() {
  return (
    <>
      <Header />
      <main className="bg-[#F7FAFF]">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

function HeroSection() {
  return (
    <section className="flex min-h-dvh items-center px-6 py-32">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-12 md:flex-row md:justify-between">
        <RevealStagger className="text-center md:text-left">
          <Image
            src="/image/misefree/icon.png"
            alt=""
            width={512}
            height={512}
            className="mx-auto h-20 w-20 rounded-2xl shadow-lg md:mx-0 sm:h-24 sm:w-24"
          />
          <h1 className="mt-6 text-5xl font-extrabold text-[#333d4b] sm:text-6xl md:text-7xl">
            미세프리
          </h1>
          <p className="mt-6 text-2xl font-semibold text-[#333d4b] sm:text-3xl">
            광고없는 미세먼지 앱
          </p>
          <p className="mt-6 text-base text-[#333d4b] sm:text-lg">
            한국환경공단 에어코리아 공식 데이터로,
            <br />
            지금 내 위치의 대기질을 3초 안에.
          </p>
          <div className="mt-10 flex justify-center md:justify-start">
            <DownloadButton />
          </div>
        </RevealStagger>
        <GradeImageGrid />
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24">
        {FEATURES.map((item) => (
          <FeatureBlock key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="flex flex-col items-center px-6 py-24 text-center">
      <RevealStagger className="flex flex-col items-center gap-12">
        <h2 className="text-4xl font-extrabold text-[#333d4b] sm:text-5xl md:text-6xl">
          외출하기 전 1초가
          <br />
          광고로 낭비되지 않도록
        </h2>
        <p className="max-w-2xl text-base text-[#333d4b] sm:text-lg">
          미세프리는 자발적 후원으로 운영됩니다.
          <br />
          후원 여부와 무관하게 모든 기능을 동일하게 사용할 수 있습니다.
        </p>
        <DownloadButton />
        <Link
          href="/misefree/privacy"
          className="text-sm text-gray-500 underline hover:text-brand-black"
        >
          개인정보 처리방침
        </Link>
      </RevealStagger>
    </section>
  );
}

function FeatureBlock({ item }: { item: Feature }) {
  return (
    <Reveal
      as="article"
      className="flex flex-col items-center gap-10 text-center"
    >
      <div>
        <h3 className="text-3xl font-extrabold leading-tight text-[#333d4b] sm:text-4xl md:text-5xl">
          {item.title}
        </h3>
        <p className="mt-5 text-xl font-medium leading-relaxed text-[#333d4b] sm:text-2xl">
          {item.description}
        </p>
      </div>
      <div className="w-full max-w-xs md:max-w-sm">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          width={1080}
          height={1920}
          className="w-full rounded-2xl shadow-2xl"
        />
      </div>
    </Reveal>
  );
}

function DownloadButton() {
  return (
    <a
      href={GOOGLE_PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-xl bg-[#3B7DCC] px-7 py-4 text-lg font-bold text-white shadow-lg shadow-[#3B7DCC]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2F6AB8] hover:shadow-xl hover:shadow-[#3B7DCC]/40 active:translate-y-0"
    >
      <Image
        src="/image/google_play_simbol.png"
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 brightness-0 invert"
      />
      다운로드
    </a>
  );
}

function GradeImageGrid() {
  return (
    <RevealStagger
      stagger={0.08}
      delay={0.2}
      className="grid w-full max-w-lg shrink-0 grid-cols-2"
    >
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
    </RevealStagger>
  );
}
