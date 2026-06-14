package com.example.just_do_today.habit.service;

import com.example.just_do_today.habit.domain.DailyLog;
import com.example.just_do_today.habit.dto.DailyLogRequestDto;
import com.example.just_do_today.habit.mapper.DailyLogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

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

}
