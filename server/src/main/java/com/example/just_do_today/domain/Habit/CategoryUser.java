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
    private String name; // 추가 : 유저 커스텀 이름(null이면 category.name 사용)
    private LocalDateTime createdAt;
}
