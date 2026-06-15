package com.example.just_do_today.habit.domain;


import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class UserHabitFreezeHistory {
    private Long id;
    private Long userHabitId;
    private LocalDate frozenFrom;
    private LocalDate frozenUntil;
    private LocalDateTime createdAt;
}
