package com.example.just_do_today.mapper.category;

import com.example.just_do_today.domain.Habit.CategoryUser;
import org.apache.ibatis.annotations.*;

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
}
