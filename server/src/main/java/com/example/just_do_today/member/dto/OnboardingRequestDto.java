package com.example.just_do_today.member.dto;

import com.example.just_do_today.habit.dto.CreateHabitRequestDto;
import lombok.Getter;

@Getter
public class OnboardingRequestDto {
    private String nickname;
    private String goal;
    private CreateHabitRequestDto habit; // "다음에 할래요"면 null
}
