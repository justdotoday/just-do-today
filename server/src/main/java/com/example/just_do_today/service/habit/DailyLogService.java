package com.example.just_do_today.service.habit;

import com.example.just_do_today.domain.Habit.DailyLog;
import com.example.just_do_today.dto.habit.DailyLogRequestDto;
import com.example.just_do_today.dto.habit.HeatmapDayDto;
import com.example.just_do_today.dto.habit.HeatmapResponseDto;
import com.example.just_do_today.mapper.habit.DailyLogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DailyLogService {

    private final DailyLogMapper dailyLogMapper;

    @Transactional
    public void createDailyLog(Long memberId, DailyLogRequestDto dto) {
        // 습관 수행 기록 저장
        DailyLog dailyLog = new DailyLog();
        dailyLog.setMemberId(memberId);

        // DTO의 데이터를 Domain으로 옮기기
        dailyLog.setUserHabitId(dto.getUserHabitId());
        dailyLog.setLogDate(dto.getLogDate());
        dailyLog.setMood(dto.getMood());
        dailyLog.setNote(dto.getNote());

        dailyLogMapper.saveDailyLog(dailyLog);
    }

    @Transactional(readOnly = true)
    public DailyLog getLog(Long memberId, Long userHabitId, LocalDate logDate) {
        return dailyLogMapper.findLogByHabitAndDate(memberId, userHabitId, logDate);
    }

    // 습관 개별 히트맵 조회 (월별 daily_log mood 반환)
    @Transactional(readOnly = true)
    public HeatmapResponseDto getHeatmap(Long userHabitId, int year, int month) {
        List<DailyLog> logs = dailyLogMapper.findLogsByHabitIdAndYearMonth(userHabitId, year, month);

        List<HeatmapDayDto> days = logs.stream()
                .map(log -> {
                    HeatmapDayDto dto = new HeatmapDayDto();
                    dto.setDate(log.getLogDate());
                    dto.setMood(log.getMood());
                    return dto;
                })
                .collect(Collectors.toList());

        HeatmapResponseDto response = new HeatmapResponseDto();
        response.setYear(year);
        response.setMonth(month);
        response.setDays(days);
        return response;
    }
}