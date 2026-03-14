package com.example.just_do_today.controller.habit;

import com.example.just_do_today.dto.habit.CreateHabitRequestDto;
import com.example.just_do_today.dto.habit.HabitResponseDto;
import com.example.just_do_today.dto.habit.UpdateHabitRequestDto;
import com.example.just_do_today.service.habit.HabitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
@RequiredArgsConstructor
public class HabitController {

    private final HabitService habitService;

    // 습관 생성 (JWT에서 memberId 추출)
    @PostMapping
    public ResponseEntity<String> createHabit(@AuthenticationPrincipal UserDetails userDetails,
                                              @RequestBody CreateHabitRequestDto dto) {
        Long memberId = Long.parseLong(userDetails.getUsername());
        habitService.createHabit(memberId, dto);
        return ResponseEntity.ok("습관 생성이 완료되었습니다!");
    }

    // 유저별 습관 조회 (JWT에서 memberId 추출)
    @GetMapping
    public ResponseEntity<List<HabitResponseDto>> getHabitList(@AuthenticationPrincipal UserDetails userDetails) {
        Long memberId = Long.parseLong(userDetails.getUsername());
        List<HabitResponseDto> habits = habitService.getHabitList(memberId);
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
    public ResponseEntity<String> updateHabit(@PathVariable Long id, @RequestBody UpdateHabitRequestDto dto) {
        habitService.updateHabit(id, dto);
        return ResponseEntity.ok("습관 수정이 완료되었습니다!");
    }

    // 습관 삭제 (JWT에서 memberId 추출)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHabit(@AuthenticationPrincipal UserDetails userDetails,
                                              @PathVariable("id") Long userHabitId) {
        Long memberId = Long.parseLong(userDetails.getUsername());
        habitService.deleteHabit(memberId, userHabitId);
        return ResponseEntity.ok("습관 삭제가 완료되었습니다!");
    }
}
