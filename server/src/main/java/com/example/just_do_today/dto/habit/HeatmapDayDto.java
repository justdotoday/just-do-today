package com.example.just_do_today.dto.habit;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HeatmapDayDto {
    private LocalDate date;
    private String mood;
}
