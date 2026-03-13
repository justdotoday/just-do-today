package com.example.just_do_today;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.example.just_do_today.mapper")
@SpringBootApplication
public class JustDoTodayApplication {

	public static void main(String[] args) {
		SpringApplication.run(JustDoTodayApplication.class, args);
	}

}
