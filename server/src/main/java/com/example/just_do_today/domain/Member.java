package com.example.just_do_today.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {
    private Long id;
    private String nickname;
    private String profileImageUrl;
    private String userCode;
    private String provider;
    private String providerId;
    private String userRole;
    @Builder.Default
    private int hearts = 3;
    @Builder.Default
    private int freezes = 1;
    @Builder.Default
    private boolean onboardingCompleted = false;
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
}
