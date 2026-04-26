package com.example.just_do_today.controller.habit;

import com.example.just_do_today.dto.habit.CreateHabitRequestDto;
import com.example.just_do_today.dto.habit.HabitResponseDto;
import com.example.just_do_today.dto.habit.UpdateHabitRequestDto;
import com.example.just_do_today.global.security.UserPrincipal;
import com.example.just_do_today.service.habit.HabitService;
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

    // 습관별 조회 userHabitId
    @GetMapping("/{id}")
    public ResponseEntity<HabitResponseDto> getHabit(@PathVariable Long id) {
        HabitResponseDto habit = habitService.getHabit(id);
        return ResponseEntity.ok(habit);
    }

    // 습관 수정 userHabitId
    @PutMapping("/{id}")
    public ResponseEntity<String> updateHabit(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id, @RequestBody UpdateHabitRequestDto dto) {
        habitService.updateHabit(principal.getMemberId(), id, dto);
        return ResponseEntity.ok("습관 수정이 완료되었습니다!");
    }

    // 습관 삭제 userHabitId
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHabit(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id) {
        habitService.deleteHabit(principal.getMemberId(), id);
        return ResponseEntity.ok("습관 삭제가 완료되었습니다!");
    }


}
