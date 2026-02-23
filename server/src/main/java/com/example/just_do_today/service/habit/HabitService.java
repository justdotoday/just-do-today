package com.example.just_do_today.service.habit;

import com.example.just_do_today.domain.Habit.Habit;
import com.example.just_do_today.domain.Habit.UserHabit;
import com.example.just_do_today.domain.Habit.UserHabitSchedule;
import com.example.just_do_today.dto.habit.CreateHabitRequestDto;
import com.example.just_do_today.dto.habit.HabitResponseDto;
import com.example.just_do_today.mapper.habit.HabitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.example.just_do_today.domain.Habit.UserHabitStatus.ACTIVE;

@Service
@RequiredArgsConstructor
public class HabitService {

    private final HabitMapper habitMapper;

    @Transactional // 에러 시 모든 트랜잭션 취소
    public void createHabit(Long memberId, CreateHabitRequestDto dto) {
        // Habit 저장
        Habit habit = new Habit();
        habit.setName(dto.getName());
        habit.setIsPublic(dto.getIsPublic());
        habitMapper.saveHabit(habit);

        // UserHabit 저장
        UserHabit userHabit = new UserHabit();
        userHabit.setMemberId(memberId);
        userHabit.setHabitId(habit.getId());
        userHabit.setStatus(ACTIVE);
        userHabit.setColor(dto.getColor());
        userHabit.setFrequency(dto.getFrequency());
        userHabit.setStartDate(dto.getStartDate());
        habitMapper.saveUserHabit(userHabit);

        if (dto.getDays() != null) {
            for (Integer day : dto.getDays()) {
                UserHabitSchedule schedule = new UserHabitSchedule();
                schedule.setUserHabitId(userHabit.getId());
                schedule.setDayOfWeek(day);
                schedule.setTimesPerWeek(dto.getDays().size());
                habitMapper.saveSchedule(schedule);
            }
        }

        if (dto.getCategoryId() != null) {
            habitMapper.saveHabitCategory(habit.getId(), dto.getCategoryId());
        }

    }
    // 습관 조회 (읽어오기만 하므로)
    @Transactional(readOnly = true)
    public List<HabitResponseDto> getHabitList(Long memberId) {
        return habitMapper.findAllByMemberId(memberId);
    }

    @Transactional(readOnly = true)
    public HabitResponseDto getHabit(Long userHabitId) {
        return habitMapper.findByUserHabitId(userHabitId);
    }

    // 습관 삭제
    @Transactional
    public void deleteHabit(Long userHabitId) {
        habitMapper.deleteSchedulesByUserHabitId(userHabitId);
        habitMapper.deleteHistoriesByUserHabitId(userHabitId);
        habitMapper.deleteDailyLogsByUserHabitId(userHabitId);
        habitMapper.deleteUserHabit(userHabitId);
    }

    // 습관 수정
    @Transactional
    public void updateHabit(Long userHabitId, com.example.just_do_today.dto.habit.UpdateHabitRequestDto dto) {
        // 1. Habit 기본 정보 수정
        Long habitId = habitMapper.findHabitIdByUserHabitId(userHabitId);
        Habit habit = new Habit();
        habit.setId(habitId);
        habit.setName(dto.getName());
        habit.setIsPublic(dto.getIsPublic());
        habitMapper.updateHabit(habit);

        // 2. UserHabit 수정 (유저별 습관 세부 정보)
        UserHabit userHabit = new UserHabit();
        userHabit.setId(userHabitId);
        userHabit.setColor(dto.getColor());
        userHabit.setFrequency(dto.getFrequency());
        userHabit.setStartDate(dto.getStartDate());
        habitMapper.updateUserHabit(userHabit);

        // 3. 스케줄 수정 (삭제 후 재생성)
        habitMapper.deleteSchedulesByUserHabitId(userHabitId);
        if (dto.getDays() != null) {
            for (Integer day : dto.getDays()) {
                UserHabitSchedule schedule = new UserHabitSchedule();
                schedule.setUserHabitId(userHabitId);
                schedule.setDayOfWeek(day);
                schedule.setTimesPerWeek(dto.getDays().size());
                habitMapper.saveSchedule(schedule);
            }
        }

        // 4. 카테고리 수정
        if (dto.getCategoryId() != null) {
            habitMapper.updateHabitCategory(habitId, dto.getCategoryId());
        }
    }

}
