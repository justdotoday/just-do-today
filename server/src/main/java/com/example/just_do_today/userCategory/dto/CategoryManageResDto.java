package com.example.just_do_today.userCategory.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryManageResDto {
    private Long categoryUserId;
    private String name;
    private String emoji;
    private int habitCount;
}
