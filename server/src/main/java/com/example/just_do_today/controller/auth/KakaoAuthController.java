package com.example.just_do_today.controller.auth;

import com.example.just_do_today.domain.Member;
import com.example.just_do_today.dto.member.MemberResponse;
import com.example.just_do_today.service.auth.KakaoAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth/kakao")
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;

    @GetMapping("/callback")
    public Member callback(@RequestParam String code) {
        return kakaoAuthService.loginWithCode(code);
    }
}
