package com.example.just_do_today.dto.userCategory;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryManageResDto {
    private Long categoryUserId; //category_user.id
    private String name; // 유저 커스텀 이름 or 기본 카테고리이름
    private String emoji;
    private int habitCount; //해당 카테고리에 속한 습관 수
}
