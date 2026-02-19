package com.example.just_do_today.service.habit;

import com.example.just_do_today.domain.Habit.Habit;
import com.example.just_do_today.domain.Habit.HabitHistory;
import com.example.just_do_today.domain.Habit.UserHabit;
import com.example.just_do_today.domain.Habit.UserHabitSchedule;
import com.example.just_do_today.dto.habit.CreateHabitRequestDto;
import com.example.just_do_today.dto.habit.HabitResponseDto;
import com.example.just_do_today.mapper.habit.HabitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

        if (dto.getCategory() != null && !dto.getCategory().isEmpty()) {
            try {
                Long categoryId = Long.parseLong(dto.getCategory());
                habitMapper.saveHabitCategory(habit.getId(), categoryId);
            } catch (NumberFormatException e) {
                System.err.println("Invalid category ID format: " + dto.getCategory());
            }
        }

    }
    // 습관 조회 (읽어오기만 하므로)
    @Transactional(readOnly = true)
    public List<HabitResponseDto> getHabitList(Long memberId) {
        return habitMapper.findAllByMemberId(memberId);
    }

    // 습관 삭제

    // 습관 수정

}
