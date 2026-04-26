package com.example.just_do_today.service.userCategory;

import com.example.just_do_today.dto.userCategory.UserCategoryResDto;
import com.example.just_do_today.mapper.category.CategoryUserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryUserMapper categoryUserMapper;

    public List<UserCategoryResDto> getUserCategories(Long memberId) {
        return categoryUserMapper.findAllWithCategoryByMemberId(memberId);
    }
}
