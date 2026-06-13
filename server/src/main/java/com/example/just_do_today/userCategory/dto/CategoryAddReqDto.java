package com.example.just_do_today.userCategory.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryAddReqDto {
    @NotBlank
    private String name;
    private String emoji;
}
