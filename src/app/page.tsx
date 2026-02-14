import SectionFx from "@/components/SectionFx";
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
          <h1 className="relative z-10 px-6 text-center text-4xl font-extrabold leading-tight text-brand-black sm:text-5xl md:text-6xl lg:text-7xl">
            당신을 위한
            <br />
            맛있는 소프트웨어
          </h1>
        </section>

        {/* Section 2 - Black */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black">
          <SectionFx variant="black" />
          <h1 className="relative z-10 px-6 text-center text-4xl font-extrabold leading-tight text-brand-yellow sm:text-5xl md:text-6xl lg:text-7xl">
            당신의 사업에
            <br />
            꼭 필요한 웹서비스
          </h1>
        </section>
      </main>

      <Footer />
    </>
  );
}
