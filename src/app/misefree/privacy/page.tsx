import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "미세프리 개인정보 처리방침 | 닷셰프",
  description:
    "미세프리 앱이 수집하는 개인정보 항목, 이용 목적, 보유 기간 등에 관한 안내입니다.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://dotshef.com/misefree/privacy" },
};

export default function MisefreePrivacyPage() {
  return (
    <>
      <Header />

      <main className="bg-white px-6 pt-28 pb-20 text-brand-black">
        <article className="mx-auto w-full max-w-3xl">
          <header className="mb-12 border-b border-gray-200 pb-8">
            <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              미세프리 개인정보 처리방침
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              미세프리(이하 &ldquo;앱&rdquo;)는 이용자의 개인정보를 중요시하며, 「개인정보
              보호법」 등 관련 법령을 준수하기 위하여 노력하고 있습니다. 본 개인정보
              처리방침은 앱이 제공하는 서비스를 이용함에 있어 수집되는 개인정보의
              항목, 이용 목적, 보유 및 이용 기간 등에 관한 사항을 안내합니다.
            </p>
          </header>

          <section className="space-y-10 text-[15px] leading-relaxed text-gray-800">
            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제1조 수집하는 개인정보 항목 및 수집 방법
              </h2>

              <h3 className="mt-6 text-base font-semibold text-brand-black sm:text-lg">
                1.1 위치 정보
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <strong className="font-semibold">수집 항목</strong>: 위도/경도
                  좌표(GPS 기반)
                </li>
                <li>
                  <strong className="font-semibold">수집 방법</strong>: 이용자가 앱을
                  실행하고 위치 권한을 허용한 경우, 단말기에서 직접 수집
                </li>
                <li>
                  <strong className="font-semibold">수집 시점</strong>: 대기질 정보
                  조회 요청 시점에 한해 일시적으로 수집
                </li>
              </ul>

              <h3 className="mt-6 text-base font-semibold text-brand-black sm:text-lg">
                1.2 문의하기 정보
              </h3>
              <p className="mt-2">
                이용자가 앱 내 「문의하기」 기능을 이용할 때 다음 정보를 수집합니다.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <strong className="font-semibold">필수</strong>: 문의 카테고리(버그
                  신고/기능 제안/기타), 문의 본문
                </li>
                <li>
                  <strong className="font-semibold">선택</strong>: 답변 수신용 이메일
                  주소
                </li>
              </ul>

              <h3 className="mt-6 text-base font-semibold text-brand-black sm:text-lg">
                1.3 자동 수집 정보
              </h3>
              <p className="mt-2">
                서비스 제공 과정에서 다음 정보가 자동으로 수집될 수 있습니다.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>앱 버전, 운영체제(OS) 정보 (서버 요청 헤더에 포함)</li>
              </ul>

              <p className="mt-4">
                본 앱은 광고 SDK 및 분석 SDK를 사용하지 않으며, 별도의 사용자
                식별자(광고 ID, 디바이스 ID 등)를 수집하지 않습니다. 또한 이용자의
                행태정보(방문·검색·클릭 등 사용 기록)를 수집·분석하지 않습니다.
              </p>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제2조 개인정보의 이용 목적
              </h2>
              <p className="mt-4">
                수집한 정보는 다음의 목적으로만 이용됩니다.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-y-2 border-brand-black bg-brand-gray-light">
                      <th className="p-3 font-semibold">항목</th>
                      <th className="p-3 font-semibold">이용 목적</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 align-top">위치 정보</td>
                      <td className="p-3 align-top">
                        이용자 현재 위치 인근의 대기질 측정소 데이터 조회
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 align-top">문의 카테고리·본문</td>
                      <td className="p-3 align-top">
                        문의 사항 확인 및 서비스 개선
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 align-top">답변 수신용 이메일</td>
                      <td className="p-3 align-top">문의에 대한 회신</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 align-top">앱 버전·OS 정보</td>
                      <td className="p-3 align-top">
                        호환성 확인, 최소 지원 버전 안내
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제3조 개인정보의 보유 및 이용 기간
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-semibold">위치 정보</strong>: 앱은 위치
                  좌표를 단말기 외부에 저장하지 않으며, 대기질 조회 API 호출 후 즉시
                  폐기됩니다. 미세프리 API 서버(
                  <code className="rounded bg-brand-gray-light px-1.5 py-0.5 font-mono text-[0.9em]">
                    misefree-api.vercel.app
                  </code>
                  )는 단순 중계(프록시) 역할만 수행하며 위치 좌표를 별도로 저장하지
                  않습니다.
                </li>
                <li>
                  <strong className="font-semibold">문의하기 정보</strong>: 문의 처리
                  완료 시점으로부터 최대 1년간 보관 후 파기합니다.
                </li>
                <li>
                  관련 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간
                  동안 보관합니다.
                </li>
              </ul>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제4조 개인정보의 제3자 제공
              </h2>
              <p className="mt-4">
                미세프리는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만,
                서비스 제공을 위해 일부 처리 업무를 외부 사업자에 위탁하고 있으며,
                이에 대한 상세 내용은 제5조에 안내합니다.
              </p>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제5조 개인정보의 처리위탁
              </h2>
              <p className="mt-4">
                미세프리는 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를
                위탁하고 있으며, 「개인정보 보호법」 제26조에 따라 수탁업체가 개인정보를
                안전하게 처리하도록 관리·감독하고 있습니다.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-y-2 border-brand-black bg-brand-gray-light">
                      <th className="p-3 font-semibold">수탁업체</th>
                      <th className="p-3 font-semibold">위탁 업무</th>
                      <th className="p-3 font-semibold">처리 항목</th>
                      <th className="p-3 font-semibold">보유 및 이용 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 align-top">Vercel</td>
                      <td className="p-3 align-top">미세프리 API 서버 호스팅</td>
                      <td className="p-3 align-top">요청 IP, 위치 좌표</td>
                      <td className="p-3 align-top">
                        별도 저장하지 않음 (요청 처리 후 즉시 폐기)
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 align-top">
                        국토교통부 V-World 디지털트윈국토
                      </td>
                      <td className="p-3 align-top">지도 타일 제공</td>
                      <td className="p-3 align-top">이용자 IP, 지도 타일 좌표</td>
                      <td className="p-3 align-top">
                        미세프리 측에 별도 보관하지 않음
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                본 앱은 미세프리 API 서버를 경유하여 한국환경공단 에어코리아
                시스템으로부터 대기질 데이터를 조회합니다. 이 경우 이용자의
                IP·식별정보는 에어코리아에 노출되지 않으며, 위치 좌표만 익명으로
                전달됩니다.
              </p>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제6조 개인정보의 국외이전
              </h2>
              <p className="mt-4">
                미세프리는 안정적인 서비스 제공을 위해 다음과 같이 개인정보를 국외로
                이전(처리위탁)하고 있습니다. 이용자는 본 방침 제11조의 연락처를 통해
                국외 이전을 거부할 수 있으나, 거부 시 앱 서비스 이용이 제한될 수
                있습니다.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-y-2 border-brand-black bg-brand-gray-light">
                      <th className="p-3 font-semibold">이전받는 자</th>
                      <th className="p-3 font-semibold">이전 국가</th>
                      <th className="p-3 font-semibold">이전 항목</th>
                      <th className="p-3 font-semibold">이용 목적</th>
                      <th className="p-3 font-semibold">이전 일시 및 방법</th>
                      <th className="p-3 font-semibold">보유 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 align-top">
                        Vercel (privacy@vercel.com)
                      </td>
                      <td className="p-3 align-top">미국</td>
                      <td className="p-3 align-top">요청 IP, 위치 좌표</td>
                      <td className="p-3 align-top">
                        API 서버 호스팅 및 응답 중계
                      </td>
                      <td className="p-3 align-top">
                        서비스 이용 시 네트워크를 통한 일회성 전송
                      </td>
                      <td className="p-3 align-top">
                        별도 저장하지 않음 (즉시 폐기)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제7조 개인정보의 파기 절차 및 방법
              </h2>
              <p className="mt-4">
                미세프리는 개인정보 보유 기간이 경과하거나 처리 목적이 달성되는 등
                개인정보가 불필요하게 되었을 때 지체 없이 해당 개인정보를 파기합니다.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-semibold">파기 절차</strong>: 파기 사유가
                  발생한 개인정보를 선정하고, 개인정보 보호책임자의 승인을 거쳐
                  파기합니다.
                </li>
                <li>
                  <strong className="font-semibold">파기 방법</strong>: 전자적 파일
                  형태로 저장된 개인정보는 복구·재생할 수 없는 방법으로 영구
                  삭제합니다.
                </li>
              </ul>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제8조 이용자의 권리 및 행사 방법
              </h2>
              <p className="mt-4">
                본 앱은 이용자 계정을 생성하지 않으며, 위치 정보를 서버에 저장하지
                않습니다. 따라서 별도로 열람·정정해야 할 이용자 정보는 존재하지
                않습니다. 이용자는 다음과 같은 방법으로 권리를 행사할 수 있습니다.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-semibold">위치 정보 수집 중단</strong>:
                  단말기의 시스템 설정(또는 앱 설정)에서 위치 권한을 거부하면 즉시
                  수집이 중단됩니다. 다만 이 경우 앱의 기능을 사용할 수 없습니다.
                </li>
                <li>
                  <strong className="font-semibold">문의 내역 삭제 요청</strong>:
                  「문의하기」 기능을 통해 본인이 전송한 내용(이메일·본문)에 대해 본
                  방침 제11조의 연락처로 삭제를 요청할 수 있으며, 본인 확인 후 지체
                  없이 파기합니다.
                </li>
              </ul>
              <p className="mt-4">
                이용자의 권리 행사 시 미세프리는 요청자가 본인이거나 정당한 대리인인지
                확인합니다. 대리인을 통한 권리 행사 시에는 위임 사실을 증명할 수
                있는 서류를 제출하여야 합니다.
              </p>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제9조 개인정보의 안전성 확보 조치
              </h2>
              <p className="mt-4">
                미세프리는 「개인정보 보호법」 제29조에 따라 다음과 같이 안전성 확보에
                필요한 조치를 하고 있습니다.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  모든 외부 통신은 HTTPS(TLS) 암호화 채널을 통해 이루어집니다.
                </li>
                <li>
                  단말기 내부에 수집되는 위치 좌표는 별도 저장소에 영구 저장되지
                  않으며, 메모리 캐시는 일정 시간 후 자동 폐기됩니다.
                </li>
                <li>
                  서버 측에서는 위치 좌표를 저장하지 않고 요청 처리 후 즉시
                  폐기합니다.
                </li>
              </ul>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제10조 개인정보 보호책임자 및 연락처
              </h2>
              <p className="mt-4">
                개인정보 처리에 관한 문의·민원·피해 구제 등은 아래 연락처로 문의해
                주시기 바랍니다.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-semibold">사업자명</strong>: 닷셰프
                </li>
                <li>
                  <strong className="font-semibold">개인정보 보호책임자</strong>:
                  박시준
                </li>
                <li>
                  <strong className="font-semibold">이메일</strong>:{" "}
                  <a
                    href="mailto:contact@dotshef.com"
                    className="underline underline-offset-2"
                  >
                    contact@dotshef.com
                  </a>
                </li>
              </ul>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제11조 권익침해 구제방법
              </h2>
              <p className="mt-4">
                이용자는 개인정보 침해에 대한 피해구제 상담이 필요할 경우 다음 기관에
                문의하실 수 있습니다. 아래 기관은 미세프리와 별개의 독립된 기관이며,
                미세프리의 자체 처리 결과에 만족하지 못하거나 보다 자세한 도움이
                필요한 경우 문의하시기 바랍니다.
              </p>
              <ul className="mt-4 list-disc space-y-3 pl-5">
                <li>
                  <strong className="font-semibold">개인정보침해 신고센터</strong>{" "}
                  (한국인터넷진흥원 운영)
                  <ul className="mt-1 list-[circle] space-y-1 pl-5">
                    <li>
                      홈페이지:{" "}
                      <a
                        href="https://privacy.kisa.or.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        https://privacy.kisa.or.kr
                      </a>
                    </li>
                    <li>전화: (국번 없이) 118</li>
                  </ul>
                </li>
                <li>
                  <strong className="font-semibold">
                    개인정보 분쟁조정위원회
                  </strong>
                  <ul className="mt-1 list-[circle] space-y-1 pl-5">
                    <li>
                      홈페이지:{" "}
                      <a
                        href="https://www.kopico.go.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        https://www.kopico.go.kr
                      </a>
                    </li>
                    <li>전화: (국번 없이) 1833-6972</li>
                  </ul>
                </li>
                <li>
                  <strong className="font-semibold">
                    대검찰청 사이버범죄수사단
                  </strong>
                  <ul className="mt-1 list-[circle] space-y-1 pl-5">
                    <li>
                      홈페이지:{" "}
                      <a
                        href="https://www.spo.go.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        https://www.spo.go.kr
                      </a>
                    </li>
                    <li>전화: (국번 없이) 1301</li>
                  </ul>
                </li>
                <li>
                  <strong className="font-semibold">경찰청 사이버수사국</strong>
                  <ul className="mt-1 list-[circle] space-y-1 pl-5">
                    <li>
                      홈페이지:{" "}
                      <a
                        href="https://ecrm.cyber.go.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        https://ecrm.cyber.go.kr
                      </a>
                    </li>
                    <li>전화: (국번 없이) 182</li>
                  </ul>
                </li>
              </ul>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">
                제13조 개인정보 처리방침의 변경
              </h2>
              <p className="mt-4">
                본 방침은 법령·정책의 변경 또는 서비스 개선에 따라 변경될 수 있으며,
                변경 시 앱 내 공지 또는 본 문서 게시 페이지를 통해 고지합니다.
              </p>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-brand-black sm:text-2xl">부칙</h2>
              <p className="mt-4">
                본 개인정보처리방침 V1.0은 2026년 5월 13일부터 적용됩니다.
              </p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
