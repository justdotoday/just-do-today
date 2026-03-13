package com.example.just_do_today.domain.Habit;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class userCategory {
    private Long id;
    private Long memberId;
    private String name;
    private String emoji;
    private LocalDateTime createdAt;
}
