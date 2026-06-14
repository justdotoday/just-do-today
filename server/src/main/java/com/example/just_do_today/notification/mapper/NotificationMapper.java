package com.example.just_do_today.notification.mapper;

import com.example.just_do_today.notification.domain.NotificationSetting;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NotificationMapper {
    void upsertSubscription(NotificationSetting setting);
    void upsertSetting(NotificationSetting setting);
    NotificationSetting findByMemberId(@Param("memberId") Long memberId);
    // 현재 시각(HH:mm)에 알림을 보내야 하는 활성 구독자 조회
    List<NotificationSetting> findActiveSubscriptionsForTime(@Param("currentTime") String currentTime);
}
