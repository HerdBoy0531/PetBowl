# 🐾 PetBowl

반려동물 사료 검색 및 비교 플랫폼

## 📌 프로젝트 소개

PetBowl은 반려동물 보호자들이 다양한 사료 정보를 쉽고 빠르게 비교할 수 있도록 개발한 사료 검색 및 비교 플랫폼입니다.

기존에는 사료 정보를 확인하기 위해 여러 쇼핑몰과 제조사 사이트를 직접 방문해야 하는 불편함이 있었습니다.

또한 영양성분, 원재료, 주단백질, 알레르기 정보 등을 한눈에 비교하기 어려운 문제가 존재했습니다.

PetBowl은 이러한 문제를 해결하기 위해 사료 정보를 통합하여 제공하고, 다양한 검색 조건과 비교 기능을 통해 보호자들이 보다 합리적인 선택을 할 수 있도록 지원합니다.

---

## 🚀 주요 기능

### 1. 사료 검색

* 사료명 및 제조사 검색
* 반려동물 종류 필터링
* 생애주기 필터링
* 주단백질 필터링
* 알레르기 조건 필터링
* 인증 정보 필터링
* 인기순, 이름순, 가격순 정렬

### 2. 사료 상세 조회

* 영양성분 정보 확인
* 원재료 정보 확인
* 주단백질 정보 확인
* 알레르기 정보 확인
* 인증 정보 확인

### 3. 사료 비교

* 최대 2개 사료 비교
* 영양성분 비교
* 주단백질 비교
* 생애주기 비교
* 알레르기 및 인증 정보 비교

### 4. 요청사항 게시판

* 신규 사료 추가 요청
* 서비스 개선 요청
* 요청 상태 확인
* 관리자 처리 현황 확인

### 5. 회원 기능

* Google OAuth 로그인
* 마이페이지
* 내가 작성한 요청사항 조회

---

## 🛠 기술 스택

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Zustand
* Framer Motion

### Backend

* Node.js
* Next.js API Routes
* NextAuth.js
* Prisma ORM

### Database

* PostgreSQL
* Neon

### Deployment

* Vercel

### Authentication
* Google OAuth 2.0
* NextAuth.js

---

## 🗄 ERD
### FOOD
![alt text](image-9.png)

### USER
![alt text](image-10.png)

---

## 📂 프로젝트 구조

```bash
PetBowl
├── app
│   ├── api                # API Routes
│   ├── compare            # 사료 비교 페이지
│   ├── foods              # 사료 상세 페이지
│   ├── login              # 로그인
│   ├── mypage             # 마이페이지
│   ├── nutrients          # 영양성분 정보
│   ├── privacy            # 개인정보처리방침
│   ├── register           # 회원가입
│   ├── request            # 요청사항 게시판
│   ├── search             # 사료 검색
│   ├── terms              # 이용약관
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   ├── atoms             # 최소 단위 UI 컴포넌트
│   ├── molecules         # 조합 컴포넌트
│   ├── organisms         # 화면 단위 컴포넌트
│   └── providers         # SessionProvider
│
├── prisma
│   ├── migrations        # DB Migration
│   ├── seeds             # Seed Data
│   ├── schema.prisma
│   └── seed.ts
│
├── public                # 정적 파일
│
├── store
│   └── useCompareStore.ts # 비교 바구니 상태 관리
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📸 서비스 화면

### 메인 페이지
![alt text](image.png)
![alt text](image-1.png)

### 사료 검색 페이지
![alt text](image-2.png)

### 사료 상세 페이지
![alt text](image-3.png)
![alt text](image-4.png)

### 사료 비교 페이지
![alt text](image-6.png)
![alt text](image-5.png)

### 요청사항 페이지
![alt text](image-7.png)

### 마이페이지
![alt text](image-8.png)

---

## ⚡ 트러블 슈팅

### Prisma + PostgreSQL 배포 이슈

Vercel 환경에서 Prisma Client가 정상적으로 생성되지 않아 배포에 실패하는 문제가 발생했습니다.

이를 해결하기 위해 build 과정에서 Prisma Client를 생성하도록 설정하여 정상적으로 배포를 완료했습니다.

### Google OAuth 로그인 연동

Google Cloud Console과 Vercel 환경변수 설정 과정에서 Redirect URI 문제를 해결하며 OAuth 로그인을 구현했습니다.

### 모바일 반응형 대응

비교 페이지와 요청사항 페이지에서 작은 화면에서 레이아웃이 깨지는 문제가 발생했습니다.

Tailwind CSS의 반응형 유틸리티를 활용하여 모바일 환경에서도 안정적으로 동작하도록 개선했습니다.

---

## 🌱 향후 계획

### MVP 2

* AI 기반 사료 추천 기능
* 커뮤니티 기능
* 인기 사료 랭킹
* 사용자 행동 분석(GA4, Microsoft Clarity)
* 조회수 기반 통계 제공

---

## 🧑‍💻 실행 방법

```bash
git clone <repository-url>

npm install

npx prisma generate

npx prisma migrate deploy

npm run dev
```

---

## 🔗 배포 주소

https://pet-bowl-qyx3.vercel.app

---

## 💭 개발자 코멘트

안녕하세요 개발자 HerdBoy입니다.

반려동물을 키우는 보호자 입장에서 사료를 선택할 때 가장 어려웠던 점은 여러 사이트에 흩어져 있는 정보를 직접 비교해야 한다는 점이었습니다.

사료의 영양성분, 원재료, 주단백질, 알레르기 정보 등을 확인하기 위해 제조사 사이트와 쇼핑몰을 반복해서 방문해야 했고, 두 제품을 객관적으로 비교하는 과정도 쉽지 않았습니다.

PetBowl은 이러한 불편함을 해결하기 위해 시작한 프로젝트입니다.

단순히 사료 정보를 나열하는 것이 아니라, 보호자가 실제로 비교하고 선택하는 과정에 집중하여 검색, 필터링, 비교 기능을 중심으로 MVP를 설계하였습니다.

개발 과정에서는 기능 구현뿐만 아니라 실제 서비스 운영 경험을 얻는 것을 목표로 하였습니다. 따라서 Prisma ORM과 PostgreSQL을 활용한 데이터 설계, Google OAuth 로그인, Vercel 배포, Neon 데이터베이스 연동까지 직접 구축하며 서비스 개발의 전 과정을 경험하였습니다.

현재는 MVP 1차 버전을 완성하여 알파 테스트를 진행하고 있으며, 사용자 피드백을 기반으로 AI 추천 기능과 커뮤니티 기능을 포함한 MVP 2차 개발을 계획하고 있습니다.

앞으로도 반려동물 보호자들이 보다 쉽고 객관적으로 사료를 선택할 수 있는 서비스를 만드는 것을 목표로 지속적으로 개선해 나갈 예정입니다.

자세한 개발 과정은 아래 블로그를 참고해주세요!!
https://herdboyofcode.tistory.com/category/Projects
