package com.example.just_do_today.mapper.habit;

import com.example.just_do_today.domain.Habit.Habit;
import com.example.just_do_today.domain.Habit.UserHabit;
import com.example.just_do_today.domain.Habit.UserHabitSchedule;
import com.example.just_do_today.dto.habit.HabitResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HabitMapper {
    // 습관 기본 정보 저장
    void saveHabit(Habit habit);
    // 유저-습관 연결 정보 저장
    void saveUserHabit(UserHabit userHabit);
    // 요일 저장
    void saveSchedule(UserHabitSchedule userHabitSchedule);
    // 카테고리 연결 저장
    void saveHabitCategory(Long habitId, Long categoryId);

    // 습관 목록 조회
    List<HabitResponseDto> findAllByMemberId(Long memberId);
}
