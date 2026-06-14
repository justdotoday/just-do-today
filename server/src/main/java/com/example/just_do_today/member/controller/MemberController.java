package com.example.just_do_today.member.controller;

import com.example.just_do_today.member.dto.MemberStatusResDto;
import com.example.just_do_today.global.security.UserPrincipal;
import com.example.just_do_today.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    // 유저 하트/프리즈 잔여량 조회
    @GetMapping("/todaystatus")
    public ResponseEntity<MemberStatusResDto> getMemberStatus(
            @AuthenticationPrincipal UserPrincipal principal){
        return ResponseEntity.ok(memberService.getMemberStatus(principal.getMemberId()));
    }
}
