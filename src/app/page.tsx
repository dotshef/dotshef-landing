import SectionFx from "@/components/SectionFx";

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-xl font-extrabold tracking-tight text-brand-yellow">
            Dotshef
          </span>
          <a
            href="mailto:contact@dotshef.com"
            className="border border-brand-yellow px-4 py-2 text-sm font-bold text-brand-yellow transition-colors hover:bg-brand-yellow hover:text-brand-black"
          >
            문의하기
          </a>
        </div>
      </header>

      <main>
        {/* Section 1 - Yellow */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-yellow pt-16">
          <SectionFx variant="yellow" />
          <h1 className="relative z-10 px-6 text-center text-4xl font-extrabold leading-tight text-brand-black sm:text-5xl md:text-6xl lg:text-7xl">
            세상에 필요한
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

      {/* Footer */}
      <footer className="bg-brand-yellow px-6 py-12 text-brand-black">
        <div className="mx-auto max-w-7xl space-y-1 text-center text-sm leading-relaxed">
          <p>
            <strong>상호:</strong> 닷셰프
          </p>
          <p>
            <strong>대표:</strong> 박시준
          </p>
          <p>
            <strong>사업자등록번호:</strong> 251-12-03141
          </p>
          <p>
            <strong>이메일:</strong>{" "}
            <a
              href="mailto:contact@dotshef.com"
              className="underline underline-offset-2"
            >
              contact@dotshef.com
            </a>
          </p>
          <p>
            <strong>주소:</strong> 서울특별시 영등포구 영등포로 150, 지하1층
            가라지 204호
          </p>
        </div>
      </footer>
    </>
  );
}
