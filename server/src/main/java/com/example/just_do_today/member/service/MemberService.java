package com.example.just_do_today.member.service;

import com.example.just_do_today.member.domain.Member;
import com.example.just_do_today.auth.dto.LoginRequest;
import com.example.just_do_today.member.dto.MemberStatusResDto;
import com.example.just_do_today.member.dto.constant.Role;
import com.example.just_do_today.global.exception.MemberNotFoundException;
import com.example.just_do_today.global.exception.NotEnoughFreezesException;
import com.example.just_do_today.global.exception.NotEnoughHeartsException;
import com.example.just_do_today.member.mapper.MemberMapper;
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

    public Member getMemberById(Long id) {
        Member member = memberMapper.findById(id);
        if (member == null) {
            throw new MemberNotFoundException("Member with id " + id + " not found.");
        }
        return member;
    }

    @Transactional
    public Member loginOrRegister(LoginRequest loginRequest) {

        // 회원 조회 (로그인)
        Member member = memberMapper.findByProviderId(
                loginRequest.getProvider(),
                loginRequest.getProviderId()
        );

        // 없으면 회원가입
        if (member == null) {
            String userCode = UUID.randomUUID().toString().substring(0, 6);
            Member newMember = Member.builder()
                    .provider(loginRequest.getProvider())
                    .providerId(loginRequest.getProviderId())
                    .profileImageUrl(loginRequest.getProfileImageUrl())
                    .nickname("user_" + userCode)
                    .userCode(userCode)
                    .userRole(Role.USER.getKey())
                    .build();
            memberMapper.saveMember(newMember);

            return memberMapper.findByProviderId(
                    loginRequest.getProvider(),
                    loginRequest.getProviderId()
            );
        }

        return member;
    }

    // 하트 사용, 추가
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

    // 프리즈 사용, 추가
    @Transactional
    public void deductFreeze(Member member) {
        if (member.getFreezes() <= 0) {
            throw new NotEnoughFreezesException("프리즈 개수가 부족합니다.");
        }
        member.setFreezes(member.getFreezes() - 1);
        memberMapper.updateMemberFreezes(member);
    }

    @Transactional
    public void addFreeze(Member member) {
        if (member.getFreezes() >= 5) {
            return;
        }
        member.setFreezes(member.getFreezes() + 1);
        memberMapper.updateMemberFreezes(member);
    }

    // 유저 하트/프리즈 잔여량 조회
    public MemberStatusResDto getMemberStatus(Long memberId){
        Member member = memberMapper.findById(memberId);
        // Member → DTO 변환해서 반환
        return new MemberStatusResDto(member.getFreezes(),member.getHearts());
    }
}
