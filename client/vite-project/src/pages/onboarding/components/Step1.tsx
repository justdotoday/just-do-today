// 온보딩 Step1 — 닉네임 입력 + 필수/선택 약관 동의 화면 (1/3)

import { useState } from 'react';
import { IoChevronForward, IoHeart } from 'react-icons/io5';

type Step1Props = {
  onNext: (nickname: string) => void;
  onBack: () => void;
};

const AGREEMENTS = [
  { id: 'terms' as const, label: '이용약관 동의', required: true },
  {
    id: 'privacy' as const,
    label: '개인정보 수집 및 이용 동의',
    required: true,
  },
  {
    id: 'thirdParty' as const,
    label: '개인정보의 제3자 제공 동의',
    required: true,
  },
  { id: 'marketing' as const, label: '마케팅 정보 수신 동의', required: false },
] as const;

const Step1 = ({ onNext }: Step1Props) => {
  const [nickname, setNickname] = useState('');
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState<Record<string, boolean>>({
    terms: false,
    privacy: false,
    thirdParty: false,
    marketing: false,
  });

  const toggleAgreement = (id: string) => {
    setAgreements((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      setAgreeAll(AGREEMENTS.every((a) => next[a.id]));
      return next;
    });
  };

  const handleAgreeAll = () => {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgreements(
      AGREEMENTS.reduce(
        (acc, a) => ({ ...acc, [a.id]: next }),
        {} as Record<string, boolean>
      )
    );
  };

  // 필수 3개(이용약관, 개인정보 수집·이용, 제3자 제공)만 체크되면 다음 가능. [선택] 마케팅은 불필요.
  const requiredAgreed = AGREEMENTS.filter((a) => a.required).every(
    (a) => agreements[a.id]
  );
  const canNext = nickname.trim().length > 0 && requiredAgreed;

  return (
    <div className="flex min-h-screen flex-col">
      {/* 상단 뒤로가기 및 온보딩 단계 */}
      <div className="mx-auto flex w-full max-w-[414px] flex-1 flex-col bg-white">
        <br />

        <main className="flex flex-1 flex-col px-4 pb-[calc(80px+env(safe-area-inset-bottom))]">
          {/* 인사 + 닉네임 입력 */}
          <section className="mb-8">
            <h1 className="mb-2 flex items-center gap-1.5 font-bold text-2xl text-zinc-900">
              안녕하세요!
              <IoHeart className="text-[#2563EB] shrink-0" aria-hidden />
            </h1>
            <p className="mb-6 font-bold text-2xl text-zinc-900">
              어떻게 불러드릴까요?
            </p>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="ex) 나는야종달새"
              className="w-full rounded-full border-2 border-zinc-200 bg-white px-4 py-4 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-[#2563EB] focus:outline-none"
              maxLength={20}
            />
          </section>

          {/* 하단으로 밀어넣기 */}
          <div className="flex-1" />

          {/* 약관 동의 (하단) */}
          <section className="mt-auto">
            <button
              type="button"
              onClick={handleAgreeAll}
              className="flex w-full items-center gap-3 py-3 text-left"
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  agreeAll
                    ? 'border-[#2563EB] bg-[#2563EB]'
                    : 'border-zinc-300 bg-white'
                }`}
              >
                {agreeAll && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
              <span className="font-medium text-zinc-900">전체 동의하기</span>
            </button>

            <ul className="border-t border-zinc-100">
              {AGREEMENTS.map(({ id, label, required }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => toggleAgreement(id)}
                    className="flex w-full items-center gap-3 py-3 text-left"
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        agreements[id]
                          ? 'border-green-500 bg-green-500'
                          : 'border-zinc-300 bg-white'
                      }`}
                    >
                      {agreements[id] && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="flex-1 text-sm text-zinc-700">
                      {required ? '[필수]' : '[선택]'} {label}
                    </span>
                    <IoChevronForward className="h-5 w-5 shrink-0 text-zinc-400" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>

      {/* 하단 고정 버튼 (414px 영역 안) */}
      <div className="fixed bottom-0 left-1/2 w-full max-w-[414px] -translate-x-1/2 bg-white px-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => onNext(nickname.trim())}
          disabled={!canNext}
          className="flex h-14 w-full items-center justify-center rounded-full bg-[#2563EB] font-semibold text-white transition active:scale-[0.98] disabled:bg-zinc-300 disabled:active:scale-100"
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default Step1;
