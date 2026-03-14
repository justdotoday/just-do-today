package com.example.just_do_today.dto.auth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {

    private String provider;
    private String providerId;
    private String profileImageUrl;
    private String nickname;
}