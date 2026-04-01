package com.example.just_do_today.mapper.member;

import com.example.just_do_today.domain.Member;
import org.apache.ibatis.annotations.*;

@Mapper
public interface MemberMapper {

    @Select("SELECT * FROM member WHERE provider = #{provider} AND provider_id = #{providerId}")
    Member findByProviderId(@Param("provider") String provider,@Param("providerId") String providerId);

    @Select("SELECT * FROM member WHERE id = #{id}")
    Member findById(Long id);

    @Update("UPDATE member SET hearts = #{hearts}, updated_at = NOW() WHERE id = #{id}")
    void updateMemberHearts(Member member);

    @Update("UPDATE member SET freezes = #{freezes}, updated_at = NOW() WHERE id = #{id}")
    void updateMemberFreezes(Member member);

    @Update("UPDATE member SET nickname = #{nickname}, updated_at = NOW() WHERE id = #{id}")
    void updateNickname(@Param("id") Long id, @Param("nickname") String nickname);

    @Insert("""
        INSERT INTO member (
            nickname, profile_image_url, user_code,
            provider, provider_id, user_role, hearts, freezes,
            created_at, updated_at
        ) VALUES (
            #{nickname}, #{profileImageUrl}, #{userCode},
            #{provider}, #{providerId}, #{userRole}, #{hearts}, #{freezes},
            NOW(), NOW()
        )
    """)
    void saveMember(Member member);

    Boolean findOnboardingCompleteById(@Param("memberId") Long memberId);
    void updateOnboardingCompleted(@Param("memberId") Long memberId, @Param("completed") Boolean completed);
}