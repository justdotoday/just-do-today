package com.example.just_do_today.service.notification;

import com.example.just_do_today.domain.NotificationSetting;
import com.example.just_do_today.dto.notification.NotificationSettingRequest;
import com.example.just_do_today.dto.notification.PushSubscribeRequest;
import com.example.just_do_today.mapper.notification.NotificationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ExecutionException;

// 웹 푸시 subscription 저장 및 VAPID 기반 알림 발송
@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationMapper notificationMapper;

    @Value("${app.vapid.public-key}")
    private String vapidPublicKey;

    @Value("${app.vapid.private-key}")
    private String vapidPrivateKey;

    @Value("${app.vapid.subject}")
    private String vapidSubject;

    @PostConstruct
    public void init() {
        Security.addProvider(new BouncyCastleProvider());
    }

    public String getVapidPublicKey() {
        return vapidPublicKey;
    }

    public void saveSubscription(Long memberId, PushSubscribeRequest req) {
        NotificationSetting setting = new NotificationSetting();
        setting.setMemberId(memberId);
        setting.setPushEndpoint(req.getEndpoint());
        setting.setPushP256dh(req.getP256dh());
        setting.setPushAuth(req.getAuth());
        notificationMapper.upsertSubscription(setting);
    }

    public void updateSetting(Long memberId, NotificationSettingRequest req) {
        NotificationSetting setting = new NotificationSetting();
        setting.setMemberId(memberId);
        setting.setIsActive(Boolean.TRUE.equals(req.getIsActive()) ? "1" : "0");
        if (req.getNotifyTime() != null) {
            setting.setNotifyTime(LocalTime.parse(req.getNotifyTime()));
        }
        notificationMapper.upsertSetting(setting);
    }

    public NotificationSetting getSetting(Long memberId) {
        return notificationMapper.findByMemberId(memberId);
    }

    // 매분 실행 — notify_time이 현재 시각인 활성 구독자에게 푸시 발송
    @Scheduled(cron = "0 * * * * *")
    public void scheduledPush() {
        String currentTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));
        List<NotificationSetting> targets = notificationMapper.findActiveSubscriptionsForTime(currentTime);
        for (NotificationSetting target : targets) {
            try {
                sendPush(target, "오늘의 습관 알림", "오늘 습관을 기록해보세요!");
            } catch (Exception e) {
                log.warn("푸시 발송 실패 memberId={}: {}", target.getMemberId(), e.getMessage());
            }
        }
    }

    public void sendPush(NotificationSetting setting, String title, String body)
            throws GeneralSecurityException, JoseException, IOException, ExecutionException, InterruptedException {
        PushService pushService = new PushService(vapidPublicKey, vapidPrivateKey, vapidSubject);
        String payload = String.format("{\"title\":\"%s\",\"body\":\"%s\"}", title, body);
        Notification notification = new Notification(
                setting.getPushEndpoint(),
                setting.getPushP256dh(),
                setting.getPushAuth(),
                payload
        );
        pushService.send(notification);
    }
}
