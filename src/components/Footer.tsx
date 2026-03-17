export default function Footer() {
  return (
    <footer className="bg-brand-black px-6 py-12 text-white/70">
      <div className="mx-auto max-w-7xl space-y-1 text-center text-sm leading-relaxed">
        <p>
          <strong className="text-white">상호:</strong> 닷셰프
        </p>
        <p>
          <strong className="text-white">대표:</strong> 박시준
        </p>
        <p>
          <strong className="text-white">사업자등록번호:</strong> 251-12-03141
        </p>
        <p>
          <strong className="text-white">이메일:</strong>{" "}
          <a
            href="mailto:contact@dotshef.com"
            className="text-brand-yellow underline underline-offset-2"
          >
            contact@dotshef.com
          </a>
        </p>
        <p>
          <strong className="text-white">주소:</strong> 서울특별시 영등포구 영등포로 150, 지하1층
          가라지 204호
        </p>
      </div>
    </footer>
  );
}
