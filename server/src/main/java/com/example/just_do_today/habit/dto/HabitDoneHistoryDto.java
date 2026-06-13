package com.example.just_do_today.habit.dto;

import lombok.Data;

import java.time.LocalDate;

// 여러 습관의 완료 기록을 한 번에 조회할 때 사용하는 배치 조회용 DTO
@Data
public class HabitDoneHistoryDto {
    private Long userHabitId;
    private LocalDate checkDate;
}
