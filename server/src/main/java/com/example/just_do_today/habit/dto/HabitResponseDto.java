package com.example.just_do_today.habit.dto;

import com.example.just_do_today.habit.domain.enums.Frequency;
import com.example.just_do_today.habit.domain.enums.UserHabitStatus;
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
    private LocalDate startDate; // 습관 생성날짜(시작날짜)
    private Boolean isPublic;
    private String successChip; // 왼쪽 칩 : 예)"최근 7일 중 5일 성공", "주 2회
    private String statusChip; // // 오른쪽 칩: 예)"꾸준히 유지 중", "2일 쉬는
}
