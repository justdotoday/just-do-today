// src/components/ui/Button.tsx
import React from 'react';

// 디자인 가이드 기반 타입 정의
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'contained' | 'outlined';
type ButtonShape = 'square' | 'round';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'md',
  variant = 'contained',
  shape = 'round',
  fullWidth = true,
  className = '',
  ...props
}) => {
  // 1. 기본 스타일 및 텍스트 (Label M 적용)
  const baseStyle =
    'inline-flex items-center justify-center font-semibold transition-all active:scale-[0.98] disabled:active:scale-100';

  // 2. 크기별 높이 설정 (가이드: 40px, 48px, 56px)
  const sizeStyles = {
    sm: 'h-[40px] px-4 text-label-s', // 가이드 상 Small 40px
    md: 'h-[48px] px-6 text-label-m', // 가이드 상 Medium 48px
    lg: 'h-[56px] px-8 text-title-s', // 가이드 상 Large 56px
  };

  // 3. 모양 설정 (Square: 8px 정도로 추정, Round: 가이드상 20px 이상)
  const shapeStyles = {
    square: 'rounded-lg',
    round: 'rounded-habit', // 아까 등록한 20px 적용
  };

  // 4. 스타일(Contained / Outlined) 설정 및 Disabled 상태 처리
  const variantStyles = {
    contained:
      'bg-brand-primary text-white disabled:bg-zinc-200 disabled:text-zinc-500',
    outlined:
      'border-[1.5px] border-brand-primary text-brand-primary bg-white disabled:border-zinc-200 disabled:text-zinc-400',
  };

  return (
    <button
      className={`
        ${baseStyle} 
        ${sizeStyles[size]} 
        ${shapeStyles[shape]} 
        ${variantStyles[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
