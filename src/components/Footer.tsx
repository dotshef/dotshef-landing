export default function Footer() {
  return (
    <footer className="bg-brand-black px-6 py-12 text-white">
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
          <strong>주소:</strong> 경기도 성남시 수정구 창업로 43, 업무동 1층 61호
        </p>
      </div>
    </footer>
  );
}
