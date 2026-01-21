package com.example.just_do_today.mapper.member;

import com.example.just_do_today.dto.member.MemberRequest;
import com.example.just_do_today.dto.member.MemberResponse;
import org.apache.ibatis.annotations.*;

@Mapper
public interface MemberMapper {

    @Select("SELECT * FROM member WHERE provider = #{provider} AND provider_id = #{providerId}")
    MemberResponse findByProviderId(@Param("provider") String provider,@Param("providerId") String providerId);

    @Insert("""
        INSERT INTO member (
            nickname, profile_image_url, user_code, 
            provider, provider_id, user_role, 
            created_at, updated_at
        ) VALUES (
            #{nickname}, #{profileImageUrl}, #{userCode}, 
            #{provider}, #{providerId}, #{userRole}, 
            NOW(), NOW()
        )
    """)
    void saveMember(MemberRequest memberRequest);
}