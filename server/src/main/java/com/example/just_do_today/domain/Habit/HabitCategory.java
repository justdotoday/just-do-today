package com.example.just_do_today.domain.Habit;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HabitCategory {
    private Long habitId;
    private Long categoryId;
    private LocalDateTime createdAt;
}
