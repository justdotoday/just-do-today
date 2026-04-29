// 앱 전역 색상 상수 — 버튼, 강조 텍스트, 테두리 등 시그니처 컬러 관리

export const COLORS = {
  /** 주요 버튼, 강조 텍스트, 포커스 테두리 등에 사용하는 브랜드 컬러 */
  primary: '#2E68EF',
} as const;

// 서버 Color enum 이름 → hex 변환 (서버가 enum name 문자열로 내려줄 때 사용)
const COLOR_NAME_TO_HEX: Record<string, string> = {
  RED: '#FF6B6B',
  PINK: '#FF8FA3',
  PEACH: '#FFB5A7',
  YELLOW: '#FFD93D',
  LIGHT_YELLOW: '#FFF3B0',
  BEIGE: '#E8A87C',
  MINT: '#7DD3A8',
  TEAL: '#38B2AC',
  DARK_GREEN: '#2D6A4F',
  SKY_BLUE: '#8B9DC3',
  BLUE: '#3B47B3',
  LIGHT_PURPLE: '#BFA2E6',
  PURPLE: '#9D4EDD',
  LAVENDER: '#C9A0DC',
  LIGHT_BROWN: '#C4A484',
  BROWN: '#A67C52',
  DARK_BROWN: '#6B4423',
  LIGHT_GRAY: '#94A3B8',
  GRAY: '#D9D9D9',
  DARK_GRAY: '#495057',
};

export const colorToHex = (color: string | null | undefined): string => {
  if (!color) return '#3B47B3';
  if (color.startsWith('#')) return color;
  return COLOR_NAME_TO_HEX[color] ?? '#3B47B3';
};
