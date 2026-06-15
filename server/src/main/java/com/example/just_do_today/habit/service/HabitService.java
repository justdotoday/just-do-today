package com.example.just_do_today.habit.service;

import com.example.just_do_today.habit.domain.*;
import com.example.just_do_today.habit.domain.enums.Color;
import com.example.just_do_today.habit.domain.enums.DailyLogMood;
import com.example.just_do_today.habit.domain.enums.Frequency;
import com.example.just_do_today.habit.domain.enums.HabitHistoryStatus;
import com.example.just_do_today.habit.dto.*;
import com.example.just_do_today.habit.mapper.DailyLogMapper;
import com.example.just_do_today.userCategory.mapper.CategoryMapper;
import com.example.just_do_today.userCategory.mapper.CategoryUserMapper;
import com.example.just_do_today.habit.mapper.HabitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.example.just_do_today.habit.domain.enums.UserHabitStatus.ACTIVE;

@Service
@RequiredArgsConstructor
public class HabitService {

    private final HabitMapper habitMapper;
    private final CategoryMapper categoryMapper;
    private final CategoryUserMapper categoryUserMapper;
    private final DailyLogMapper dailyLogMapper; // 캘린더 mood 조회용 추가

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
        List<HabitResponseDto> habits = habitMapper.findAllByMemberId(memberId, date);
        if (habits.isEmpty()) return habits;

        // N+1 방지: 모든 습관의 완료 기록을 한 번에 조회 후 습관별로 그룹핑
        List<Long> habitIds = habits.stream().map(HabitResponseDto::getId).toList();
        Map<Long, List<LocalDate>> doneDatesMap = habitMapper.findDoneHistoryByHabitIds(habitIds).stream()
                .collect(Collectors.groupingBy(
                        HabitDoneHistoryDto::getUserHabitId,
                        Collectors.mapping(HabitDoneHistoryDto::getCheckDate, Collectors.toList())
                ));

        // 각 습관에 칩 텍스트 및 상태 문구 세팅
        habits.forEach(habit ->
                setChipData(habit, doneDatesMap.getOrDefault(habit.getId(), Collections.emptyList())));
        return habits;
    }

    @Transactional(readOnly = true)
    public HabitResponseDto getHabit(Long userHabitId) {
        HabitResponseDto habit = habitMapper.findByUserHabitId(userHabitId);
        if (habit != null) {
            setChipData(habit, habitMapper.findDoneHistoryDates(userHabitId));
        }
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

    @Transactional(readOnly = true)
    public HabitCalendarResponseDto getHabitCalendar(Long memberId, Long userHabitId, int year, int month){
        UserHabit userHabit = habitMapper.findUserHabitById(userHabitId);
        if (userHabit == null) throw new IllegalArgumentException("존재하지 않는 습관입니다.");
        //소유권 검증: 본인 습관만 조회 가능 (보안 규칙)
        if (!userHabit.getMemberId().equals(memberId))
            throw new IllegalArgumentException("본인의 습관만 조회할 수 있습니다");
        LocalDate today = LocalDate.now();
        LocalDate firstDay = LocalDate.of(year,month, 1);
        LocalDate lastDay = firstDay.withDayOfMonth(firstDay.lengthOfMonth());

        // 날짜별 상태 계산에 필요한 3개 소스를 각각 단순 조회
        // toMap merge 함수 : 같은 날 중복 행이 들어와도 예외 없이 첫 값 유지(방어적)
        Map<LocalDate, HabitHistoryStatus> historyMap = habitMapper
                .findHistoriesByMonth(userHabitId, year, month).stream()
                .collect(Collectors.toMap(HabitHistory::getCheckDate, HabitHistory::getStatus, (a, b) -> a));

        Map<LocalDate, DailyLogMood> moodMap = dailyLogMapper
                .findLogsByHabitAndMonth(userHabitId, year, month).stream()
                .filter(log -> log.getMood() != null)
                .collect(Collectors.toMap(DailyLog::getLogDate, DailyLog::getMood, (a, b) -> a));

        List<UserHabitFreezeHistory> freezeHistories = habitMapper.findFreezeHistoriesByMonth(userHabitId, firstDay, lastDay);

        List<HabitCalendarDayDto> days = buildCalendarDays(historyMap, moodMap, freezeHistories, year, month, today);

        // 헤더 칩: 경과일(시작일 포함) / 연속일 / 오늘 완료 여부
        LocalDate startDate = userHabit.getStartDate() != null ? userHabit.getStartDate() : today;
        long elapsedDays = ChronoUnit.DAYS.between(startDate, today) + 1;
        int streakDays = countConsecutiveDays(habitMapper.findDoneHistoryDates(userHabitId));
        boolean isCompletedToday = historyMap.containsKey(today);

        // 하단 통계: 이번 달 실천일 / 누적 실천일
        int thisMonthCount = habitMapper.countCompletionsByMonth(userHabitId, year, month);
        int totalCount = habitMapper.countTotalCompletions(userHabitId);

        HabitCalendarResponseDto response = new HabitCalendarResponseDto();
        response.setYear(year);
        response.setMonth(month);
        response.setElapsedDays(elapsedDays);
        response.setStreakDays(streakDays);
        response.setCompletedToday(isCompletedToday);
        response.setThisMonthCount(thisMonthCount);
        response.setTotalCount(totalCount);
        response.setDays(days);
        return response;
    }

    // 3개 소스 + 오늘을 우선순위(HEART > ICE > mood(DONE) > TODAY)로 합쳐 날짜별 상태 목록 생성
    private List<HabitCalendarDayDto> buildCalendarDays(
            Map<LocalDate, HabitHistoryStatus> historyMap,
            Map<LocalDate, DailyLogMood> moodMap,
            List<UserHabitFreezeHistory> freezeHistories,
            int year, int month, LocalDate today) {

        List<HabitCalendarDayDto> result = new ArrayList<>();

        // 1) habit_history 기반: HEART는 그대로, DONE은 mood로 표시(없으면 ATTEMPT 디폴트)
        historyMap.forEach((date, status) -> {
            String dayStatus;
            if (status == HabitHistoryStatus.HEART) {
                dayStatus = "HEART";
            } else {
                DailyLogMood mood = moodMap.get(date);
                dayStatus = mood != null ? mood.name() : DailyLogMood.ATTEMPT.name();
            }
            result.add(new HabitCalendarDayDto(date, dayStatus));
        });

        // 2) freeze 기간(ICE): habit_history 없는 날만, 해당 월 범위로 한정
        for (UserHabitFreezeHistory freeze : freezeHistories) {
            LocalDate d = freeze.getFrozenFrom();
            while (!d.isAfter(freeze.getFrozenUntil())) {
                if (!historyMap.containsKey(d) && d.getYear() == year && d.getMonthValue() == month) {
                    result.add(new HabitCalendarDayDto(d, "ICE"));
                }
                d = d.plusDays(1);
            }
        }

        // 3) 오늘: 완료 기록 없고 조회 월에 해당하면 TODAY
        if (today.getYear() == year && today.getMonthValue() == month && !historyMap.containsKey(today)) {
            result.add(new HabitCalendarDayDto(today, "TODAY"));
        }

        result.sort(Comparator.comparing(HabitCalendarDayDto::getDate));
        return result;
    }

    // 오늘부터 역순으로 연속 성공 일수 계산 (doneDates는 check_date DESC 정렬 전제)
    private int countConsecutiveDays(List<LocalDate> doneDates) {
        LocalDate expected = LocalDate.now();
        int count = 0;
        for (LocalDate date : doneDates) {
            if (date.equals(expected)) {
                count++;
                expected = expected.minusDays(1);
            } else {
                break;
            }
        }
        return count;
    }

    // 습관 DTO에 왼쪽 칩(successChip)과 오른쪽 칩(statusChip) 세팅
    // doneDates는 check_date DESC 정렬 전제 (호출부에서 주입)
    private void setChipData(HabitResponseDto habit, List<LocalDate> doneDates){
        LocalDate today = LocalDate.now();
        List<LocalDate> targetDates =
                getHabitDates(habit.getStartDate(),habit.getFrequency(),habit.getDays());
        // 날짜 포함 여부 조회용 Set은 한 번만 생성해 두 칩 계산에 공유
        Set<LocalDate> doneSet = new HashSet<>(doneDates);

        habit.setSuccessChip(getSuccessChip(habit.getFrequency(), doneDates, doneSet, today));
        habit.setStatusChip(getStatusChip(doneDates, doneSet, targetDates, habit.getTodayStatus(), today));
    }

    // frequency + startDate + days 기준으로 최근 7 대상일 목록 계산 (오름차순)
    // 오늘부터 역순으로 최근 7개만 수집하여 불필요한 전체 날짜 생성 방지
    private List<LocalDate> getHabitDates(LocalDate startDate, Frequency frequency, List<Integer> days) {
        if (startDate == null) return Collections.emptyList();

        List<LocalDate> targetDates = new ArrayList<>();
        LocalDate current = LocalDate.now();

        // days : java DayOfWeek 값 (0=MON ~ 6=SUN) ordinal = 선언된 순서의 인덱스를 반환하는 메서드
        while (!current.isBefore(startDate) && targetDates.size() < 7) {
            boolean isTarget = switch (frequency) {
                case DAILY -> true;
                case WEEKLY, CUSTOM -> days != null && days.contains(current.getDayOfWeek().ordinal());
                // 매월 시작일과 동일한 일(day of month)
                case MONTHLY -> current.getDayOfMonth() == startDate.getDayOfMonth();
            };
            if (isTarget) targetDates.add(current);
            current = current.minusDays(1);
        }
        // 역순 수집했으므로 오름차순으로 변환
        Collections.reverse(targetDates);
        return targetDates;
    }

    // 왼쪽 칩: frequency 기준 성공 횟수 텍스트
    private String getSuccessChip(Frequency frequency, List<LocalDate> doneDates, Set<LocalDate> doneSet, LocalDate today) {
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
    private String getStatusChip(List<LocalDate> doneDates, Set<LocalDate> doneSet, List<LocalDate> targetDates, String todayStatus, LocalDate today) {
        // 1순위: 전체 완료 횟수 3회 이내
        if (doneDates.size() <= 3) return "습관 시작 단계";

        // 2순위: 오늘 달성 완료 (하트 사용 완료 포함)
        if ("DONE".equals(todayStatus) || "HEART".equals(todayStatus)) return "오늘 완료";

        // 3순위: 마지막 완료일로부터 오늘까지 실제 경과일 2일 이상
        LocalDate lastDone = doneDates.get(0);
        long daysSinceLastDone = ChronoUnit.DAYS.between(lastDone, today);
        if (daysSinceLastDone >= 2) return daysSinceLastDone + "일 쉬는 중";

        // 4~6순위: 최근 7 대상일 중 성공 횟수 (getHabitDates에서 최근 7개만 반환하므로 그대로 사용)
        long successCount = targetDates.stream().filter(doneSet::contains).count();

        if (successCount >= 6) return "완벽한 유지 중";
        if (successCount >= 4) return "꾸준히 유지 중";
        if (successCount >= 1) return "노력 중";

        // 성공 횟수 0회인 경우 빈 문자열 반환
        return "";
    }
}
