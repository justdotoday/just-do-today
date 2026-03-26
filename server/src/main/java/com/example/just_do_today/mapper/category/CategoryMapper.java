package com.example.just_do_today.mapper.category;

import com.example.just_do_today.domain.Habit.Category;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CategoryMapper {

    @Select("""
        SELECT * FROM category 
        WHERE member_id IS NULL OR member_id = #{memberId} 
        ORDER BY display_order ASC, created_at DESC
    """)
    List<Category> findAllByMemberId(@Param("memberId") Long memberId);

    @Insert("""
        INSERT INTO category (name, emoji, member_id, created_at, updated_at)
        VALUES (#{name}, #{emoji}, #{memberId}, NOW(), NOW())
    """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertUserCategory(Category category);

    @Delete("DELETE FROM category WHERE id = #{id} AND member_id = #{memberId}")
    int deleteUserCategory(@Param("id") Long id, @Param("memberId") Long memberId);
    
    @Select("SELECT * FROM category WHERE id = #{id}")
    Category findById(Long id);
}
