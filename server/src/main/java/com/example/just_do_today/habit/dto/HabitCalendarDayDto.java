package com.example.just_do_today.habit.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class HabitCalendarDayDto {
    private LocalDate date;
    // ATTEMPT / MAINTAIN / PERFECT / HEART / ICE / TODAY
    private String status;
}
