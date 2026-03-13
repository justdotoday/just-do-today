-- status Enum value 삭제, 기존 데이터 수정
UPDATE user_habit SET status='ACTIVE' WHERE status='active';
UPDATE user_habit SET status='FREEZE' WHERE status='freeze';

-- 온보딩시 목표
CREATE TABLE onboarding_goal (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	member_id BIGINT,
	goal TEXT NOT NULL,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_goal_member
    FOREIGN KEY (member_id) REFERENCES member(id)
    ON DELETE SET NULL
);

-- 사용자 카테고리 테이블 추가
CREATE TABLE user_category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    emoji VARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_category_member
    FOREIGN KEY (member_id) REFERENCES member(id)
    ON DELETE CASCADE
);

-- daily_log fk추가
ALTER TABLE daily_log
	ADD CONSTRAINT fk_daily_log_member
	FOREIGN KEY (member_id) REFERENCES member(id),
	ADD CONSTRAINT fk_daily_log_user_habit
	FOREIGN KEY (user_habit_id) REFERENCES user_habit(id);