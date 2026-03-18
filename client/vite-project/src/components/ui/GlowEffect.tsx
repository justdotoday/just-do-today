// 온보딩/습관생성/Empty 페이지에서 상단 또는 하단에 쓰이는 글로우 효과

const GLOW_STYLE = {
  background:
    'radial-gradient(50% 50% at 50% 50%, rgba(163, 191, 255, 0.65) 0%, rgba(163, 191, 255, 0.00) 100%)',
  filter: 'blur(98px)',
};

type GlowEffectProps = {
  position: 'top' | 'bottom';
};

const GlowEffect = ({ position }: GlowEffectProps) => (
  <div
    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full opacity-90 ${
      position === 'top' ? '-top-[160px]' : '-bottom-[160px]'
    }`}
    style={GLOW_STYLE}
  />
);

export default GlowEffect;
