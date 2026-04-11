package com.example.just_do_today.mapper.category;

import com.example.just_do_today.domain.Habit.Category;
import org.apache.ibatis.annotations.*;

@Mapper
public interface CategoryMapper {

    @Insert("""
        INSERT INTO category (name, created_at, updated_at)
        VALUES (#{name}, NOW(), NOW())
    """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertCategory(Category category);

    @Delete("DELETE FROM category WHERE id = #{id}")
    int deleteCategory(Long id);
    
    @Select("SELECT * FROM category WHERE id = #{id}")
    Category findById(Long id);

    @Select("SELECT * FROM category WHERE name = #{name}")
    Category findByName(String name);
}
