/**
 * 히트맵 셀 색상 계산 유틸
 *
 * FEELING_OPTIONS 세 가지 → attempt / maintain / perfect 상태로 매핑하고,
 * 습관 색상(hex)을 기반으로 셀 배경(surface)과 텍스트/체크(content) 색상을 반환한다.
 *
 * - attempt  (30%) : 배경 15% 불투명도, 텍스트 = 원래 색상
 * - maintain (60%) : 배경 42% 불투명도, 텍스트 = 어두운 버전
 * - perfect (100%) : 배경 = 원래 색상, 텍스트 = 대비색(흰/검)
 */

export type HeatmapStatus = 'attempt' | 'maintain' | 'perfect';

/** DailyLogBottomSheet FEELING_OPTIONS 문자열 → 히트맵 상태 */
export const FEELING_TO_STATUS: Record<string, HeatmapStatus> = {
  '시도한 것에 의미를 둬요 🥲': 'attempt',
  '계획했던 흐름을 잘 이어갔어요 👍': 'maintain',
  '아주 뿌듯해요! 완벽하게 해냈어요 🔥': 'perfect',
};

// ─── 내부 유틸 ──────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const n = parseInt(clean.padEnd(6, '0'), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** hex + 0~1 알파 → 8자리 hex (rgba 대신 CSS에서 모두 지원) */
function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${a}`;
}

/** hex 색상을 ratio(0~1)만큼 어둡게 */
function darken(hex: string, ratio: number): string {
  const [r, g, b] = hexToRgb(hex);
  const f = 1 - ratio;
  const toHex = (v: number) =>
    Math.round(Math.max(0, v * f))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** WCAG 상대 휘도 기반으로 배경색 대비가 높은 텍스트 색(흰/검) 반환 */
function contrastColor(hex: string): string {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.35 ? '#27272A' : '#FFFFFF';
}

// ─── 공개 API ───────────────────────────────────────────────────────────────

export interface HeatmapCellColors {
  /** 셀 배경색 */
  surface: string;
  /** 셀 내부 텍스트·체크·아이콘 색 */
  content: string;
}

/**
 * 습관 고유 색상(hex)과 기분 상태를 받아 셀 색상 쌍을 반환한다.
 * @param habitHex   예) '#FF6B6B'
 * @param status     'attempt' | 'maintain' | 'perfect'
 */
export function getHeatmapCellColors(
  habitHex: string,
  status: HeatmapStatus
): HeatmapCellColors {
  switch (status) {
    case 'attempt':
      return {
        surface: withAlpha(habitHex, 0.15),
        content: habitHex,
      };
    case 'maintain':
      return {
        surface: withAlpha(habitHex, 0.42),
        content: darken(habitHex, 0.35),
      };
    case 'perfect':
      return {
        surface: habitHex,
        content: contrastColor(habitHex),
      };
  }
}
