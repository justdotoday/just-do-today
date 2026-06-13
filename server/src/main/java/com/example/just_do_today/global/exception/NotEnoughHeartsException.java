package com.example.just_do_today.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// 보유한 '하트(heart)' 개수가 부족해 습관 완료 처리(하트 사용)를 적용할 수 없을 때 발생
// @ResponseStatus로 지정해 GlobalExceptionHandler에 별도 핸들러 없이도 400 응답으로 변환됨
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotEnoughHeartsException extends RuntimeException {
    public NotEnoughHeartsException(String message) {
        super(message);
    }
}