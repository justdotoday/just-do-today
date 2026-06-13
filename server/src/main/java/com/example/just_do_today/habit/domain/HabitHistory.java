package com.example.just_do_today.habit.domain;

import com.example.just_do_today.habit.domain.enums.HabitHistoryStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class HabitHistory {
    private Long id;
    private Long userHabitId;
    private LocalDate checkDate;
    private HabitHistoryStatus status;
    private LocalDateTime createdAt;
}
