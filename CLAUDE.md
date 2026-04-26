# just-do-today

## 기본 규칙
- 항상 한국어로 응답
- 코드 수정은 명시적으로 허락 받은 뒤에만 수행
- 요청한 것만 수정 (과도한 리팩토링, 불필요한 기능 추가 금지)

## 프로젝트 구조
- **클라이언트**: `client/vite-project/` — React + TypeScript + Vite + Tailwind CSS
- **서버**: `server/` — Spring Boot + MyBatis + MySQL

## 실행 환경
- 클라이언트: `localhost:5173` (`npm run dev`)
- 서버: `localhost:8080` (Spring Boot)
- DB: MySQL 로컬 `just_do_today` (root / 1440)
- 클라이언트 `.env`: `VITE_API_BASE_URL=http://localhost:8080`

## 역할 분담
- **클라이언트**: 팀원 담당
- **서버**: 이수환 — Spring Boot + MyBatis + MySQL (2026-04-12~)

## 현재 미구현
- `HabitPage.tsx` — 습관 탭
- `SocialPage.tsx` — 소셜 탭
- `SettingsPage.tsx` — 설정 탭
- 유저 카테고리 아이콘 서버 응답 미포함 → 항상 📌 표시

## 알아둘 것 (Gotchas)
- `UserHabitStatus` enum: DB에 `"active"/"freeze"` 소문자 저장 → `UserHabitStatusTypeHandler`로 매핑
- 카테고리 ID: DB `category` 테이블 ID = `DEFAULT_CATEGORIES`의 `id` 필드 (1~11)
- `homeListUtils.ts`의 `FALLBACK_CATEGORY_ICON = '📌'` → 서버에서 `categoryIcon` 응답 추가 후 해결 예정
- memberId: JWT 인증으로 서버에서 추출

## 빠른 파일 참조
- 습관 API: `src/api/habit.ts`
- 홈 상태 관리: `src/pages/home/HomePage.tsx`
- 습관 생성: `src/pages/habit/CreateHabit.tsx`
- 습관 타입: `src/types/habitType.ts`
- 카테고리 상수: `src/constants/categories.ts`

## 상세 문서 (필요할 때 읽기)
- 서버 전체 파일 구조: `.claude/docs/server-structure.md`
- 클라이언트 전체 파일 구조: `.claude/docs/client-structure.md`
- 프론트엔드 코딩 가이드: `.claude/rules/frontend-guide.md`
- 백엔드 패턴/보안 규칙: `.claude/rules/java-patterns.md`, `.claude/rules/java-security.md`

## Claude Code 스킬
- `/java-coding-standards` — Java 네이밍/구조/예외처리 기준
- `/springboot-patterns` — Controller/Service/Mapper 계층 설계 패턴
- `/simplify` — 기능 구현 완료 후 코드 품질 검토
