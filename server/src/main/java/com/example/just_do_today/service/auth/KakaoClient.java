package com.example.just_do_today.service.auth;

import com.example.just_do_today.dto.auth.kakao.KakaoMe;
import com.example.just_do_today.dto.auth.kakao.KakaoToken;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

//@Component
public class KakaoClient {

    private final RestClient restClient = RestClient.create();

    public KakaoToken exchangeToken(String code, String clientId, String clientSecret, String redirectUri) {
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "authorization_code");
        form.add("client_id", clientId);
        form.add("redirect_uri", redirectUri);
        form.add("code", code);
        if (clientSecret != null && !clientSecret.isBlank()) {
            form.add("client_secret",clientSecret);
        }

        return restClient.post()
                .uri("https://kauth.kakao.com/oauth/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(form)
                .retrieve()
                .body(KakaoToken.class);
    }

    public KakaoMe getMe(String accessToken) {
        return restClient.get()
                .uri("https://kapi.kakao.com/v2/user/me")
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                .retrieve()
                .body(KakaoMe.class);

    }





}
