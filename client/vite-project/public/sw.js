// Service Worker — 백그라운드 웹 푸시 수신 처리
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? { title: '알림', body: '새 알림이 있습니다.' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.png',
      badge: '/icon.png',
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
