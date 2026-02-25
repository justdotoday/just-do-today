package com.example.just_do_today.dto.habit;

import com.example.just_do_today.domain.Habit.Frequency;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CreateHabitRequestDto {
    private String name;
    private Long categoryId;
    private Frequency frequency;
    private List<Integer> days;
    private Boolean isPublic;
    private String color;

    @JsonFormat (shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;
}
