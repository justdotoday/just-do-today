import TabPageHeader from '../../components/shared/layout/TabPageHeader';
import profileImg from '../../assets/Temp.png';
import kakao from '../../assets/kakaotalk_btn.png';
import alarmset from '../../assets/setting/alarmset.svg';
import notice from '../../assets/setting/notice.svg';
import contract from '../../assets/setting/contract.svg';
import next from '../../assets/next.svg';

// type Props = {
//   profileImageUrl: string;
//   nickname: string;
//   provider: string;
//   joinedDate: string; // 'YYYY-MM-DD'
// };

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <TabPageHeader title="설정" />
      <div className="px-4 pt-4">
        <div className="flex flex-col items-center text-center p-3 border rounded-xl border-gray-100 gap-2 bg-white">
          <img
            src={profileImg}
            className="w-13 h-13 rounded-full object-cover"
          ></img>
          <div className="flex justify-center items-center">
            <p className="font-semibold">닉네임</p>
            <img src={kakao} className="w-7"></img>
          </div>
          <p className="text-xs text-gray-400">2026.02.02 ~ ing</p>
          <button className="bg-gray-100 w-full py-2 rounded-lg text-xs text-gray-500">
            내 정보 수정
          </button>
        </div>
        <div className="flex flex-col my-2 justify-center bg-white border-0.5 border-gray-100 rounded-xl">
          <div className="flex items-center gap-2 p-2.5 text-sm border border-gray-100 rounded-t-xl">
            <img src={alarmset} className="w-4 h-4" />
            <p className="text-gray-800">알림 설정</p>
            <img src={next} className="w-3 h-3 ml-auto" />
          </div>
          <div className="flex items-center gap-2 p-2.5 text-sm border-x border-gray-100">
            <img src={notice} className="w-4 h-4" />
            <p className="text-gray-800">공지사항</p>
            <img src={next} className="w-3 h-3 ml-auto" />
          </div>
          <div className="flex items-center gap-2 p-2.5 text-sm border border-gray-100 rounded-b-xl">
            <img src={contract} className="w-4 h-4" />
            <p className="text-gray-800">이용약관</p>
            <img src={next} className="w-3 h-3 ml-auto" />
          </div>
        </div>
        <p className="py-2 text-xs text-gray-400 underline">로그아웃</p>
      </div>
    </div>
  );
};

export default SettingsPage;
