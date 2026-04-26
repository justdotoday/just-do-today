package com.example.just_do_today.mapper.category;

import com.example.just_do_today.domain.Habit.CategoryUser;
import com.example.just_do_today.dto.userCategory.UserCategoryResDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CategoryUserMapper {

    @Insert("""
        INSERT INTO category_user (category_id, member_id, emoji, created_at)
        VALUES (#{categoryId}, #{memberId}, #{emoji}, NOW())
    """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertCategoryUser(CategoryUser categoryUser);

    @Select("""
        SELECT * FROM category_user
        WHERE category_id = #{categoryId} AND member_id = #{memberId}
    """)
    CategoryUser findByCategoryIdAndMemberId(@Param("categoryId") Long categoryId, @Param("memberId") Long memberId);

    @Select("SELECT * FROM category_user WHERE id = #{id}")
    CategoryUser findById(Long id);

    @Delete("DELETE FROM category_user WHERE id = #{id}")
    void deleteById(Long id);

    @Select("""
    SELECT c.id AS categoryId, c.name AS categoryName, cu.emoji
    FROM category_user cu
    JOIN category c ON cu.category_id = c.id
    WHERE cu.member_id = #{memberId}
""")
    @Results({
            @Result(property = "categoryId", column = "categoryId"),
            @Result(property = "categoryName", column = "categoryName"),
            @Result(property = "emoji", column = "emoji")
    })
    List<UserCategoryResDto>findAllWithCategoryByMemberId(Long memberId);
}
