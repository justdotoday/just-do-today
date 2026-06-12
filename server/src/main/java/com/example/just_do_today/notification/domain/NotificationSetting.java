package com.example.just_do_today.notification.domain;

import lombok.Data;

import java.time.LocalTime;

// 회원별 푸시 알림 설정 및 Web Push subscription 정보
@Data
public class NotificationSetting {
    private Long memberId;
    private String isActive;
    private String pushEndpoint;
    private String pushP256dh;
    private String pushAuth;
    private LocalTime notifyTime;
}
