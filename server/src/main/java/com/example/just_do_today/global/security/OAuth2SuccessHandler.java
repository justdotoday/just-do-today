package com.example.just_do_today.global.security;

import com.example.just_do_today.domain.Member;
import com.example.just_do_today.dto.auth.LoginRequest;
import com.example.just_do_today.service.member.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final MemberService memberService;

    @Value("${app.oauth-success-redirect}")
    private String redirectUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        try {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String registrationId = extractRegistrationId(authentication);

            String profilePicture = "";
            String providerId = "";
            String nickname = "";

            if ("google".equalsIgnoreCase(registrationId)) {
                providerId = oAuth2User.getAttribute("sub");
                profilePicture = oAuth2User.getAttribute("picture");
                nickname = oAuth2User.getAttribute("name");
            } else if ("kakao".equalsIgnoreCase(registrationId)) {
                Object id = oAuth2User.getAttribute("id");
                providerId = (id != null) ? String.valueOf(id) : "";
                Map<String, Object> properties = oAuth2User.getAttribute("properties");
                if (properties != null) {
                    profilePicture = String.valueOf(properties.get("profile_image"));
                    nickname = String.valueOf(properties.get("nickname"));
                }
            }

            LoginRequest loginRequest = LoginRequest.builder()
                    .provider(registrationId.toUpperCase())
                    .providerId(providerId)
                    .profileImageUrl(profilePicture)
                    .nickname(nickname)
                    .build();

            Member member = memberService.loginOrRegister(loginRequest);

            String token = jwtProvider.createToken(String.valueOf(member.getId()), member.getUserRole());

            String targetUrl = UriComponentsBuilder.fromUriString(redirectUri)
                    .queryParam("token", token)
                    .build().toUriString();

            getRedirectStrategy().sendRedirect(request, response, targetUrl);

        } catch (Exception e) {
            log.error("OAuth2 Login Success Handler Error: ", e);
            response.sendRedirect("/login?error=" + e.getMessage());
        }
    }

    private String extractRegistrationId(Authentication authentication) {
        return ((org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken) authentication)
                .getAuthorizedClientRegistrationId();
    }
}