package com.example.just_do_today.member.controller;

import com.example.just_do_today.member.dto.OnboardingRequestDto;
import com.example.just_do_today.global.security.UserPrincipal;
import com.example.just_do_today.member.service.OnboardingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/onboarding")
public class OnboardingController {
    private final OnboardingService onboardingService;

    @PostMapping("/complete")
    public ResponseEntity<String> completeOnboarding(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody OnboardingRequestDto requestDto
    ) {
        onboardingService.completeOnboarding(principal.getMemberId(), requestDto);
        return ResponseEntity.ok("온보딩이 완료되었습니다.");
    }

}
