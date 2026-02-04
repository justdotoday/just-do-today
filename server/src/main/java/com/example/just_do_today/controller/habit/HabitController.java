package com.example.just_do_today.controller.habit;

import com.example.just_do_today.dto.habit.CreateHabitRequestDto;
import com.example.just_do_today.dto.habit.HabitResponseDto;
import com.example.just_do_today.service.habit.HabitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> createHabit(@RequestBody CreateHabitRequestDto dto) {

        // 임시
        Long memberId = 1L;

        habitService.createHabit(memberId, dto);

        return ResponseEntity.ok("습관 생성이 완료되었습니다!");
    }

    // 습관 조회
    @GetMapping
    public ResponseEntity<List<HabitResponseDto>> getHabitList() {

        // 임시
        Long memberId = 1L;

        List<HabitResponseDto> habits = habitService.getHabitList(memberId);

        return ResponseEntity.ok(habits);

    }

    // 습관 완료 처리
    @PostMapping("/{habitId}/check")
    public ResponseEntity<String> checkHabit(
            @PathVariable Long habitId,
            @RequestParam(required = false) String date
    ) {
        // 날짜가 안오면 오늘로 처리
        LocalDate checkDate = (date != null)
                ? LocalDate.parse(date) : LocalDate.now();

        String result = habitService.checkHabit(habitId, checkDate);
        return ResponseEntity.ok(result);
    }
}
