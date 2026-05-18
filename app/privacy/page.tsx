"use client";

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6 space-y-10 animate-fade-in text-zinc-800">
      
      {/* 타이틀 헤더 */}
      <header className="border-b border-zinc-100 pb-6 space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
          개인정보처리방침
        </h1>
        <p className="text-xs text-zinc-400 font-light font-mono">
          공고일자: 2026년 05월 18일 | 시행일자: 2026년 05월 18일
        </p>
      </header>

      {/* 방침 본문 랙 */}
      <div className="space-y-8 text-sm leading-relaxed font-light text-zinc-600">
        
        <p className="text-zinc-900 font-medium">
          &ldquo;PetBowl&rdquo;은 이용자의 개인정보를 소중하게 생각하며, 개인정보보호법 등 관련 법령을 철저히 준수하고 있습니다. 본 방침을 통해 수집된 소셜 데이터가 어떤 목적으로 안전하게 관리되는지 투명하게 공개합니다.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-950">제 1 조 (개인정보의 처리 목적)</h2>
          <p>서비스는 회원 관리 및 고유 식별을 목적으로 최소한의 개인정보를 처리합니다. 수집된 정보는 회원 식별, 사료 비교함 보관 내역 유지, 요청사항 게시판 이용 권한 확인 외의 용도로는 절대 사용되지 않습니다.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-950">제 2 조 (처리하는 개인정보의 항목)</h2>
          <p>서비스는 NextAuth 연동 구글 소셜 로그인 시점에 인증 어댑터를 통해 아래의 항목을 안전하게 수집합니다.</p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-900 font-medium text-xs md:text-sm">
            <li>[필수] 소셜 계정 고유 식별자 ID, 이메일 주소(Email)</li>
            <li>[선택] 소셜 프로필 이름/닉네임, 프로필 이미지 URL</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-950">제 3 조 (개인정보의 보유 및 파기 기간)</h2>
          <p>1. 이용자의 개인정보는 서비스 회원 탈퇴를 요청하거나 소셜 인증 연동을 해제하는 즉시 데이터베이스(Postgres)에서 완벽하게 파기됩니다.</p>
          <p>2. 장기 미이용자의 경우 관련 법령에 의거하여 휴면 계정 전환 후 별도 격리 보관되거나 안전하게 소멸 처리됩니다.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-950">제 4 조 (개인정보의 제3자 제공 및 위탁)</h2>
          <p>PetBowl은 이용자의 동의 없이 개인정보를 외부에 유료 판매하거나 무단으로 제3자에게 제공하지 않습니다. 단, 사법 기관의 법적 영장 요구나 국가 법령에 따른 의무 제출 명령이 발생한 예외적인 경우는 제외합니다.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-950">제 5 조 (이용자의 권리와 행사방법)</h2>
          <p>이용자는 언제든지 마이페이지를 통해 본인의 개인정보를 조회, 수정할 수 있으며 회원 탈퇴(소셜 파기)를 통해 개인정보 수집 및 이용 동의를 즉시 철회할 권리를 가집니다.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-950">제 6 조 (개인정보의 안전성 확보 조치)</h2>
          <p>서비스는 Prisma 어댑터 및 클라우드 데이터베이스 인프라 보안 정책을 통해 유저 세션 가드를 작동 중이며, 해킹이나 데이터 유출을 막기 위해 전 구간 암호화 통신(HTTPS) 기술을 엄격히 적용하고 있습니다.</p>
        </section>

        <section className="pt-6 text-center text-xs text-zinc-400 font-light">
          🌿 PetBowl은 깨끗하고 안심할 수 있는 오가닉 데이터 보호 문화를 준수합니다.
        </section>

      </div>
    </div>
  );
}