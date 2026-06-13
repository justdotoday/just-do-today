package com.example.just_do_today.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

// 컨트롤러 전역에서 발생하는 예외를 잡아 { "message": ... } 형태의 통일된 JSON 응답으로 변환
// (java-security.md 가이드에 따라 스택 트레이스 등 내부 정보는 노출하지 않고 메시지만 반환)
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 잘못된 인자 예외 → 400 (예: 색상 hex값이 잘못된 경우, 존재하지 않는 카테고리 참조 등)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", e.getMessage()));
    }

    // 잘못된 상태 예외 → 400 (예: 이미 온보딩을 완료한 회원이 다시 온보딩을 시도하는 경우)
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> handleIllegalState(IllegalStateException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", e.getMessage()));
    }

    // 회원을 찾을 수 없는 경우 → 404 (MemberNotFoundException 전용 핸들러)
    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleMemberNotFound(MemberNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", e.getMessage()));
    }
}
