package com.example.just_do_today.domain.Habit;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Habit {
    private Long id;
    private String name;
    private String isPublic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

