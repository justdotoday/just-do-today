package com.example.just_do_today.service.auth;

import com.example.just_do_today.domain.Member;
import com.example.just_do_today.dto.auth.LoginRequest;
import com.example.just_do_today.dto.auth.kakao.KakaoMe;
import com.example.just_do_today.dto.auth.kakao.KakaoToken;
import com.example.just_do_today.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

//@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    private final KakaoClient kakaoClient;
    private final MemberService memberService;

    @Value("${kakao.client-id}") private String clientId;
    @Value("${kakao.client-secret:}") private String clientSecret;
    @Value("${kakao.redirect-uri}") private String redirectUri;

    public Member loginWithCode (String code) {
        KakaoToken token = kakaoClient.exchangeToken(code,clientId,clientSecret,redirectUri);
        KakaoMe me = kakaoClient.getMe(token.accessToken());

        LoginRequest req = LoginRequest.builder()
                .provider("KAKAO")
                .providerId(String.valueOf(me.id()))
                .nickname(me.nickname())
                .profileImageUrl(me.profileImageUrl())
                .build();

        return memberService.loginOrRegister(req);
    }
}
