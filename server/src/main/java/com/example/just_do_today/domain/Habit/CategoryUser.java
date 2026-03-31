package com.example.just_do_today.domain.Habit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryUser {
    private Long id;
    private Long categoryId;
    private Long memberId;
    private String emoji;
    private LocalDateTime createdAt;
}
