//package com.example.just_do_today.auth.controller;
//
//import com.example.just_do_today.member.domain.Member;
//import com.example.just_do_today.auth.service.KakaoAuthService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
////@RestController
//@RequiredArgsConstructor
//@RequestMapping("/oauth/kakao")
//public class KakaoAuthController {
//
//    private final KakaoAuthService kakaoAuthService;
//
//    @GetMapping("/callback")
//    public Member callback(@RequestParam String code) {
//        return kakaoAuthService.loginWithCode(code);
//    }
//}
