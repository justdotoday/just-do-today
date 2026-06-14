import { usePushNotification } from '../../hooks/usePushNotification';
import { updateNotificationSetting } from '../../api/notification';

const PushTestPage = () => {
  const { state, requestPermission } = usePushNotification();

  const handle = async () => {
    await requestPermission();
    const d = new Date(Date.now() + 5 * 60 * 1000);
    const notifyTime = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    await updateNotificationSetting(true, notifyTime);
  };

  return (
    <div style={{ padding: 24 }}>
      <p>상태: {state}</p>
      <button onClick={handle} disabled={state === 'granted' || state === 'loading'}>
        5분 뒤 알림 등록
      </button>
    </div>
  );
};

export default PushTestPage;
