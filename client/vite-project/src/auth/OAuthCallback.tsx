/** OAuth 인증 성공 후 서버가 ?token=xxx 로 리다이렉트했을 때 토큰을 저장하고 홈으로 이동 */

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      localStorage.setItem('AccessToken', token);
      navigate('/home', { replace: true });
    } else {
      console.error('OAuth 로그인 실패:', error);
      navigate('/signup', { replace: true });
    }
  }, [searchParams, navigate]);

  return null;
};

export default OAuthCallback;
