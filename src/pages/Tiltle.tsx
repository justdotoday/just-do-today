import { Link } from 'react-router-dom';

const Title = () => {
  return (
    <div>
      <div>Title</div>
      <div>logo</div>
      <div>
        <a>구글 아이디로 로그인</a>
        <a>카카오 아이디로 로그인</a>
        <Link to="/signup" className="text-blue-400 bg-green-50">
          회원가입
        </Link>{' '}
      </div>
    </div>
  );
};

export default Title;
