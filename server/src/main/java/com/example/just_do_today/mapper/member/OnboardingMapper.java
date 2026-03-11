package com.example.just_do_today.mapper.member;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OnboardingMapper {
    void insertGoal(@Param("memberId") Long memberId, @Param("goal") String goal);
}
