// App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Signup from './pages/SignUp';

function App() {
  return (
    <>
      <Routes>
        {/* 기본 레이아웃 */}
        <Route
          path="/"
          element={
            <>
              <div className="font-black">main</div>
              <div className="text-blue-400 bg-amber-50">테스트테스트</div>
              <Link to="/signup" className="text-blue-400 bg-green-50">
                회원가입
              </Link>
            </>
          }
        />

        {/* 회원가입 페이지 */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
