package com.example.just_do_today.habit.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.just_do_today.habit.domain.enums.Color;
import com.example.just_do_today.habit.domain.enums.Frequency;
import com.example.just_do_today.habit.domain.enums.UserHabitStatus;
import lombok.Data;

@Data
public class UserHabit {
    private Long id;
    private Long memberId;
    private String name;
    private Long categoryUserId;
    private UserHabitStatus status;
    private Color color;
    private LocalDate frozenUntil;
    private Frequency frequency;
    private LocalDate startDate;
    private Boolean isPublic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
