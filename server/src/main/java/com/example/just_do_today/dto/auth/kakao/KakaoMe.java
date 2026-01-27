package com.example.just_do_today.dto.auth.kakao;

public record KakaoMe(
        Long id,
        Properties properties
) {
    public String profileImageUrl() {
        return properties != null ? properties.profile_image : null;
    }

    public static class Properties {
        public String profile_image;
    }
}
