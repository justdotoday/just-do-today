package com.example.just_do_today.dto.auth.kakao;

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
    public static class Properties {
        public String profile_image;
        public String nickname;
    }
}
