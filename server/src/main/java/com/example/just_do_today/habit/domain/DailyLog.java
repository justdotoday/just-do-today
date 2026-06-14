package com.example.just_do_today.habit.domain;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class DailyLog {
    private Long id;
    private Long memberId;
    private Long userHabitId;
    private LocalDate logDate;
    private String mood;
    private String note;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
