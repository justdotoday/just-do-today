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
  status: string;
};
