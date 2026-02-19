-- 습관 완료체크
CREATE TABLE habit_history (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	user_habit_id BIGINT NOT NULL,
	check_date DATE NOT NULL,
	created_at DATETIME DEFAULT NOW(),
	-- 하루에 한번만 체크 가능
	UNIQUE KEY unique_check (user_habit_id, check_date)
);

-- 습관 수행기록
CREATE TABLE daily_log (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	member_id BIGINT NOT NULL,
	user_habit_id BIGINT NOT NULL,
	log_date DATE NOT NULL,
	mood VARCHAR(20), -- 습관 수행은 어땠나요? 'GOOD | GREAT | PERFECT'?
	note TEXT, -- 남길 내용이 있나요?
	created_at DATETIME DEFAULT NOW(),
	updated_at DATETIME DEFAULT NOW(),
	-- 습관당 하루에 한번만 작성 가능
	UNIQUE KEY unique_daily_log (member_id, user_habit_id, log_date)
);

-- 유저 하트 컬럼 추가
ALTER TABLE member
ADD COLUMN hearts INT NOT NULL DEFAULT 3;