import { useRef, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/Temp.png'
import { COLORS } from '../../constants/colors';

const INITIAL_NICKNAME = '';

const ManageAccountPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState(INITIAL_NICKNAME);
  const [profileImageUrl, setProfileImageUrl] = useState(profileImg);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const hasChanges = nickname.trim() !== INITIAL_NICKNAME || profileFile !== null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileFile(file);
    setProfileImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!hasChanges) return;
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50">
        <div className="pt-[env(safe-area-inset-top)]" />
        <div className="relative flex h-14 items-center justify-center px-4">
          <button onClick={() => navigate(-1)} className="absolute left-2 p-2">
            <IoChevronBack className="text-xl text-zinc-900" />
          </button>
          <p>내 정보 수정</p>
        </div>
      </header>

      <div className="pb-32">
        <div className="p-2">
          <p className="text-gray-700 text-xs font-semibold pb-2">프로필 사진</p>
          <button type="button" onClick={() => fileInputRef.current?.click()}>
            <img src={profileImageUrl} className="w-18 h-18 rounded-full object-cover" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="p-2">
          <p className="text-gray-700 text-xs font-semibold pb-2">닉네임</p>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
            className="px-2.5 py-2 w-full text-xs border border-gray-100 rounded-full"
          ></input>
        </div>
        <p className="p-2 text-xs text-gray-400 underline">회원 탈퇴</p>
      </div>

      <div className="fixed bottom-0 z-50 px-4 pb-[calc(24px+env(safe-area-inset-bottom))] left-[max(0px,calc((100vw-414px)/2))] right-[max(0px,calc((100vw-414px)/2))]">
        <div className="mx-auto w-full max-w-[420px]">
          <button
            onClick={handleSubmit}
            disabled={!hasChanges}
            className={`h-12 w-full rounded-full text-[14px] font-semibold transition-all ${
              !hasChanges
                ? 'bg-zinc-200 text-zinc-500'
                : 'text-white active:scale-[0.98]'
            }`}
            style={hasChanges ? { backgroundColor: COLORS.primary } : undefined}
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAccountPage;
