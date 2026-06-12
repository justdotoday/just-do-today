package com.example.just_do_today.member.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponse {

    private Long id;
    private String nickname;
    private String profileImageUrl;
    private String userCode;
    private String provider;
    private String providerId;
    private String userRole;
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
}
