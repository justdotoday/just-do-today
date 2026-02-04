package com.example.just_do_today.controller.habit;

import com.example.just_do_today.domain.Habit.DailyLog;
import com.example.just_do_today.dto.habit.DailyLogRequestDto;
import com.example.just_do_today.service.habit.DailyLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/daily-logs")
@RequiredArgsConstructor
public class DailyLogController {

    private final DailyLogService dailyLogService;

    // 1. 기록 저장
    @PostMapping
    public ResponseEntity<String> createDailyLog(@RequestBody DailyLogRequestDto dto) {
        Long memberId = 1L;
        dailyLogService.createDailyLog(memberId, dto);
        return ResponseEntity.ok("오늘의 습관 기록을 완료했습니다.");
    }
    // 2. 특정 습관에 오늘 기록이 있는지 조회
    @GetMapping("/today")
    public ResponseEntity<DailyLog> getLog(@RequestParam Long userHabitId, @RequestParam String date) {
        Long memberId=1L;
        return ResponseEntity.ok(dailyLogService.getLog(memberId, userHabitId, LocalDate.parse(date)));
    }

}
