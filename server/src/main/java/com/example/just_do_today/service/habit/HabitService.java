package com.example.just_do_today.service.habit;

import com.example.just_do_today.domain.Habit.Category;
import com.example.just_do_today.domain.Habit.CategoryUser;
import com.example.just_do_today.domain.Habit.Enum.Color;
import com.example.just_do_today.domain.Habit.Enum.Frequency;
import com.example.just_do_today.domain.Habit.UserHabit;
import com.example.just_do_today.domain.Habit.UserHabitSchedule;
import com.example.just_do_today.dto.habit.*;
import com.example.just_do_today.mapper.category.CategoryMapper;
import com.example.just_do_today.mapper.category.CategoryUserMapper;
import com.example.just_do_today.mapper.habit.HabitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.IntStream;

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
        List<HabitResponseDto> habits =
                habitMapper.findAllByMemberId(memberId, date);
                //각 습관에 칩 텍스트 및 상태 문구 세팅
                habits.forEach(this::setChipData);
                return habits;
    }

    @Transactional(readOnly = true)
    public HabitResponseDto getHabit(Long userHabitId) {
        HabitResponseDto habit = habitMapper.findByUserHabitId(userHabitId);
        if (habit != null) setChipData(habit);
        return habit;
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
                    .name(category.getName())
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

    // 캘린더 : 월별 날짜별 완료 습관 갯수 반환
    @Transactional(readOnly = true)
    public HeatmapResponseDto getCalendar(Long memberId, int year, int month){
        List<HeatmapDayDto> days = habitMapper.findDailyCompletionCount(memberId,year,month);
        HeatmapResponseDto response = new HeatmapResponseDto();
        response.setYear(year);
        response.setMonth(month);
        response.setDays(days);
        return response;
    }

    // 습관 DTO에 왼쪽 칩(recentSuccessText)과 오른쪽 칩(statusPhrase) 세팅
    private void setChipData(HabitResponseDto habit){
        LocalDate today = LocalDate.now();
        // findDoneHistoryDates는 check_date DESC 정렬로 반환
        List<LocalDate> doneDates =
                habitMapper.findDoneHistoryDates(habit.getId());
        List<LocalDate> targetDates =
                getHabitDates(habit.getStartDate(),habit.getFrequency(),habit.getDays());

        habit.setSuccessChip(getSuccessChip(habit.getFrequency(), doneDates, today));
        habit.setStatusChip(getStatusChip(doneDates, targetDates, habit.getTodayStatus(),today));
    }

    //frequency + startDate + days 기준으로 습관 대상일 목록 계산 (오름차순)
    private List<LocalDate> getHabitDates
        (LocalDate startDate,
         Frequency frequency,
         List<Integer> days){
        if (startDate == null) return Collections.emptyList();

        List<LocalDate> targetDates = new ArrayList<>(); // 결과 담을 리스트 생성
        LocalDate today = LocalDate.now();
        LocalDate current = startDate;

        while(!current.isAfter(today)){
            boolean isTarget = switch (frequency){
                case DAILY -> true;
                // days : java DayOfWeek 값 (0=MON ~ 6=SUN) ordinal = 선언된 순서의 인덱스를 반환하는 메서드
                case WEEKLY, CUSTOM -> days != null && days.contains(current.getDayOfWeek().ordinal());
                // 매월 시작일과 동일한 일(day of month)
                case MONTHLY -> current.getDayOfMonth() == startDate.getDayOfMonth();
            };
            if (isTarget) targetDates.add(current);
            current = current.plusDays(1);
        }
        return targetDates;
    }

    // 왼쪽 칩: frequency 기준 성공 횟수 텍스트
    private String getSuccessChip(Frequency frequency, List<LocalDate> doneDates, LocalDate today) {
        Set<LocalDate> doneSet = new HashSet<>(doneDates);

        return switch (frequency) {
            case DAILY -> {
                long count = IntStream.range(0, 7)
                        .mapToObj(today::minusDays)
                        .filter(doneSet::contains)
                        .count();
                yield "최근 7일 중 " + count + "일 성공";
            }
            case WEEKLY, CUSTOM -> {
                LocalDate monday = today.with(DayOfWeek.MONDAY);
                LocalDate sunday = today.with(DayOfWeek.SUNDAY);
                long count = doneDates.stream()
                        .filter(d -> !d.isBefore(monday) && !d.isAfter(sunday))
                        .count();
                yield "주 " + count + "회 성공";
            }
            case MONTHLY -> {
                long count = doneDates.stream()
                        .filter(d -> d.getYear() == today.getYear() && d.getMonthValue() == today.getMonthValue())
                        .count();
                yield "한달 " + count + "회 성공";
            }
        };
    }

    // 오른쪽 칩: 우선순위 기준 상태 문구
    private String getStatusChip(List<LocalDate> doneDates, List<LocalDate> targetDates, String todayStatus, LocalDate today) {
        Set<LocalDate> doneSet = new HashSet<>(doneDates);

        // 1순위: 전체 완료 횟수 3회 이내
        if (doneDates.size() <= 3) return "습관 시작 단계";

        // 2순위: 오늘 달성 완료
        if ("DONE".equals(todayStatus)) return "오늘 완료";

        // 3순위: 마지막 완료일로부터 오늘까지 실제 경과일 2일 이상
        LocalDate lastDone = doneDates.get(0);
        long daysSinceLastDone = ChronoUnit.DAYS.between(lastDone, today);
        if (daysSinceLastDone >= 2) return daysSinceLastDone + "일 쉬는 중";

        // 4~6순위: 최근 7 대상일 중 성공 횟수
        int targetSize = targetDates.size();
        List<LocalDate> recent7Targets = targetSize > 7
                ? targetDates.subList(targetSize - 7, targetSize)
                : targetDates;

        long successCount = recent7Targets.stream().filter(doneSet::contains).count();

        if (successCount >= 6) return "완벽한 유지 중";
        if (successCount >= 4) return "꾸준히 유지 중";
        if (successCount >= 1) return "노력 중";

        return null;
    }
}
