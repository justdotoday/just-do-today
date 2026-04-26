package com.example.just_do_today.dto.habit;

import com.example.just_do_today.domain.Habit.Enum.Frequency;
import com.example.just_do_today.domain.Habit.Enum.UserHabitStatus;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class HabitResponseDto {
    private Long id;
    private String name;
    private String color;
    private Long categoryId;
    private String category;
    private String emoji;
    private Frequency frequency;
    private List<Integer> days;
    private UserHabitStatus status;
    private LocalDate frozenUntil;
    private String todayStatus; // 오늘 날짜의 habit_history.status (DONE / HEART / null)
}
