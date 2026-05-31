package com.example.just_do_today.dto.notification;

import lombok.Data;

@Data
public class PushSubscribeRequest {
    private String endpoint;
    private String p256dh;
    private String auth;
}
