package com.example.just_do_today.dto.notification;

import lombok.Data;

@Data
public class NotificationSettingRequest {
    private Boolean isActive;
    private String notifyTime;
}
