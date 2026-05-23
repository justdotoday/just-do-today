package com.example.just_do_today.mapper.habit;

import com.example.just_do_today.domain.Habit.DailyLog;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface DailyLogMapper {

    // 습관 수행 기록 생성
    void saveDailyLog(DailyLog dailyLog);

    DailyLog findLogByHabitAndDate(Long memberId, Long userHabitId, LocalDate logDate);

    // 히트맵: 습관별 월간 daily_log 조회
    List<DailyLog> findLogsByHabitIdAndYearMonth(
            @Param("userHabitId") Long userHabitId,
            @Param("year") int year,
            @Param("month") int month
    );

}
