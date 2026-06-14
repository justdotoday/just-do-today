package com.example.just_do_today.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// 요청한 memberId(혹은 식별자)에 해당하는 회원을 찾을 수 없을 때 발생
// @ResponseStatus + GlobalExceptionHandler의 handleMemberNotFound가 함께 작동해 404 응답으로 변환됨
@ResponseStatus(HttpStatus.NOT_FOUND)
public class MemberNotFoundException extends RuntimeException {
    public MemberNotFoundException(String message) {
        super(message);
    }
}
