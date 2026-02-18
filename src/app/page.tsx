import Link from "next/link";
import SectionFx from "@/components/SectionFx";
import BlockStack from "@/components/BlockStack";
import GrowthBars from "@/components/GrowthBars";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Product Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-yellow pt-16">
          <SectionFx variant="yellow" />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 md:flex-row md:justify-between">
            <h1 className="text-4xl font-extrabold leading-tight text-brand-black sm:text-5xl md:text-6xl lg:text-7xl">
              당신을 위한
              <br />
              맛있는 소프트웨어
            </h1>
            <BlockStack size={240} />
          </div>
        </section>

        {/* Outsourcing Section */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-black px-6 py-24">
          <SectionFx variant="black" />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16">
            {/* 제목(좌) + GrowthBars(우) */}
            <div className="flex w-full flex-col items-center gap-12 md:flex-row md:justify-center">
              <h1 className="text-4xl font-extrabold leading-tight text-brand-yellow sm:text-5xl md:text-6xl lg:text-7xl">
                당신의 사업에
                <br />
                꼭 필요한 웹서비스
              </h1>
              <GrowthBars width={300} height={220} holdMs={2500} />
            </div>

            {/* 버튼 */}
            <div className="flex gap-4">
              <Link
                href="/estimate"
                className="rounded-xl bg-brand-yellow px-8 py-4 text-base font-bold text-brand-black hover:bg-brand-yellow-light"
              >
                예상 견적 계산
              </Link>
              <Link
                href="/request"
                className="rounded-xl border-2 border-brand-yellow px-8 py-4 text-base font-bold text-brand-yellow transition-all duration-300 hover:bg-brand-yellow hover:text-brand-black"
              >
                견적 요청하기
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
