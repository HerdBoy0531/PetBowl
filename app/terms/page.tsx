"use client";

export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6 space-y-10 animate-fade-in text-zinc-800">
      
      {/* 타이틀 헤더 */}
      <header className="border-b border-zinc-100 pb-6 space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
          PetBowl 서비스 이용약관
        </h1>
        <p className="text-xs text-zinc-400 font-light font-mono">
          시행일자: 2026년 05월 18일
        </p>
      </header>

      {/* 약관 본문 랙 */}
      <div className="space-y-8 text-sm leading-relaxed font-light text-zinc-600">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-950">제 1 조 (목적)</h2>
          <p>
            본 약관은 반려동물 사료 영양성분 분석 플랫폼 &ldquo;PetBowl&rdquo;(이하 &ldquo;서비스&rdquo;)이 제공하는 정보 서비스 및 관련 제반 기능의 이용과 관련하여, 서비스와 회원(이하 &ldquo;이용자&rdquo;) 간의 권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-950">제 2 조 (용어의 정의)</h2>
          <p>1. &ldquo;서비스&rdquo;라 함은 PetBowl이 웹사이트를 통해 이용자에게 제공하는 사료 검색, 데이터 대조, 영양 성분 가이드라인 등의 시스템 일체를 의미합니다.</p>
          <p>2. &ldquo;이용자&rdquo;라 함은 본 약관에 동적 동의하고 서비스를 이용하는 회원 및 비회원을 포함합니다.</p>
        </section>

        {/* 🛡️ 핵심 방어 메커니즘 구획 (개발자 독점 보호막) */}
        <section className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 md:p-6 space-y-3 shadow-inner">
          <h2 className="text-base font-bold text-zinc-950 flex items-center gap-2">
            <span>🚨</span> 제 3 조 (영양 성분 정보의 한계 및 면책고지)
          </h2>
          <div className="space-y-2.5 text-zinc-700 font-normal text-xs md:text-sm">
            <p className="text-red-600 font-semibold">
              1. 본 서비스가 제공하는 모든 사료의 영양 성분 수치, 제조사 정보, 원원료 명세 등은 사료 제조사가 공개한 라벨 또는 공인 기관의 표준 공개 데이터를 바탕으로 수집된 참고용 데이터입니다.
            </p>
            <p>
              2. 데이터베이스 수집 및 가공 공정상 수치의 미세한 오타, 제조사의 일방적인 배합 성분 변경 등으로 인해 실제 판매 제품의 현황과 일시적인 데이터 불일치가 발생할 수 있으며, 서비스는 데이터의 100% 완전성이나 무결성을 보장하지 않습니다.
            </p>
            <p className="text-zinc-900 font-semibold">
              3. PetBowl이 제공하는 영양학적 분석 및 AAFCO 기준 프로필 가이드는 전문 수의학적 진단이나 처방을 대신할 수 없습니다. 개별 반려동물의 연령, 기저질환, 알레르기 유무 등에 따라 실제 급여 결과는 상이할 수 있습니다.
            </p>
            <p className="text-red-600 font-semibold underline underline-offset-4">
              4. 이용자가 본 서비스의 비교/검색 데이터를 신뢰하여 발생한 급여 선택의 결과, 반려동물의 질병 발생, 기타 어떠한 직접·간접적 손해에 대해서도 PetBowl 및 개발자는 법적·형사적 책임을 지지 않으며, 모든 급여 최종 판단의 책임은 이용자 본인에게 있습니다.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-950">제 4 조 (이용자의 의무)</h2>
          <p>1. 이용자는 사료 성분 추가 등의 요청사항을 게시판에 등록할 때, 허위 사실이나 비방성 문구를 작성해서는 안 됩니다.</p>
          <p>2. 서비스의 시스템 취약점을 탐색하거나 개발자 도구(F12) 등을 활용해 고의로 서버 데이터를 조작 및 훼손하는 행위를 금지합니다.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-950">제 5 조 (서비스의 중단 및 개정)</h2>
          <p>1. 서비스는 서버 점검, 인프라 이식 등 기술적 사유가 발생할 경우 사전에 고지한 후 서비스 제공을 일시 중단할 수 있습니다.</p>
          <p>2. 약관이 개정될 경우 최소 7일 전 메인 화면 혹은 푸터를 통해 공지합니다.</p>
        </section>

        <section className="pt-6 text-center text-xs text-zinc-400 font-light">
          🥣 본 약관에 동의하지 않으실 경우 일부 연동 회원 서비스의 이용이 제한될 수 있습니다.
        </section>

      </div>
    </div>
  );
}