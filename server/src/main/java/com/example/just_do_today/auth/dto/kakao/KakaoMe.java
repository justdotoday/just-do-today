package com.example.just_do_today.auth.dto.kakao;

public record KakaoMe(
        Long id,
        Properties properties
) {
    public String profileImageUrl() {
        return properties != null ? properties.profile_image : null;
    }

    public String nickname() {
        return properties != null ? properties.nickname : null;
    }

    public record Properties(String nickname, String profile_image) {}
}
