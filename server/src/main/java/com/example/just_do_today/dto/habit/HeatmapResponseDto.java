package com.example.just_do_today.dto.habit;

import lombok.Data;

import java.util.List;

@Data
public class HeatmapResponseDto {
    private int year;
    private int month;
    private List<HeatmapDayDto> days;
}
