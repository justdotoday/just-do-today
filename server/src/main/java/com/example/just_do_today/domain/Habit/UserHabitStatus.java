package com.example.just_do_today.domain.Habit;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserHabitStatus {
    ACTIVE("active"),
    FREEZE("freeze");

    private final String value;
}
