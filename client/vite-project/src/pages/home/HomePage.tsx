import HomeEmpty from './components/HomeEmpty';
import HomeList from './components/HomeList';

const HomePage = () => {
  const isEmpty = true; // 임시로 빈 상태 설정
  return <div className="px-4">{isEmpty ? <HomeEmpty /> : <HomeList />}</div>;
};

export default HomePage;
