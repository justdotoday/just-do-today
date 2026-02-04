package com.example.just_do_today.domain.Habit;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class HabitHistory {
    private Long id;
    private Long userHabitId;
    private LocalDate checkDate;
    private LocalDateTime createdAt;
}
