package com.example.just_do_today.userCategory.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserCategoryResDto {
    Long categoryId;
    String categoryName;
    String emoji;
}
