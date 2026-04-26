package com.example.just_do_today.service.habit;

import com.example.just_do_today.domain.Habit.Category;
import com.example.just_do_today.domain.Habit.CategoryUser;
import com.example.just_do_today.domain.Habit.Enum.Color;
import com.example.just_do_today.domain.Habit.Enum.Frequency;
import com.example.just_do_today.domain.Habit.UserHabit;
import com.example.just_do_today.domain.Habit.UserHabitSchedule;
import com.example.just_do_today.dto.habit.CreateHabitRequestDto;
import com.example.just_do_today.dto.habit.HabitResponseDto;
import com.example.just_do_today.dto.habit.UpdateHabitRequestDto;
import com.example.just_do_today.mapper.category.CategoryMapper;
import com.example.just_do_today.mapper.category.CategoryUserMapper;
import com.example.just_do_today.mapper.habit.HabitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;

import static com.example.just_do_today.domain.Habit.Enum.UserHabitStatus.ACTIVE;

@Service
@RequiredArgsConstructor
public class HabitService {

    private final HabitMapper habitMapper;
    private final CategoryMapper categoryMapper;
    private final CategoryUserMapper categoryUserMapper;

    // 습관 생성
    @Transactional
    public void createHabit(Long memberId, CreateHabitRequestDto dto) {

        // 1. 카테고리 및 사용자 카테고리 처리
        CategoryUser categoryUser = getOrCreateCategoryUser(memberId, dto.getCategoryId(), dto.getCategoryName(), dto.getEmoji());

        // 2. UserHabit 저장
        UserHabit userHabit = new UserHabit();
        userHabit.setMemberId(memberId);
        userHabit.setName(dto.getName());
        userHabit.setCategoryUserId(categoryUser.getId());
        userHabit.setStatus(ACTIVE);
        userHabit.setColor(Color.fromHex(dto.getColor()));
        userHabit.setFrequency(dto.getFrequency());
        userHabit.setStartDate(dto.getStartDate());
        userHabit.setIsPublic(dto.getIsPublic() != null ? dto.getIsPublic() : true);
        habitMapper.saveUserHabit(userHabit);

        // 3. 요일 스케줄 저장
        if ((Frequency.WEEKLY == dto.getFrequency() || Frequency.CUSTOM == dto.getFrequency()) && dto.getDays() != null) {
            saveHabitSchedules(userHabit.getId(), dto.getDays());
        }
    }

    @Transactional(readOnly = true)
    public List<HabitResponseDto> getHabitList(Long memberId, LocalDate date) {
        // 전달된 날짜 기준으로 habit_history status 포함하여 조회
        return habitMapper.findAllByMemberId(memberId, date);
    }

    @Transactional(readOnly = true)
    public HabitResponseDto getHabit(Long userHabitId) {
        return habitMapper.findByUserHabitId(userHabitId);
    }

    @Transactional
    public void deleteHabit(Long memberId, Long userHabitId) {
        UserHabit userHabit = habitMapper.findUserHabitById(userHabitId);
        if (userHabit == null) throw new IllegalArgumentException("존재하지 않는 습관입니다.");
        if (!userHabit.getMemberId().equals(memberId)) throw new IllegalArgumentException("본인의 습관만 삭제할 수 있습니다.");

        habitMapper.deleteSchedulesByUserHabitId(userHabitId);
        habitMapper.deleteHistoriesByUserHabitId(userHabitId);
        habitMapper.deleteDailyLogsByUserHabitId(userHabitId);
        habitMapper.deleteUserHabit(userHabitId);
    }

    // 습관 수정
    @Transactional
    public void updateHabit(Long memberId, Long userHabitId, UpdateHabitRequestDto dto) {
        UserHabit userHabit = habitMapper.findUserHabitById(userHabitId);
        if (userHabit == null) throw new IllegalArgumentException("존재하지 않는 습관입니다.");
        if (!userHabit.getMemberId().equals(memberId)) throw new IllegalArgumentException("본인의 습관만 수정할 수 있습니다.");

        // 1. 카테고리 및 사용자 카테고리 처리
        CategoryUser categoryUser = getOrCreateCategoryUser(memberId, dto.getCategoryId(), dto.getCategoryName(), dto.getEmoji());

        // 2. UserHabit 수정
        userHabit.setName(dto.getName());
        userHabit.setCategoryUserId(categoryUser.getId());
        userHabit.setColor(Color.fromHex(dto.getColor()));
        userHabit.setFrequency(dto.getFrequency());
        userHabit.setStartDate(dto.getStartDate());
        userHabit.setIsPublic(dto.getIsPublic() != null ? dto.getIsPublic() : true);
        habitMapper.updateUserHabit(userHabit);

        // 3. 스케줄 수정 (삭제 후 재생성)
        habitMapper.deleteSchedulesByUserHabitId(userHabitId);
        if ((Frequency.WEEKLY == dto.getFrequency() || Frequency.CUSTOM == dto.getFrequency()) && dto.getDays() != null) {
            saveHabitSchedules(userHabitId, dto.getDays());
        }
    }

    // 카테고리 및 사용자 카테고리 존재여부 확인 후 없으면 생성
    private CategoryUser getOrCreateCategoryUser(Long memberId, Long categoryId, String categoryName, String emoji) {
        Category category = null;

        // 카테고리 존재여부 확인 후 생성
        if (StringUtils.hasText(categoryName)) {
            String trimmedName = categoryName.trim();
            category = categoryMapper.findByName(trimmedName);
            if (category == null) {
                category = new Category();
                category.setName(trimmedName);
                categoryMapper.insertCategory(category);
            }
        } else if (categoryId != null) {
            category = categoryMapper.findById(categoryId);
        }

        if (category == null) {
            throw new IllegalArgumentException("카테고리 정보는 필수입니다.");
        }

        CategoryUser categoryUser = categoryUserMapper.findByCategoryIdAndMemberId(category.getId(), memberId);
        if (categoryUser == null) {
            categoryUser = CategoryUser.builder()
                    .categoryId(category.getId())
                    .memberId(memberId)
                    .emoji(emoji)
                    .build();
            categoryUserMapper.insertCategoryUser(categoryUser);
        }
        return categoryUser;
    }

    // 습관의 요일 스케줄을 저장
    private void saveHabitSchedules(Long userHabitId, List<Integer> days) {
        for (Integer day : days) {
            UserHabitSchedule schedule = new UserHabitSchedule();
            schedule.setUserHabitId(userHabitId);
            schedule.setDayOfWeek(day);
            schedule.setTimesPerWeek(days.size());
            habitMapper.saveSchedule(schedule);
        }
    }
}
