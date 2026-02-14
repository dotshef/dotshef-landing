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
        {/* Section 1 - Yellow */}
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

        {/* Section 2 - Black */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black">
          <SectionFx variant="black" />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 md:flex-row md:justify-between">
            <h1 className="text-4xl font-extrabold leading-tight text-brand-yellow sm:text-5xl md:text-6xl lg:text-7xl">
              당신의 사업에
              <br />
              꼭 필요한 웹서비스
            </h1>
            <GrowthBars width={300} height={220} holdMs={2500} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
