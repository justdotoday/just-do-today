package com.example.just_do_today.auth.dto;

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
