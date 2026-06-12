import os
import sys
import requests

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
당신은 Spring Boot / Java 백엔드 코드 리뷰 전문가입니다.
주니어 개발자가 학습 목적으로 리뷰를 요청했습니다.
아래 관점에서 변경된 코드를 분석하고, 한국어로 명확하게 코멘트를 작성해주세요.

리뷰 관점:
1. 코드 품질 (네이밍, 중복, 가독성)
2. 보안 (JWT 처리, SQL injection, 인증/인가 누락)
3. Spring Boot 베스트 프랙티스 (레이어 분리, 예외처리, 트랜잭션)
4. 성능 (N+1 문제, 불필요한 쿼리, 비효율적 로직)
5. 개선 제안 (더 나은 구현 방법이 있다면 예시 코드 포함)

형식:
- 각 이슈마다 [심각도: 높음/중간/낮음] 태그 붙이기
- 구체적인 라인이나 코드 언급
- 왜 문제인지, 어떻게 고치면 되는지 설명
- 잘 작성된 부분도 언급 (칭찬도 중요!)
- 마지막에 전체 요약 한 줄

Java/Spring Boot 외 파일(TypeScript 등)은 간략하게만 언급하세요.
변경사항이 없거나 리뷰할 내용이 없으면 "리뷰할 변경사항이 없습니다." 라고만 답하세요.
""".strip()


def get_pr_diff():
    """PR의 파일 변경 내용 가져오기"""
    url = f"{GITHUB_API}/repos/{REPO}/pulls/{PR_NUMBER}/files"
    res = requests.get(url, headers=HEADERS_GH)
    res.raise_for_status()
    files = res.json()

    diff_text = ""
    total_len = 0
    MAX_TOTAL = 8000

    for f in files:
        filename = f["filename"]
        status = f["status"]
        patch = f.get("patch", "")

        if not patch:
            continue

        if len(patch) > 2000:
            patch = patch[:2000] + "\n... (파일 일부 생략)"

        chunk = f"\n### [{status}] {filename}\n```\n{patch}\n```\n"

        if total_len + len(chunk) > MAX_TOTAL:
            diff_text += "\n... (이후 파일 생략: 변경사항이 너무 많습니다)"
            break

        diff_text += chunk
        total_len += len(chunk)

    return diff_text


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


def call_gemini(diff_text, pr_info):
    """Gemini API 호출해서 리뷰 받기"""
    full_prompt = f"""{REVIEW_SYSTEM_PROMPT}

PR 제목: {pr_info['title']}
브랜치: {pr_info['head']} → {pr_info['base']}
PR 설명: {pr_info['body'] or '없음'}

--- 변경된 코드 ---
{diff_text}
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
    body = f"## 🤖 AI 코드 리뷰\n\n{review_text}\n\n---\n*Powered by Gemini 1.5 Flash*"
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

    diff_text = get_pr_diff()
    if not diff_text.strip():
        print("ℹ️ 변경된 파일 없음. 종료.")
        return

    print("🧠 Gemini에게 리뷰 요청 중...")
    review = call_gemini(diff_text, pr_info)

    print("💬 GitHub PR에 코멘트 작성 중...")
    post_pr_comment(review)

    print("🎉 완료!")


if __name__ == "__main__":
    main()
