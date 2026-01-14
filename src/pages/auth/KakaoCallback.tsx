// auth 리다이렉트 url
//! KakaoCallback.tsx의 최소 역할
//! URL에서 code 꺼내기
//! 콘솔에 찍기 (지금 단계)
//! 이후 메인 페이지로 이동

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    console.log('카카오 인가 코드:', code);

    // 지금은 확인용
    // 나중에 서버로 code 전달 후 결과에 따라 이동
    navigate('/');
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default KakaoCallback;
