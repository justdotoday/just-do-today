package com.example.just_do_today.dto.habit;

import lombok.Data;

import java.util.List;

@Data
public class HabitResponseDto {
    private Long id;
    private String name;
    private String category;
    private String frequency;
    private List<Integer> days;
    private String status;
}
