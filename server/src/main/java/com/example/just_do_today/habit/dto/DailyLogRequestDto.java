package com.example.just_do_today.habit.dto;

import com.example.just_do_today.habit.domain.enums.DailyLogMood;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DailyLogRequestDto {
    private Long userHabitId;
    private LocalDate logDate;
    private DailyLogMood mood;
    private String note;
}
