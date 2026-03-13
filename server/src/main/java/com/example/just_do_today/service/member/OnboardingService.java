package com.example.just_do_today.service.member;

import com.example.just_do_today.dto.member.OnboardingRequestDto;
import com.example.just_do_today.mapper.member.MemberMapper;
import com.example.just_do_today.mapper.member.OnboardingMapper;
import com.example.just_do_today.service.habit.HabitService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class OnboardingService {
    private final MemberMapper memberMapper;
    private final HabitService habitService;
    private final OnboardingMapper onboardingMapper;

    @Transactional
    public void completeOnboarding(Long memberId, OnboardingRequestDto requestDto) {
        Boolean completed = memberMapper.findOnboardingCompleteById(memberId);

        // 온보딩 여부 확인
        if(Boolean.TRUE.equals(completed)) {
            throw new IllegalStateException("이미 온보딩이 완료된 사용자입니다.");
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
        memberMapper.updateOnboardingCompleted(memberId,true);
    }

}
