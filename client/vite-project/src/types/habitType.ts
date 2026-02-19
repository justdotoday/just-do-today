// payload 타입 지정

export type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';
export type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

//습관 생성요청 payload 타입
export type CreateHabitPayload = {
  name: string;
  category: string;
  frequency: Frequency;
  days?: Day[];
  isPublic: boolean;
  startDate: string;
};

//습관 조회 응답 타입
export type Habit = {
  id: string;
  name: string;
  category: string;
  frequency: Frequency;
  days?: number[];
  status: string;
};
