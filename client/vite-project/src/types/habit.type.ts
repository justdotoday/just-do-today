// payload 타입 지정

export type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';
export type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

//습관 생성요청 payload 타입
export type CreateHabitPayload = {
  name: string;
  categoryName: string;
  emoji?: string;
  frequency: Frequency;
  days?: Day[];
  isPublic: boolean;
  startDate: string;
  color: string;
};

// 습관 수정 요청 payload 타입
export type UpdateHabitPayload = Omit<CreateHabitPayload, 'startDate'>;

//습관 조회 응답 타입
export type Habit = {
  /** 습관(habit) PK. 삭제 API에 사용 */
  id: string;
  /** 완료 체크 등에 사용하는 user_habit PK (선택) */
  userHabitId?: number;
  name: string;
  /** API에서 null일 수 있음. 있으면 그대로 표시(직접 추가한 카테고리 포함), 없으면 '미분류' */
  category: string | null;
  /** 유저가 선택한 습관 색상 (완료 체크 UI 등에 사용) */
  color?: string | null;
  /** 카테고리에 연결된 이모지 (category_user.emoji) */
  emoji?: string | null;
  frequency: Frequency;
  days?: number[];
  /** 습관 자체 상태: ACTIVE | FREEZE */
  status: string;
  /** 오늘 habit_history 기록: DONE | HEART | null */
  todayStatus?: string | null;
  /** 습관 시작일 (YYYY-MM-DD) */
  startDate?: string;
  /** 공개 여부: 0(또는 "0")=비공개, 1(또는 "1")=공개 */
  isPublic?: number | string;
  /** 상태 문구 칩 (예: "오늘 완료", "꾸준히 유지 중", "3일 쉬는 중") */
  statusChip?: string | null;
  /** 성공 횟수 칩 (예: "최근 7일 중 5일 성공") */
  successChip?: string | null;
};
