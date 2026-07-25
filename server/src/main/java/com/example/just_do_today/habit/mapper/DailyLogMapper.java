package com.example.just_do_today.habit.mapper;

import com.example.just_do_today.habit.domain.DailyLog;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface DailyLogMapper {

    // 습관 수행 기록 생성
    void saveDailyLog(DailyLog dailyLog);

    DailyLog findLogByHabitAndDate(Long memberId, Long userHabitId, LocalDate logDate);

    // 특정 습관의 특정 월 데일리 로그 조회 (캘린더 mood 표시용)
    List<DailyLog> findLogsByHabitAndMonth(
            @Param("userHabitId") Long userHabitId,
            @Param("year") int year,
            @Param("month") int month
    );
}

