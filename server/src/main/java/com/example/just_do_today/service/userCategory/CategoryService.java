package com.example.just_do_today.service.userCategory;

import com.example.just_do_today.domain.Habit.Category;
import com.example.just_do_today.domain.Habit.CategoryUser;
import com.example.just_do_today.dto.userCategory.CategoryAddReqDto;
import com.example.just_do_today.dto.userCategory.CategoryManageResDto;
import com.example.just_do_today.dto.userCategory.CategoryUpdateReqDto;
import com.example.just_do_today.dto.userCategory.UserCategoryResDto;
import com.example.just_do_today.mapper.category.CategoryMapper;
import com.example.just_do_today.mapper.category.CategoryUserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryUserMapper categoryUserMapper;
    private final CategoryMapper categoryMapper;

    // 기존 유지 (습관 생성 시 카테고리 조회용)
    public List<UserCategoryResDto> getUserCategories(Long memberId) {
        return categoryUserMapper.findAllWithCategoryByMemberId(memberId);
    }

    // 카테고리 관리 화면용 목록 (습관 수 포함)
    public List<CategoryManageResDto> getManagedCategories(Long memberId) {
        return categoryUserMapper.findAllWithCountByMemberId(memberId);
    }

    // 카테고리 추가
    @Transactional
    public void addCategory(Long memberId, CategoryAddReqDto dto) {
        // 동일 이름의 category 없으면 생성
        Category category = categoryMapper.findByName(dto.getName());
        if (category == null) {
            category = new Category();
            category.setName(dto.getName());
            categoryMapper.insertCategory(category);
        }

        // 이미 해당 카테고리를 보유 중이면 중복 방지
        CategoryUser existing = categoryUserMapper.findByCategoryIdAndMemberId(category.getId(), memberId);
        if (existing != null) {
            throw new IllegalArgumentException("이미 존재하는 카테고리입니다.");
        }

        // category_user 생성
        CategoryUser newCategoryUser = CategoryUser.builder()
                .categoryId(category.getId())
                .memberId(memberId)
                .emoji(dto.getEmoji())
                .name(dto.getName())
                .build();
        categoryUserMapper.insertCategoryUser(newCategoryUser);
    }

    // 카테고리 수정
    @Transactional
    public void updateCategory(Long memberId, Long categoryUserId, CategoryUpdateReqDto dto) {
        CategoryUser categoryUser = categoryUserMapper.findById(categoryUserId);
        if (categoryUser == null) throw new IllegalArgumentException("존재하지 않는 카테고리입니다.");
        if (!categoryUser.getMemberId().equals(memberId)) throw new IllegalArgumentException("본인의 카테고리만 수정할 수 있습니다.");

        categoryUserMapper.updateNameAndEmoji(categoryUserId, dto.getName(), dto.getEmoji());
    }

    // 카테고리 삭제
    @Transactional
    public void deleteCategory(Long memberId, Long categoryUserId) {
        CategoryUser categoryUser = categoryUserMapper.findById(categoryUserId);
        if (categoryUser == null) throw new IllegalArgumentException("존재하지 않는 카테고리입니다.");
        if (!categoryUser.getMemberId().equals(memberId)) throw new IllegalArgumentException("본인의 카테고리만 삭제할 수 있습니다.");

        // 하위 습관이 있으면 삭제 불가
        int habitCount = categoryUserMapper.countHabitsByCategoryUserId(categoryUserId);
        if (habitCount > 0) throw new IllegalArgumentException("습관이 있는 카테고리는 삭제할 수 없습니다.");

        categoryUserMapper.deleteById(categoryUserId);
    }
}
