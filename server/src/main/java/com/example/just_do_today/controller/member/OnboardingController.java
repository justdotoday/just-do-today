package com.example.just_do_today.controller.member;

import com.example.just_do_today.dto.member.OnboardingRequestDto;
import com.example.just_do_today.service.member.OnboardingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/onBoarding")
public class OnboardingController {
    private final OnboardingService onboardingService;

    @PostMapping("/complete")
    public ResponseEntity<String> completeOnboarding(
            @RequestAttribute("memberId") Long memberId,
            @RequestBody OnboardingRequestDto requestDto
            ) {
        onboardingService.completeOnboarding(memberId, requestDto);
        return ResponseEntity.ok("온보딩이 완료되었습니다.");
    }

}
