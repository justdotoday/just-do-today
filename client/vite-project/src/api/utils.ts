//요일 한글 → 영어 서버 값 변환 유틸
import type { Day } from '../types/habit.type';

const DAY_MAP: Record<string, Day> = {
  월: 'MON',
  화: 'TUE',
  수: 'WED',
  목: 'THU',
  금: 'FRI',
  토: 'SAT',
  일: 'SUN',
};

const NUMBER_TO_DAY_KR: Record<number, string> = {
  0: '월', 1: '화', 2: '수', 3: '목', 4: '금', 5: '토', 6: '일',
};

export const mapDaysToServer = (days: string[]): Day[] =>
  days.map((d) => DAY_MAP[d]).filter(Boolean);

export const mapDaysFromServer = (days: number[]): string[] =>
  days.map((n) => NUMBER_TO_DAY_KR[n]).filter(Boolean);
