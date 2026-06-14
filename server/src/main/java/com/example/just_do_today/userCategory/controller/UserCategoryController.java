package com.example.just_do_today.userCategory.controller;

import com.example.just_do_today.userCategory.dto.CategoryAddReqDto;
import com.example.just_do_today.userCategory.dto.CategoryManageResDto;
import com.example.just_do_today.userCategory.dto.CategoryUpdateReqDto;
import com.example.just_do_today.userCategory.dto.UserCategoryResDto;
import com.example.just_do_today.global.security.UserPrincipal;
import com.example.just_do_today.userCategory.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class UserCategoryController {

    private final CategoryService categoryService;

    // 기존 유지 (습관 생성 시 카테고리 조회용)
    @GetMapping("/user")
    public ResponseEntity<List<UserCategoryResDto>> getUserCategories(
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(categoryService.getUserCategories(principal.getMemberId()));
    }

    // 카테고리 관리 화면용 목록 (습관 수 포함)
    @GetMapping("/manage")
    public ResponseEntity<List<CategoryManageResDto>> getManagedCategories(
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(categoryService.getManagedCategories(principal.getMemberId()));
    }

    // 카테고리 추가
    @PostMapping("/user")
    public ResponseEntity<String> addCategory(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody @Valid CategoryAddReqDto dto) {
        categoryService.addCategory(principal.getMemberId(), dto);
        return ResponseEntity.ok("카테고리가 추가되었습니다.");
    }

    // 카테고리 수정
    @PutMapping("/user/{categoryUserId}")
    public ResponseEntity<String> updateCategory(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long categoryUserId,
            @RequestBody @Valid CategoryUpdateReqDto dto) {
        categoryService.updateCategory(principal.getMemberId(), categoryUserId, dto);
        return ResponseEntity.ok("카테고리가 수정되었습니다.");
    }

    // 카테고리 삭제
    @DeleteMapping("/user/{categoryUserId}")
    public ResponseEntity<String> deleteCategory(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long categoryUserId) {
        categoryService.deleteCategory(principal.getMemberId(), categoryUserId);
        return ResponseEntity.ok("카테고리가 삭제되었습니다.");
    }
}
