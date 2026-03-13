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
    private Long habitId;
    private UserHabitStatus status;
    private LocalDate frozenUntil;
    private Frequency frequency;
    private LocalDate startDate;
    private Color color;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
