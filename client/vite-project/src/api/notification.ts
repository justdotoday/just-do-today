// 웹 푸시 구독 및 알림 설정 API
import apiClient from './client';

export const getVapidPublicKey = async (): Promise<string> => {
  const res = await apiClient.get<{ publicKey: string }>('/api/notifications/vapid-key');
  return res.data.publicKey;
};

export const subscribeNotification = async (subscription: PushSubscriptionJSON): Promise<void> => {
  await apiClient.post('/api/notifications/subscribe', {
    endpoint: subscription.endpoint,
    p256dh: subscription.keys?.p256dh,
    auth: subscription.keys?.auth,
  });
};

export const updateNotificationSetting = async (isActive: boolean, notifyTime: string): Promise<void> => {
  await apiClient.put('/api/notifications/setting', { isActive, notifyTime });
};

export const getNotificationSetting = async () => {
  const res = await apiClient.get('/api/notifications/setting');
  return res.data;
};
