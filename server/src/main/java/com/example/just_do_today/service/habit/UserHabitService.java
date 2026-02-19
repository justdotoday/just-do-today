package com.example.just_do_today.service.habit;

import com.example.just_do_today.domain.Habit.HabitHistory;
import com.example.just_do_today.domain.Habit.HabitHistoryStatus;
import com.example.just_do_today.domain.Habit.UserHabit;
import com.example.just_do_today.domain.Habit.UserHabitStatus;
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

    @Transactional
    public void toggleHeart(Long memberId, Long userHabitId) {
        Member member = memberService.getMemberById(memberId);
        UserHabit userHabit = habitMapper.findUserHabitById(userHabitId);

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

        // 프리즈 사용, 복구
        if (userHabit.getStatus() == UserHabitStatus.FREEZE && userHabit.getFrozenUntil() != null) {
            // 프리즈를 활성 상태로 복구
            userHabit.setFrozenUntil(null);
            userHabit.setStatus(UserHabitStatus.ACTIVE);
        } else {
            // 프리즈 사용
            memberService.deductFreeze(member);
            userHabit.setFrozenUntil(LocalDate.now().plusDays(postponeDays));
            userHabit.setStatus(UserHabitStatus.FREEZE);
        }
        habitMapper.updateUserHabitStatusAndFrozenUntil(userHabit);
    }
}
