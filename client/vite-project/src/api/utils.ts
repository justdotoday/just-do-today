//요일 한글 → 영어 서버 값 변환 유틸
import type { Day } from '../types/habitType';

const DAY_MAP: Record<string, Day> = {
  월: 'MON',
  화: 'TUE',
  수: 'WED',
  목: 'THU',
  금: 'FRI',
  토: 'SAT',
  일: 'SUN',
};

export const mapDaysToServer = (days: string[]): Day[] =>
  days.map((d) => DAY_MAP[d]);
