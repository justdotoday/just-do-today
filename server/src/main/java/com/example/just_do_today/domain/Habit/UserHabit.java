package com.example.just_do_today.domain.Habit;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.just_do_today.domain.Habit.Enum.Color;
import com.example.just_do_today.domain.Habit.Enum.Frequency;
import com.example.just_do_today.domain.Habit.Enum.UserHabitStatus;
import lombok.Data;

@Data
public class UserHabit {
    private Long id;
    private Long memberId;
    private String name;
    private Long categoryId;
    private UserHabitStatus status;
    private Color color;
    private LocalDate frozenUntil;
    private Frequency frequency;
    private LocalDate startDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
