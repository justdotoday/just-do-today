package com.example.just_do_today.habit.domain;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

// 유저-습관의 프리즈(얼음) 사용 이력 — 어떤 기간 동안 프리즈를 사용했는지 기록
@Data
public class UserHabitFreezeHistory {
    private Long id;
    private Long userHabitId;
    private LocalDate frozenFrom;
    private LocalDate frozenUntil;
    private LocalDateTime createdAt;
}
