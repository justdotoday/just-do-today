package com.example.just_do_today.domain.member.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MemberController {

    @GetMapping("/test")
    public String getTest() {
        return "TEST Controller 연결";
    }

    @GetMapping("/test/json")
    public Map<String, String> getTestJson() {
        Map<String, String> res = new HashMap<>();
        res.put("status", "success");
        res.put("message", "TEST JSON Response");
        return res;
    }
}
