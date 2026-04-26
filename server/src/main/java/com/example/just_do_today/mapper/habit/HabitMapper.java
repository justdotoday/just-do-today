package com.example.just_do_today.mapper.habit;

import com.example.just_do_today.domain.Habit.HabitHistory;
import com.example.just_do_today.domain.Habit.UserHabit;
import com.example.just_do_today.domain.Habit.UserHabitSchedule;
import com.example.just_do_today.dto.habit.HabitResponseDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface HabitMapper {

    // 1. 습관 생성
    // 유저-습관 연결 정보 저장
    void saveUserHabit(UserHabit userHabit);
    // 요일 저장
    void saveSchedule(UserHabitSchedule userHabitSchedule);

    // 2. 습관 목록 조회 (date 기준 habit_history status 포함)
    List<HabitResponseDto> findAllByMemberId(@Param("memberId") Long memberId, @Param("date") LocalDate date);
    HabitResponseDto findByUserHabitId(Long userHabitId);

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

    // 특정 습관의 DONE 기록 날짜 목록 조회 (연속 성공 일수 계산용, 최신순)
    List<LocalDate> findDoneHistoryDates(Long userHabitId);

    // 유저-습관 상태 및 프리즈 해제 날짜 업데이트
    void updateUserHabitStatusAndFrozenUntil(UserHabit userHabit);

    // 4. 습관 삭제
    void deleteUserHabit(Long id);
    void deleteSchedulesByUserHabitId(Long userHabitId);
    void deleteHistoriesByUserHabitId(Long userHabitId);
    void deleteDailyLogsByUserHabitId(Long userHabitId);

    // 5. 습관 수정
    void updateUserHabit(UserHabit userHabit);
}
