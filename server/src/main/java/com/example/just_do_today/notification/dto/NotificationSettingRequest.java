package com.example.just_do_today.notification.dto;

import lombok.Data;

@Data
public class NotificationSettingRequest {
    private Boolean isActive;
    private String notifyTime;
}
