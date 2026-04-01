package com.example.just_do_today.service.habit;

import com.example.just_do_today.domain.Habit.Enum.Color;
import com.example.just_do_today.domain.Habit.Enum.Frequency;
import com.example.just_do_today.domain.Habit.UserHabit;
import com.example.just_do_today.domain.Habit.UserHabitSchedule;
import com.example.just_do_today.dto.habit.CreateHabitRequestDto;
import com.example.just_do_today.dto.habit.HabitResponseDto;
import com.example.just_do_today.dto.habit.UpdateHabitRequestDto;
import com.example.just_do_today.mapper.habit.HabitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.example.just_do_today.domain.Habit.Enum.UserHabitStatus.ACTIVE;

@Service
@RequiredArgsConstructor
public class HabitService {

    private final HabitMapper habitMapper;

    @Transactional // 에러 시 모든 트랜잭션 취소
    public void createHabit(Long memberId, CreateHabitRequestDto dto) {

        // 카테고리 선택 검증
        if (dto.getCategoryId() == null) {
            throw new IllegalArgumentException("카테고리는 필수 선택 사항입니다.");
        }
        // UserHabit 저장
        UserHabit userHabit = new UserHabit();
        userHabit.setMemberId(memberId);
        userHabit.setName(dto.getName());
        userHabit.setCategoryId(dto.getCategoryId());
        userHabit.setStatus(ACTIVE);
        userHabit.setColor(Color.fromHex(dto.getColor()));
        userHabit.setFrequency(dto.getFrequency());
        userHabit.setStartDate(dto.getStartDate());
        habitMapper.saveUserHabit(userHabit);

        // Frequency==WEEKLY나 CUSTOM 일때 요일 저장
        if ((Frequency.WEEKLY==dto.getFrequency() || Frequency.CUSTOM==dto.getFrequency()) && dto.getDays() != null) {
            for (Integer day : dto.getDays()) {
                UserHabitSchedule schedule = new UserHabitSchedule();
                schedule.setUserHabitId(userHabit.getId());
                schedule.setDayOfWeek(day);
                schedule.setTimesPerWeek(dto.getDays().size());
                habitMapper.saveSchedule(schedule);
            }
        }
    }

    // 유저별 습관 조회 (읽어오기만 하므로)
    @Transactional(readOnly = true)
    public List<HabitResponseDto> getHabitList(Long memberId) {
        return habitMapper.findAllByMemberId(memberId);
    }
    // 습관별 조회
    @Transactional(readOnly = true)
    public HabitResponseDto getHabit(Long userHabitId) {
        return habitMapper.findByUserHabitId(userHabitId);
    }

    // 습관 삭제
    @Transactional
    public void deleteHabit(Long memberId, Long userHabitId) {
        UserHabit userHabit = habitMapper.findUserHabitById(userHabitId);

        if (userHabit == null) {
            throw new IllegalArgumentException("존재하지 않는 습관입니다.");
        }

        if (!userHabit.getMemberId().equals(memberId)) {
            throw new IllegalArgumentException("본인의 습관만 삭제할 수 있습니다.");
        }

        habitMapper.deleteSchedulesByUserHabitId(userHabitId);
        habitMapper.deleteHistoriesByUserHabitId(userHabitId);
        habitMapper.deleteDailyLogsByUserHabitId(userHabitId);
        habitMapper.deleteUserHabit(userHabitId);
    }

    // 습관 수정
    @Transactional
    public void updateHabit(Long memberId, Long userHabitId, UpdateHabitRequestDto dto) {

        if (userHabitId == null) {
            throw new IllegalArgumentException("존재하지 않는 습관입니다.");
        }
        UserHabit userHabit = habitMapper.findUserHabitById(userHabitId);

        if (!userHabit.getMemberId().equals(memberId)) {
            throw new IllegalArgumentException("본인의 습관만 수정할 수 있습니다.");
        }

        // 1. UserHabit 수정 (유저별 습관 세부 정보)
        userHabit.setId(userHabitId);
        userHabit.setName(dto.getName());
        userHabit.setCategoryId(dto.getCategoryId());
        userHabit.setColor(Color.fromHex(dto.getColor()));
        userHabit.setFrequency(dto.getFrequency());
        userHabit.setStartDate(dto.getStartDate());
        habitMapper.updateUserHabit(userHabit);

        // 2. 스케줄 수정 (삭제 후 재생성)
        habitMapper.deleteSchedulesByUserHabitId(userHabitId);
        if ((Frequency.WEEKLY==dto.getFrequency() || Frequency.CUSTOM==dto.getFrequency()) && dto.getDays() != null) {
            for (Integer day : dto.getDays()) {
                UserHabitSchedule schedule = new UserHabitSchedule();
                schedule.setUserHabitId(userHabitId);
                schedule.setDayOfWeek(day);
                schedule.setTimesPerWeek(dto.getDays().size());
                habitMapper.saveSchedule(schedule);
            }
        }
    }

}
