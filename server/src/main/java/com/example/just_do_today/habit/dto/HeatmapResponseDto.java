package com.example.just_do_today.habit.dto;

import lombok.Data;

import java.util.List;

@Data
public class HeatmapResponseDto {
    private int year;
    private int month;
    private List<HeatmapDayDto> days;
}
