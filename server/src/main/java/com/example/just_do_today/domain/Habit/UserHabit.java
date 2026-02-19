package com.example.just_do_today.domain.Habit;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.just_do_today.domain.Habit.UserHabitStatus;
import lombok.Data;

@Data
public class UserHabit {
    private Long id;
    private Long memberId;
    private Long habitId;
    private UserHabitStatus status;
    private LocalDate frozenUntil;
    private String frequency;
    private LocalDate startDate;
    private String color;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
