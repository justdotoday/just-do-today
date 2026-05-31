package com.example.just_do_today.controller.notification;

import com.example.just_do_today.domain.NotificationSetting;
import com.example.just_do_today.dto.notification.NotificationSettingRequest;
import com.example.just_do_today.dto.notification.PushSubscribeRequest;
import com.example.just_do_today.global.security.UserPrincipal;
import com.example.just_do_today.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// 웹 푸시 구독 등록, 설정 변경, VAPID 공개키 제공
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/vapid-key")
    public ResponseEntity<Map<String, String>> getVapidKey() {
        return ResponseEntity.ok(Map.of("publicKey", notificationService.getVapidPublicKey()));
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Void> subscribe(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody PushSubscribeRequest request) {
        notificationService.saveSubscription(principal.getMemberId(), request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/setting")
    public ResponseEntity<Void> updateSetting(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody NotificationSettingRequest request) {
        notificationService.updateSetting(principal.getMemberId(), request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/setting")
    public ResponseEntity<NotificationSetting> getSetting(
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(notificationService.getSetting(principal.getMemberId()));
    }
}
