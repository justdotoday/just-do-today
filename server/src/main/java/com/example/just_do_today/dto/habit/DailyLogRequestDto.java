package com.example.just_do_today.dto.habit;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DailyLogRequestDto {
    private Long userHabitId;
    private LocalDate date;
    private String mood;
    private String note;
}
