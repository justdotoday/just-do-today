package com.example.just_do_today.habit.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HeatmapDayDto {
    private LocalDate date;
    private int count;
}
