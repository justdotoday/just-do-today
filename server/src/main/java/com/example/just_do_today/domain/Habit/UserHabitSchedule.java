package com.example.just_do_today.domain.Habit;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserHabitSchedule {
    private Long id;
    private Long userHabitId;
    private Integer dayOfWeek;
    private Integer timesPerWeek;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
