package com.example.just_do_today.domain.Habit.Enum;

import lombok.Getter;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
public enum Color {

    RED("#FF6B6B"),
    PINK("#FF8FA3"),
    PEACH("#FFB5A7"),
    YELLOW("#FFD93D"),
    LIGHT_YELLOW("#FFF3B0"),
    BEIGE("#E8A87C"),
    MINT("#7DD3A8"),
    TEAL("#38B2AC"),
    DARK_GREEN("#2D6A4F"),
    SKY_BLUE("#8B9DC3"),
    BLUE("#3B47B3"),
    LIGHT_PURPLE("#BFA2E6"),
    PURPLE("#9D4EDD"),
    LAVENDER("#C9A0DC"),
    LIGHT_BROWN("#C4A484"),
    BROWN("#A67C52"),
    DARK_BROWN("#6B4423"),
    LIGHT_GRAY("#94A3B8"),
    GRAY("#D9D9D9"),
    DARK_GRAY("#495057");

    private final String hex;

    Color(String hex) {
        this.hex = hex;
    }

    // hex -> Enum 변환
    private static final Map<String, Color> HEX_MAP =
            Arrays.stream(Color.values())
                    .collect(Collectors.toMap(
                            color -> color.hex.toUpperCase(),
                            color -> color
                    ));

    public static Color fromHex(String hex) {
        Color color = HEX_MAP.get(hex.toUpperCase());
        if (color == null) {
            throw new IllegalArgumentException("Invalid color hex: " + hex);
        }
        return color;
    }
}