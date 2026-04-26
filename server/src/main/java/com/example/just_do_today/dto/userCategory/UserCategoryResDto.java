package com.example.just_do_today.dto.userCategory;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserCategoryResDto { // 기존 카테고리 응답 DTO
    Long categoryId;
    String categoryName;
    String emoji;
}
