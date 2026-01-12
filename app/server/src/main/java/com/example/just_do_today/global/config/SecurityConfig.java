package com.example.just_do_today.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );
                //.authorizeHttpRequests(auth -> auth
                //        .requestMatchers("/join", "/login").permitAll()
                //        .requestMatchers("/css/**", "/js/**", "/images/**").permitAll()
                //        .anyRequest().authenticated()
                //)
                //.formLogin(form -> form
                //        .loginPage("/login")
                //        .loginProcessingUrl("/login")
                //        .defaultSuccessUrl("/", true)
                //        .permitAll()
                //)
                //.logout(logout -> logout
                //        .logoutSuccessUrl("/login")
                //);;
        return http.build();
    }
}