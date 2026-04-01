# just-do-today 프로젝트 가이드

## 기본 규칙
- 항상 한국어로 응답
- 코드 수정은 채팅에서 명시적으로 허락 받은 뒤에만 수행
- 요청한 것만 수정 (과도한 리팩토링, 불필요한 기능 추가 금지)

## 프로젝트 구조
- **클라이언트**: `/client/vite-project/` (React + TypeScript + Vite + Tailwind CSS)
- **서버**: `/server/` (Spring Boot + MyBatis + MySQL)
- 프론트엔드 개발자가 백엔드도 로컬에서 함께 운영하는 풀스택 환경

## 실행 환경
- 클라이언트: `localhost:5173` (`npm run dev`)
- 서버: `localhost:8080` (Spring Boot)
- DB: MySQL 로컬 `just_do_today` (root / 1440)
- 클라이언트 `.env`: `VITE_API_BASE_URL=http://localhost:8080`

## 프론트엔드 가이드
- **패턴**: rafce, TypeScript strict, Tailwind CSS 스타일링
- **가독성**: 매직 넘버는 상수로, 복잡한 조건은 이름 붙인 변수로, 중첩 삼항은 if/IIFE로, 역할이 다른 UI는 컴포넌트 분리
- **예측 가능성**: 비슷한 함수는 동일한 반환 타입, SRP 준수, 네이밍은 구체적으로
- **응집**: 폼 검증은 요구에 맞게, 디렉터리는 기능/도메인 단위, 상수는 관련 로직 근처에
- **결합**: 성급한 추상화 지양, 상태는 필요한 훅/컨텍스트로만, props drilling 대신 컴포지션
- **주석**: 파일/컴포넌트 최상단 책임 요약(1~2줄), 핵심 기능 블록 시작 전 1줄 기능 주석, 복잡한 조건은 "왜(의도/정책)" 중심, 자명한 라인-by-라인 주석 금지

## 백엔드 가이드
- **가독성**: 매직 넘버/문자열은 상수로, 긴 Service 메서드는 private으로 쪼개기, 조건문은 의도가 드러나게
- **예측 가능성**: API 응답/에러 형식 통일, DTO 기준으로 계약 고정, 트랜잭션 경계는 Service에만
- **응집**: Controller는 HTTP만, Service는 비즈니스/트랜잭션, Mapper는 SQL만. Flyway는 "새 버전 추가" 원칙
- **결합**: 프론트와의 계약은 DTO/Swagger로만, DB 변경 시 영향 범위(INSERT/SELECT/resultMap/DTO) 체크
- **주석**: 클래스 최상단 1~2줄 책임 요약, 핵심 블록 시작 전 1줄 기능 주석, 복잡한 조건은 "왜(정책/의도)" 중심, 라인-by-라인 주석 금지

## 클라이언트 파일 구조 (`src/`)

### 진입점
- `main.tsx` — 앱 진입점
- `App.tsx` — 라우터 설정 (현재 루트 `/`는 임시 테스트 페이지)
- `index.css` — 전역 스타일 (react-calendar 커스텀 포함)

### api/
- `client.ts` — axios 인스턴스, JWT 인터셉터
- `habit.ts` — 습관 CRUD, freeze API
- `category.ts` — 유저 카테고리 생성 API
- `onboarding.ts` — 온보딩 완료 API
- `utils.ts` — 요일 매핑 유틸 (한글→서버 숫자)

### types/
- `habitType.ts` — `CreateHabitPayload`, `Habit`, `Frequency`, `Day` 타입

### constants/
- `categories.ts` — `DEFAULT_CATEGORIES` (기본 카테고리 10종, icon 포함)

### auth/
- `SocialSignUp.tsx` — 로그인 페이지 (카카오/구글, SVG 배경)
- `OAuthCallback.tsx` — OAuth 콜백 처리 (토큰 저장 후 리다이렉트)

### layout/
- `Layout.tsx` — 공통 레이아웃 (MainFooter 포함)
- `MainFooter.tsx` — 하단 네비게이션 (홈/습관/소셜/설정)

### pages/

#### home/
- `HomePage.tsx` — 홈 메인 (습관 목록 조회, 얼음 플로우 상태 관리)
- `components/HomeEmpty.tsx` — 습관 없을 때 빈 화면 (GlowEffect 하단)
- `components/EmptyIllustration.tsx` — 빈 화면 일러스트
- `components/homeList/HomeList.tsx` — 습관 목록 렌더링
- `components/homeList/HabitSection.tsx` — 카테고리별 섹션
- `components/homeList/HabitItem.tsx` — 습관 행 (체크/점 버튼)
- `components/homeList/HeaderDate.tsx` — 날짜 헤더
- `components/homeList/StatusBottomSheet.tsx` — 습관 상태 변경 바텀시트 (완료/얼음/삭제)
- `components/homeList/IceDatePickerSheet.tsx` — 얼음 날짜 선택 바텀시트
- `components/homeList/IceConfirmSheet.tsx` — 얼음 최종 확인 바텀시트
- `components/homeList/homeListUtils.ts` — 습관 데이터 카테고리별 그룹핑, 아이콘 매핑
- `components/homeList/index.ts` — 배럴 export

#### habit/
- `CreateHabit.tsx` — 습관 생성 페이지 (이름/색상/카테고리/빈도/알림/공개여부)
- `HabitPage.tsx` — 습관 탭 페이지 (미구현)

#### onboarding/
- `MainPage.tsx` — 온보딩 시작 페이지 (`/main`)
- `components/Onboarding.tsx` — 온보딩 전체 모달 (GlowEffect 상단, step 라우팅)
- `components/Step1.tsx` — 닉네임 입력 + 약관 동의 (1/3)
- `components/Step2.tsx` — 첫 습관 등록 (이름/색상/카테고리) (2/3)
- `components/Step3.tsx` — 빈도/요일 선택 (3/3)
- `components/Step3_5.tsx` — 중간 애니메이션 화면 (2초 자동 이동)
- `components/Step4.tsx` — 목표 입력
- `components/OnboardingStepHeader.tsx` — 뒤로가기 + 단계 표시 헤더

#### social/ & settings/
- `SocialPage.tsx`, `SettingsPage.tsx` — 미구현 탭 페이지

### components/

#### habit/ (습관 생성 관련 공통 컴포넌트)
- `HabitNameField.tsx` — 습관명 입력 + 색상 선택
- `HabitOptionsSection.tsx` — 빈도/요일/알림/공개여부 섹션
- `CategorySelector.tsx` — 카테고리 칩 선택 UI (`CategoryItem` 타입 정의 포함)
- `CategoryAddModal.tsx` — 카테고리 직접 추가 바텀시트 (이모지 24종 피커)
- `MonthlyDatePickerSheet.tsx` — 월간 반복 날짜 선택 바텀시트

#### ui/
- `GlowEffect.tsx` — 온보딩 상단/Empty 하단 글로우 효과 (radial-gradient + blur)
- `toast/Toast.tsx` — 토스트 알림
- `toast/CompletionSnackbar.tsx` — 완료 스낵바

#### 기타 공통
- `ColorPalette.tsx` — 색상 선택 팔레트
- `DragHandle.tsx` — 바텀시트 드래그 핸들
- `Toggle.tsx` — 토글 스위치

### assets/
- `backGround.svg`, `kakaoLogin.svg` — 로그인 페이지 SVG
- `Start.png` — Step3_5 애니메이션 화면 이미지
- `emptyImage.png` — EmptyIllustration 컴포넌트 이미지
- `buttons/` — 홈 화면 버튼 이미지 (체크/점/하트/얼음/플러스)
- `bottomSheet/` — 바텀시트 이미지
- `mainFooter/` — 하단 네비 아이콘 (BlueIcon/basicIcon)
- `snackbar/` — 완료 스낵바 아이콘

---

## 주요 파일 경로 (빠른 참조)
- 습관 API: `src/api/habit.ts`
- 습관 타입: `src/types/habitType.ts`
- 카테고리 상수: `src/constants/categories.ts`
- 홈 상태 관리: `src/pages/home/HomePage.tsx`
- 홈 리스트 유틸: `src/pages/home/components/homeList/homeListUtils.ts`
- 습관 생성: `src/pages/habit/CreateHabit.tsx`
- 온보딩 진입: `src/pages/onboarding/MainPage.tsx`

## 역할 분담
- **클라이언트 (프론트엔드)**: 이수환 — React + TypeScript 담당
- **서버 (백엔드)**: 별도 담당자 — Spring Boot 담당

## 알아둘 것
- `UserHabitStatus` enum: DB에 `"active"/"freeze"` (소문자)로 저장 → `UserHabitStatusTypeHandler`로 매핑 처리
- 카테고리 ID: DB의 category 테이블 ID와 `DEFAULT_CATEGORIES`의 id 필드가 매핑됨 (1~11)
- 유저 카테고리 이모지: 서버 응답에 `categoryIcon` 미포함 → 추후 `Habit` 타입에 추가 필요
- `homeListUtils.ts`의 `FALLBACK_CATEGORY_ICON = '📌'` → 유저 카테고리는 항상 📌로 표시 (서버 수정 후 해결 예정)
- 현재 memberId는 JWT 인증으로 서버에서 추출 (소셜 로그인 완료 후)
