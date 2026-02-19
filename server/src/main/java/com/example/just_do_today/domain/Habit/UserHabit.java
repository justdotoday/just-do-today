package com.example.just_do_today.domain.Habit;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class UserHabit {
    private Long id;
    private Long memberId;
    private Long habitId;
    private String status;
    private String frequency;
    private LocalDate startDate;
    private String color;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
