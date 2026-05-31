// 브라우저 푸시 알림 권한 요청 및 VAPID subscription 등록
import { useState } from 'react';
import { getVapidPublicKey, subscribeNotification } from '../api/notification';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export type PermissionState = 'idle' | 'loading' | 'granted' | 'denied' | 'error';

export const usePushNotification = () => {
  const [state, setState] = useState<PermissionState>('idle');

  const requestPermission = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setState('error');
      return;
    }

    setState('loading');
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setState('denied');
        return;
      }

      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      const vapidKey = await getVapidPublicKey();
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      await subscribeNotification(subscription.toJSON());
      setState('granted');
    } catch (e) {
      console.error('푸시 구독 실패:', e);
      setState('error');
    }
  };

  return { state, requestPermission };
};
