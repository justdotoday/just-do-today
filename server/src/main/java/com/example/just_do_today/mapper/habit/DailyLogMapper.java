package com.example.just_do_today.mapper.habit;

import com.example.just_do_today.domain.Habit.DailyLog;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;

@Mapper
public interface DailyLogMapper {

    // 습관 수행 기록 생성
    void saveDailyLog(DailyLog dailyLog);

    DailyLog findLogByHabitAndDate(Long memberId, Long userHabitId, LocalDate logDate);

}
