package com.example.just_do_today.member.service;

import com.example.just_do_today.member.dto.OnboardingRequestDto;
import com.example.just_do_today.member.mapper.MemberMapper;
import com.example.just_do_today.member.mapper.OnboardingMapper;
import com.example.just_do_today.habit.service.HabitService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class OnboardingService {
    private final HabitService habitService;
    private final OnboardingMapper onboardingMapper;
    private final MemberMapper memberMapper;

    @Transactional
    public void completeOnboarding(Long memberId, OnboardingRequestDto requestDto) {
        Boolean completed = onboardingMapper.findOnboardingCompleteById(memberId);

        // 온보딩 여부 확인
        if(Boolean.TRUE.equals(completed)) {
            throw new IllegalStateException("이미 온보딩이 완료된 사용자입니다.");
        }

        // 닉네임 업데이트
        if (StringUtils.hasText(requestDto.getNickname())) {
            memberMapper.updateNickname(memberId, requestDto.getNickname().trim());
        }

        // 온보딩 목표 필수 기입
        if (!StringUtils.hasText(requestDto.getGoal())) {
            throw new IllegalArgumentException("온보딩 목표는 필수입니다.");
        }
        onboardingMapper.insertGoal(memberId,requestDto.getGoal().trim());

        // 습관을 등록했다면 생성
        if(requestDto.getHabit() != null) {
            habitService.createHabit(memberId,requestDto.getHabit());
        }
        // 온보딩 완료
        onboardingMapper.updateOnboardingCompleted(memberId, true);
    }

}
