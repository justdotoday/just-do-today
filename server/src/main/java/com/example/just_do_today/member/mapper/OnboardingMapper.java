package com.example.just_do_today.member.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OnboardingMapper {
    void insertGoal(@Param("memberId") Long memberId, @Param("goal") String goal);
    Boolean findOnboardingCompleteById(@Param("memberId") Long memberId);
    void updateOnboardingCompleted(@Param("memberId") Long memberId, @Param("completed") Boolean completed);
}
