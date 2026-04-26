package com.example.just_do_today.controller.userCategory;

import com.example.just_do_today.dto.userCategory.UserCategoryResDto;
import com.example.just_do_today.global.security.UserPrincipal;
import com.example.just_do_today.service.userCategory.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class UserCategoryController { // 습관생성시 기존 카테고리 조회

    private final CategoryService categoryService;

    @GetMapping("/user")
    public ResponseEntity<List<UserCategoryResDto>> getUserCategories(
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(categoryService.getUserCategories(principal.getMemberId()));
    }
}