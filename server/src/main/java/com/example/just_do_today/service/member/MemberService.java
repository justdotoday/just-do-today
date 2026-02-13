package com.example.just_do_today.service.member;

import com.example.just_do_today.domain.Member;
import com.example.just_do_today.dto.auth.LoginRequest;
import com.example.just_do_today.dto.member.constant.Role;
import com.example.just_do_today.global.exception.MemberNotFoundException;
import com.example.just_do_today.global.exception.NotEnoughHeartsException;
import com.example.just_do_today.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;

    public Member getMember(String provider, String providerId) {
        return memberMapper.findByProviderId(provider, providerId);
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

    @Transactional
    public void deductHeart(Member member) {
        if (member.getHearts() <= 0) {
            throw new NotEnoughHeartsException("하트 개수가 부족합니다.");
        }
        member.setHearts(member.getHearts() - 1);
        memberMapper.updateMemberHearts(member);
    }

    @Transactional
    public void addHeart(Member member) {
        member.setHearts(member.getHearts() + 1);
        memberMapper.updateMemberHearts(member);
    }
}
