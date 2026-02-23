package com.example.just_do_today.dto.habit;

import com.example.just_do_today.domain.Habit.UserHabitStatus;
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
    private String frequency;
    private List<Integer> days;
    private UserHabitStatus status;
    private LocalDate frozenUntil;
}
