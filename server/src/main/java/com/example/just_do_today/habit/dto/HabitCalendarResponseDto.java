package com.example.just_do_today.habit.dto;


import lombok.Data;

import java.util.List;


// Get /api/habits/{id}/calendar 응답 DTO
@Data
public class HabitCalendarResponseDto {
    private int year;
    private int month;
    //헤더 칩 3종
    private long elapsedDays;   // 습관 시작일부터 오늘까지 경과일(시작일 포함)
    private int streakDays;    //현재 연속 성공일
    private boolean isCompletedToday;   // 오늘 완료 여부
    //하단 통계 2종
    private int thisMonthCount; // 이번 달 실천일
    private int totalCount; // 누적 실천일
    private List<HabitCalendarDayDto> days;
}
