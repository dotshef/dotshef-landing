export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <span className="text-2xl font-extrabold tracking-tight text-brand-yellow">
          Dotshef
        </span>
        <a
          href="mailto:contact@dotshef.com"
          className="border border-brand-yellow px-4 py-2 text-base font-bold text-brand-yellow transition-colors hover:bg-brand-yellow hover:text-brand-black"
        >
          문의하기
        </a>
      </div>
    </header>
  );
}