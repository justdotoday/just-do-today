package com.example.just_do_today.controller.habit;

import com.example.just_do_today.global.exception.MemberNotFoundException;
import com.example.just_do_today.global.exception.NotEnoughFreezesException;
import com.example.just_do_today.global.exception.NotEnoughHeartsException;
import com.example.just_do_today.service.habit.UserHabitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user-habits")
@RequiredArgsConstructor
public class UserHabitController {

    private final UserHabitService userHabitService;

    // 습관 완료/취소 토글
    @PostMapping("/{userHabitId}/done")
    public ResponseEntity<String> toggleCompletion(
            @RequestHeader("X-MEMBER-ID") Long memberId,
            @PathVariable Long userHabitId
    ) {
        String result = userHabitService.toggleCompletion(userHabitId);
        return ResponseEntity.ok(result);
    }

    // 하트 사용/취소 토글
    @PostMapping("/{userHabitId}/heart")
    public ResponseEntity<String> toggleHeart(@RequestHeader("X-MEMBER-ID") Long memberId, @PathVariable Long userHabitId) {
        try {
            userHabitService.toggleHeart(memberId, userHabitId);
            return ResponseEntity.ok("하트 상태가 변경되었습니다.");
        } catch (NotEnoughHeartsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (MemberNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // 프리즈 사용/취소 토글
    @PostMapping("/{userHabitId}/freeze")
    public ResponseEntity<String> toggleFreeze(
            @RequestHeader("X-MEMBER-ID") Long memberId,
            @PathVariable Long userHabitId,
            @RequestParam Integer postponeDays
    ) {
        try {
            userHabitService.toggleFreeze(memberId, userHabitId, postponeDays);
            return ResponseEntity.ok("프리즈 상태가 변경되었습니다.");
        } catch (NotEnoughFreezesException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (MemberNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
