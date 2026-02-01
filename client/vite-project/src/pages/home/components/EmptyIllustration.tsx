import emptyImg from '../../../assets/emptyImage.png';

const EmptyIllustration = () => {
  return (
    <div className="w-full flex justify-center mt-4">
      <img
        src={emptyImg}
        alt="건강 리스트 예시"
        className="w-full max-w-[320px] h-auto"
      />
    </div>
  );
};

export default EmptyIllustration;
