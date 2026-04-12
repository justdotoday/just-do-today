package com.example.just_do_today.service.habit;

import com.example.just_do_today.domain.Habit.HabitHistory;
import com.example.just_do_today.domain.Habit.Enum.HabitHistoryStatus;
import com.example.just_do_today.domain.Habit.UserHabit;
import com.example.just_do_today.domain.Habit.Enum.UserHabitStatus;
import com.example.just_do_today.domain.Member;
import com.example.just_do_today.mapper.habit.HabitMapper;
import com.example.just_do_today.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserHabitService {

    private final HabitMapper habitMapper;
    private final MemberService memberService;

    // 습관 완료/취소 토글
    @Transactional
    public String toggleCompletion(Long memberId, Long userHabitId) {
        UserHabit userHabit = habitMapper.findUserHabitById(userHabitId);

        // 1. 습관 존재 여부 확인
        if (userHabit == null) {
            throw new IllegalArgumentException("존재하지 않는 습관입니다.");
        }

        // 2. 본인 습관 여부 확인
        if (!userHabit.getMemberId().equals(memberId)) {
            throw new IllegalArgumentException("본인의 습관만 완료/취소할 수 있습니다.");
        }

        // 3. 습관 상태 확인 (ACTIVE 상태일 때만 가능)
        if (userHabit.getStatus() != UserHabitStatus.ACTIVE) {
            throw new IllegalArgumentException("활성 상태의 습관만 완료/취소할 수 있습니다.");
        }

        LocalDate today = LocalDate.now();
        HabitHistory existingHistory = habitMapper.findHistoryByHabitIdAndDate(userHabitId, today);

        if (existingHistory == null) {
            // 완료 처리
            HabitHistory newHistory = new HabitHistory();
            newHistory.setUserHabitId(userHabitId);
            newHistory.setCheckDate(today);
            newHistory.setStatus(HabitHistoryStatus.DONE);
            habitMapper.insertHistory(newHistory);
            return "COMPLETED";
        } else if (existingHistory.getStatus() == HabitHistoryStatus.DONE) {
            // 완료 취소 처리
            habitMapper.deleteHistory(userHabitId, today);
            return "CANCELLED";
        } else {
            // 하트로 완료된 경우 변경하지 않음
            return "UNCHANGED";
        }
    }

    // 하트 사용
    @Transactional
    public void toggleHeart(Long memberId, Long userHabitId) {
        Member member = memberService.getMemberById(memberId);
        UserHabit userHabit = habitMapper.findUserHabitById(userHabitId);

        // 1. 습관 존재 여부 확인
        if (userHabit == null) {
            throw new IllegalArgumentException("존재하지 않는 습관입니다.");
        }

        // 2. 습관 상태 확인 (ACTIVE 상태일 때만 가능)
        if (userHabit.getStatus() != UserHabitStatus.ACTIVE) {
            throw new IllegalArgumentException("습관이 활성상태가 아닙니다.");
        }

        LocalDate today = LocalDate.now();
        HabitHistory existingHistory = habitMapper.findHistoryByHabitIdAndDate(userHabitId, today);

        if (existingHistory == null || existingHistory.getStatus() != HabitHistoryStatus.HEART) {
            // 하트 사용
            memberService.deductHeart(member);

            HabitHistory newHistory = new HabitHistory();
            newHistory.setUserHabitId(userHabitId);
            newHistory.setCheckDate(today);
            newHistory.setStatus(HabitHistoryStatus.HEART);
            habitMapper.insertHistory(newHistory);
        } else {
            // 하트 사용 철회
            memberService.addHeart(member);
            habitMapper.deleteHistory(userHabitId, today);
        }
    }

    // 프리즈 사용
    @Transactional
    public void toggleFreeze(Long memberId, Long userHabitId, Integer postponeDays) {
        if (postponeDays == null || postponeDays < 1 || postponeDays > 7) {
            throw new IllegalArgumentException("미루기는 7일이내로 가능합니다.");
        }

        Member member = memberService.getMemberById(memberId);
        UserHabit userHabit = habitMapper.findUserHabitById(userHabitId);

        // 1. 습관 존재 여부 확인
        if (userHabit == null) {
            throw new IllegalArgumentException("존재하지 않는 습관입니다.");
        }

        // 2. 상태에 따른 프리즈 로직 처리
        if (userHabit.getStatus() == UserHabitStatus.FREEZE) {
            // 프리즈를 활성 상태로 복구
            userHabit.setFrozenUntil(null);
            userHabit.setStatus(UserHabitStatus.ACTIVE);
        } else if (userHabit.getStatus() == UserHabitStatus.ACTIVE) {
            // 프리즈 사용
            memberService.deductFreeze(member);
            userHabit.setFrozenUntil(LocalDate.now().plusDays(postponeDays));
            userHabit.setStatus(UserHabitStatus.FREEZE);
        } else {
            throw new IllegalStateException("습관 상태를 확인해주세요.");
        }

        habitMapper.updateUserHabitStatusAndFrozenUntil(userHabit);
    }
}
