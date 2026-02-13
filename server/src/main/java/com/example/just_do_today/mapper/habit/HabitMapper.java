package com.example.just_do_today.mapper.habit;

import com.example.just_do_today.domain.Habit.Habit;
import com.example.just_do_today.domain.Habit.HabitHistory;
import com.example.just_do_today.domain.Habit.UserHabit;
import com.example.just_do_today.domain.Habit.UserHabitSchedule;
import com.example.just_do_today.dto.habit.HabitResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface HabitMapper {

    // 1. 습관 생성
    // 습관 기본 정보 저장
    void saveHabit(Habit habit);
    // 유저-습관 연결 정보 저장
    void saveUserHabit(UserHabit userHabit);
    // 요일 저장
    void saveSchedule(UserHabitSchedule userHabitSchedule);
    // 카테고리 연결 저장
    void saveHabitCategory(Long habitId, Long categoryId);

    // 2. 습관 목록 조회
    List<HabitResponseDto> findAllByMemberId(Long memberId);

    //3. 습관 완료 처리
    // 완료
    void insertHistory (HabitHistory history);
    // 취소
    void deleteHistory (Long userHabitId, LocalDate checkDate);
    // 완료처리 여부 확인
    boolean existsByDate(Long userHabitId, LocalDate checkDate);

    // 유저-습관 ID로 조회
    UserHabit findUserHabitById(Long id);

    // 유저의 습관 완료 기록 조회
    HabitHistory findHistoryByHabitIdAndDate(Long userHabitId, LocalDate checkDate);
}
