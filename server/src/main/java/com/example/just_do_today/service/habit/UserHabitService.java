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
import java.util.List;

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

            // 연속 성공 일수 계산 후 보상 지급
            // 7일 연속 → 하트 1개, 3일 연속 → 프리즈 1개 (7의 배수는 하트 우선)
            int streak = countConsecutiveDays(habitMapper.findDoneHistoryDates(userHabitId));
            Member member = memberService.getMemberById(memberId);
            if (streak % 7 == 0) {
                memberService.addHeart(member);
            } else if (streak % 3 == 0) {
                memberService.addFreeze(member);
            }

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

        if (existingHistory != null && existingHistory.getStatus() == HabitHistoryStatus.DONE){
            //이미 완료한 습관은 하트 사용 불가
            throw new IllegalArgumentException("이미 완료한 습관입니다.");
        } else if(existingHistory != null && existingHistory.getStatus() == HabitHistoryStatus.HEART){
            //하트 사용 철회
            memberService.addHeart(member);
            habitMapper.deleteHistory(userHabitId, today);
        } else {
            //하트 사용
            memberService.deductHeart(member);
            HabitHistory newHistory = new HabitHistory();
            newHistory.setUserHabitId(userHabitId);
            newHistory.setCheckDate(today);
            newHistory.setStatus(HabitHistoryStatus.HEART);
            habitMapper.insertHistory(newHistory);
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

    // 땡 (복구) - 프리즈된 습관을 약속 날짜에 실제 수행 시 완료 처리 및 상태 복구
    @Transactional
    public void thawHabit(Long memberId, Long userHabitId) {
        UserHabit userHabit = habitMapper.findUserHabitById(userHabitId);

        // 1. 습관 존재 여부 확인
        if (userHabit == null) {
            throw new IllegalArgumentException("존재하지 않는 습관입니다.");
        }

        // 2. 본인 습관 여부 확인
        if (!userHabit.getMemberId().equals(memberId)) {
            throw new IllegalArgumentException("본인의 습관만 복구할 수 있습니다.");
        }

        // 3. 프리즈 상태인지 확인
        if (userHabit.getStatus() != UserHabitStatus.FREEZE) {
            throw new IllegalArgumentException("프리즈 상태의 습관만 복구할 수 있습니다.");
        }

        // 4. 약속한 날짜(frozenUntil)가 됐는지 확인
        LocalDate today = LocalDate.now();
        if (userHabit.getFrozenUntil() == null || today.isBefore(userHabit.getFrozenUntil())) {
            throw new IllegalArgumentException("아직 약속한 날짜가 되지 않았습니다.");
        }

        // 5. 습관 상태 ACTIVE로 복구, frozenUntil 초기화
        userHabit.setStatus(UserHabitStatus.ACTIVE);
        userHabit.setFrozenUntil(null);
        habitMapper.updateUserHabitStatusAndFrozenUntil(userHabit);
    }

    // 오늘부터 역순으로 연속 성공 일수 계산
    private int countConsecutiveDays(List<LocalDate> doneDates){
        LocalDate expected = LocalDate.now();
        int count = 0;
        for (LocalDate date : doneDates){
            if (date.equals(expected)){
                count++;
                expected = expected.minusDays(1);
            } else {
                break;
            }
        }
        return count;
    }
}
