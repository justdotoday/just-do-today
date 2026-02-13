package com.example.just_do_today.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotEnoughHeartsException extends RuntimeException {
    public NotEnoughHeartsException(String message) {
        super(message);
    }
}