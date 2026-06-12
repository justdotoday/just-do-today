package com.example.just_do_today.member.dto;

import com.example.just_do_today.member.dto.constant.Role;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberRequest {

    private String nickname;
    private String profileImageUrl;
    private String userCode;
    private String provider;
    private String providerId;

    @Builder.Default
    private String userRole = Role.USER.getKey();

    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
}
