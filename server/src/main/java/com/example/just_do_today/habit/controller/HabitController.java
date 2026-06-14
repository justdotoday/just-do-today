package com.example.just_do_today.habit.controller;

import com.example.just_do_today.habit.dto.CreateHabitRequestDto;
import com.example.just_do_today.habit.dto.HabitResponseDto;
import com.example.just_do_today.habit.dto.HeatmapResponseDto;
import com.example.just_do_today.habit.dto.UpdateHabitRequestDto;
import com.example.just_do_today.global.security.UserPrincipal;
import com.example.just_do_today.habit.service.HabitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/habits")
@RequiredArgsConstructor
public class HabitController {

    private final HabitService habitService;

    // 습관 생성
    @PostMapping
    public ResponseEntity<String> createHabit(@AuthenticationPrincipal UserPrincipal principal, @RequestBody CreateHabitRequestDto dto) {
        habitService.createHabit(principal.getMemberId(), dto);
        return ResponseEntity.ok("습관 생성이 완료되었습니다!");
    }

    // 유저별 습관 조회 (date 기준 habit_history status 포함, 미전달 시 오늘 날짜 기본값)
    @GetMapping
    public ResponseEntity<List<HabitResponseDto>> getHabitList(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(required = false) LocalDate date) {
        LocalDate targetDate = (date != null) ? date : LocalDate.now();
        List<HabitResponseDto> habits = habitService.getHabitList(principal.getMemberId(), targetDate);
        return ResponseEntity.ok(habits);
    }

    // 습관별 조회
    @GetMapping("/{userHabitId}")
    public ResponseEntity<HabitResponseDto> getHabit(@PathVariable Long userHabitId) {
        HabitResponseDto habit = habitService.getHabit(userHabitId);
        return ResponseEntity.ok(habit);
    }

    // 습관 수정
    @PutMapping("/{userHabitId}")
    public ResponseEntity<String> updateHabit(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long userHabitId, @RequestBody UpdateHabitRequestDto dto) {
        habitService.updateHabit(principal.getMemberId(), userHabitId, dto);
        return ResponseEntity.ok("습관 수정이 완료되었습니다!");
    }

    // 습관 삭제
    @DeleteMapping("/{userHabitId}")
    public ResponseEntity<String> deleteHabit(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long userHabitId) {
        habitService.deleteHabit(principal.getMemberId(), userHabitId);
        return ResponseEntity.ok("습관 삭제가 완료되었습니다!");
    }

    // 캘린더: 월별 날짜별 완료 습관 갯수 조회
    @GetMapping("/calendar")
    public ResponseEntity<HeatmapResponseDto> getCalendar(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(habitService.getCalendar(principal.getMemberId(), year, month));
    }

}
