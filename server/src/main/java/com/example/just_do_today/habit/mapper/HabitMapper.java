package com.example.just_do_today.habit.mapper;

import com.example.just_do_today.habit.domain.HabitHistory;
import com.example.just_do_today.habit.domain.UserHabit;
import com.example.just_do_today.habit.domain.UserHabitFreezeHistory;
import com.example.just_do_today.habit.domain.UserHabitSchedule;
import com.example.just_do_today.habit.dto.HabitDoneHistoryDto;
import com.example.just_do_today.habit.dto.HabitResponseDto;
import com.example.just_do_today.habit.dto.HeatmapDayDto;
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

    // 여러 습관의 완료 기록을 한 번에 조회 (N+1 방지, 최신순)
    List<HabitDoneHistoryDto> findDoneHistoryByHabitIds(@Param("habitIds") List<Long> habitIds);

    // 유저-습관 상태 및 프리즈 해제 날짜 업데이트
    void updateUserHabitStatusAndFrozenUntil(UserHabit userHabit);

    // 4. 습관 삭제
    void deleteUserHabit(Long id);
    void deleteSchedulesByUserHabitId(Long userHabitId);
    void deleteHistoriesByUserHabitId(Long userHabitId);
    void deleteDailyLogsByUserHabitId(Long userHabitId);

    // 5. 습관 수정
    void updateUserHabit(UserHabit userHabit);

    // 월별 날짜별 완료 습관 개수 조회 (Done + Heart)
    List<HeatmapDayDto>
    findDailyCompletionCount(
            @Param("memberId") Long memberId,
            @Param("year") int year,
            @Param("month") int month
    );

    // freeze 이력 저장
    void insertFreezeHistory(UserHabitFreezeHistory freezeHistory);

    // 캘린더 : 특정 습관의 특정 월 habit_history 조회
    List<HabitHistory> findHistoriesByMonth(
            @Param("userHabitId") Long userHabitId,
            @Param("year") int year,
            @Param("month") int month
    );

    // 캘린더 : 해당 월과 겹치는 freeze 이력 조회
    List<UserHabitFreezeHistory> findFreezeHistoriesByMonth(
            @Param("userHabitId") Long userHabitId,
            @Param("firstDay") LocalDate firstDay,
            @Param("lastDay") LocalDate lastDay
    );

    // 이번 달 실천일 수 (DONE + HEART)
    int countCompletionsByMonth(
            @Param("userHabitId") Long userHabitId,
            @Param("year") int year,
            @Param("month") int month
    );

    // 누적 실천일 수
    int countTotalCompletions(Long userHabitId);
}
