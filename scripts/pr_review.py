import os
import sys
import requests
import base64

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
REPO = os.environ.get("GITHUB_REPOSITORY")
PR_NUMBER = os.environ.get("PR_NUMBER")

GITHUB_API = "https://api.github.com"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent"

HEADERS_GH = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json",
}

REVIEW_SYSTEM_PROMPT = """
당신은 "작심(ZAKSIM)" 프로젝트의 Spring Boot 백엔드 코드 리뷰 전문가입니다.
습관 형성 앱의 서버 코드를 주니어 개발자가 학습 목적으로 리뷰 요청했습니다.
각 파일마다 "diff"와 "현재 파일 전체 내용"이 함께 제공됩니다.
반드시 diff가 아닌 현재 파일 전체 내용을 기준으로 리뷰하세요. (이미 고친 부분을 지적하지 않도록 주의)

## 프로젝트 컨텍스트
- 습관 형성 앱 백엔드. 습관 생성/매일 체크, 연속 달성 시 보상(하트/얼음)
- 기술 스택: Spring Boot 3.3.1 / Java 21 / MyBatis 3.0.5 (JPA 아님, 어노테이션 + XML 매퍼 혼용) / MySQL + Flyway / Spring Security OAuth2(카카오·구글) + JWT(jjwt 0.11.5)
- 패키지: controller / service / mapper / domain / dto / global(exception, security)
- 주요 도메인: 인증, 습관 CRUD, 습관 상태(done/heart/thaw/freeze), 카테고리(공용+사용자별 2단), 온보딩, 데일리로그, 웹푸시

## 리뷰 시 체크 포인트 (이 프로젝트의 규칙)
1. 계층 책임 분리: Controller는 HTTP만, Service에 비즈니스 로직 + @Transactional 경계, Mapper는 SQL만. 조회 전용은 @Transactional(readOnly = true)
2. 소유권 체크 패턴: 수정/삭제 전 반드시 null 체크 → memberId 일치 확인 후 IllegalArgumentException(한국어 메시지)
3. 예외 처리: GlobalExceptionHandler(@RestControllerAdvice)가 {"message": "..."} 형태로 통일 응답. IllegalArgumentException/IllegalStateException→400, MemberNotFoundException→404. 커스텀 예외(NotEnoughHeartsException, NotEnoughFreezesException)는 @ResponseStatus. 스택 트레이스 노출 금지
4. DTO 계약: 도메인 객체를 Controller에 직접 노출 금지. 요청 DTO에 Bean Validation(@NotBlank, @NotNull) + Controller에서 @Valid
5. MyBatis 보안: 사용자 입력은 반드시 #{} 바인딩 (${} 금지 — SQL Injection)
6. Secrets: 하드코딩 금지, .env/환경변수(@Value)로 관리
7. 가독성: 매직 넘버는 상수(private static final), 긴 Service 메서드는 private 메서드로 분리, 주석은 "왜" 중심
8. 중복 생성 방지: upsert 전 존재 여부 조회 후 분기 (예: getOrCreateCategoryUser)
9. N+1 방지: 목록 조회 시 IN 절로 일괄 조회 후 Java에서 그룹핑
10. 문자열 입력 정규화: 이름류 입력은 trim() 후 사용 (중복 체크 정확성)

## 알아둘 특이사항
- UserHabitStatus는 DB에 소문자("active"/"freeze")로 저장 → TypeHandler 매핑
- Mapper는 어노테이션(@Select)과 XML 매퍼 혼재 — 둘 다 리뷰 대상
- 테스트 코드가 거의 없는 상태라 로직 정확성 검증이 더 중요

## 리뷰 형식
- 각 이슈마다 [심각도: 높음/중간/낮음] 태그
- 위 체크 포인트 위반 시 몇 번 규칙인지 함께 언급
- 왜 문제인지 + 어떻게 고치는지 (필요시 예시 코드)
- 잘 작성된 부분도 언급 (칭찬도 중요!)
- 마지막에 전체 요약 한 줄

Java/Spring Boot 외 파일(TypeScript 등)은 간략하게만.
리뷰할 내용이 없으면 "리뷰할 변경사항이 없습니다." 라고만 답하세요.
""".strip()


def get_file_content(filename, ref):
    """특정 브랜치의 파일 전체 내용 가져오기"""
    url = f"{GITHUB_API}/repos/{REPO}/contents/{filename}?ref={ref}"
    res = requests.get(url, headers=HEADERS_GH)
    if not res.ok:
        return None
    data = res.json()
    if data.get("encoding") == "base64":
        return base64.b64decode(data["content"]).decode("utf-8", errors="replace")
    return None


def get_pr_files(head_ref):
    """PR의 변경 파일 목록 + diff + 현재 전체 내용 가져오기"""
    url = f"{GITHUB_API}/repos/{REPO}/pulls/{PR_NUMBER}/files"
    res = requests.get(url, headers=HEADERS_GH)
    res.raise_for_status()
    files = res.json()

    result = ""
    total_len = 0
    MAX_TOTAL = 12000  # 전체 내용도 넘기니까 한도 넉넉하게

    for f in files:
        filename = f["filename"]
        status = f["status"]
        patch = f.get("patch", "")

        if not patch:
            continue

        # diff 부분
        if len(patch) > 1500:
            patch = patch[:1500] + "\n... (diff 일부 생략)"

        chunk = f"\n---\n### [{status}] {filename}\n"
        chunk += f"**[diff]**\n```\n{patch}\n```\n"

        # 삭제된 파일이 아니면 현재 전체 내용 추가
        if status != "removed":
            content = get_file_content(filename, head_ref)
            if content:
                if len(content) > 3000:
                    content = content[:3000] + "\n... (파일 일부 생략)"
                chunk += f"\n**[현재 파일 전체 내용]**\n```java\n{content}\n```\n"

        if total_len + len(chunk) > MAX_TOTAL:
            result += "\n... (이후 파일 생략: 변경사항이 너무 많습니다)"
            break

        result += chunk
        total_len += len(chunk)

    return result


def get_pr_info():
    """PR 제목, 브랜치 등 기본 정보"""
    url = f"{GITHUB_API}/repos/{REPO}/pulls/{PR_NUMBER}"
    res = requests.get(url, headers=HEADERS_GH)
    res.raise_for_status()
    data = res.json()
    return {
        "title": data["title"],
        "body": data.get("body", ""),
        "head": data["head"]["ref"],
        "base": data["base"]["ref"],
    }


def call_gemini(files_text, pr_info):
    """Gemini API 호출해서 리뷰 받기"""
    full_prompt = f"""{REVIEW_SYSTEM_PROMPT}

PR 제목: {pr_info['title']}
브랜치: {pr_info['head']} → {pr_info['base']}
PR 설명: {pr_info['body'] or '없음'}

--- 변경된 파일 ---
{files_text}
"""

    payload = {
        "contents": [
            {
                "parts": [{"text": full_prompt}]
            }
        ],
        "generationConfig": {
            "maxOutputTokens": 2000,
            "temperature": 0.3,
        }
    }

    res = requests.post(
        f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
        headers={"Content-Type": "application/json"},
        json=payload,
    )
    if not res.ok:
        print(f"❌ Gemini API 에러 {res.status_code}: {res.text}")
    res.raise_for_status()

    data = res.json()
    return data["candidates"][0]["content"]["parts"][0]["text"]


def post_pr_comment(review_text):
    """PR에 코멘트 달기"""
    url = f"{GITHUB_API}/repos/{REPO}/issues/{PR_NUMBER}/comments"
    body = f"## 🤖 AI 코드 리뷰\n\n{review_text}\n\n---\n*Powered by Gemini 2.5 Flash Lite*"
    res = requests.post(url, headers=HEADERS_GH, json={"body": body})
    res.raise_for_status()
    print(f"✅ 코멘트 작성 완료: {res.json()['html_url']}")


def main():
    print(f"🔍 PR #{PR_NUMBER} 리뷰 시작...")

    if not all([GEMINI_API_KEY, GITHUB_TOKEN, REPO, PR_NUMBER]):
        print("❌ 환경변수 누락. GEMINI_API_KEY, GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER 확인")
        sys.exit(1)

    pr_info = get_pr_info()
    print(f"📋 PR: {pr_info['title']} ({pr_info['head']} → {pr_info['base']})")

    files_text = get_pr_files(pr_info["head"])
    if not files_text.strip():
        print("ℹ️ 변경된 파일 없음. 종료.")
        return

    print("🧠 Gemini에게 리뷰 요청 중...")
    review = call_gemini(files_text, pr_info)

    print("💬 GitHub PR에 코멘트 작성 중...")
    post_pr_comment(review)

    print("🎉 완료!")


if __name__ == "__main__":
    main()
