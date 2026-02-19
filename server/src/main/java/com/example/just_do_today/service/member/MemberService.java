package com.example.just_do_today.service.member;

import com.example.just_do_today.dto.auth.LoginRequest;
import com.example.just_do_today.dto.member.MemberRequest;
import com.example.just_do_today.dto.member.MemberResponse;
import com.example.just_do_today.dto.member.constant.Role;
import com.example.just_do_today.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;

    public MemberResponse getMember(String provider, String providerId) {
        return memberMapper.findByProviderId(provider,providerId);
    }

    public MemberResponse loginOrRegister(LoginRequest loginRequest) {
        String providerName = loginRequest.getProvider().toUpperCase();

        MemberResponse member = memberMapper.findByProviderId(
                providerName,
                loginRequest.getProviderId()
        );

        if (member != null) {
            return member;
        }

        MemberRequest saveDto = MemberRequest.builder()
                .provider(providerName)
                .providerId(loginRequest.getProviderId())
                .profileImageUrl(loginRequest.getProfileImageUrl())
                .nickname("nickname")
                .userCode(UUID.randomUUID().toString().substring(0, 6))
                .userRole(Role.USER.getKey())
                .build();

        memberMapper.saveMember(saveDto);

        return memberMapper.findByProviderId(providerName, loginRequest.getProviderId());
    }
}
