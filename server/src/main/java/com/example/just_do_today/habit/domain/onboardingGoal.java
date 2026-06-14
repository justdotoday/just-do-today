package com.example.just_do_today.habit.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class onboardingGoal {
    private Long id;
    private Long memberId;
    private String goal;
    private LocalDateTime createdAt;
}
