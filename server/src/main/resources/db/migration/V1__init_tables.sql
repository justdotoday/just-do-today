-- 카테고리
CREATE TABLE category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20),
    is_active VARCHAR(1) DEFAULT '1',
    display_order INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 사용자
CREATE TABLE member (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(256),
    nickname VARCHAR(50) NOT NULL,
    provider VARCHAR(20) DEFAULT 'LOCAL',
    provider_id VARCHAR(100),
    user_role VARCHAR(20) DEFAULT 'ROLE_USER',
    ranking_enabled VARCHAR(1) DEFAULT '1',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 습관 정의
CREATE TABLE habit (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_public VARCHAR(1) DEFAULT '1',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 사용자가 채택한 습관
CREATE TABLE user_habit (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    habit_id BIGINT NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_uh_member FOREIGN KEY (member_id) REFERENCES member(id),
    CONSTRAINT fk_uh_habit FOREIGN KEY (habit_id) REFERENCES habit(id)
);

-- 팔로우
CREATE TABLE follow (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    from_member_id BIGINT NOT NULL,
    to_member_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_follow_from FOREIGN KEY (from_member_id) REFERENCES member(id),
    CONSTRAINT fk_follow_to FOREIGN KEY (to_member_id) REFERENCES member(id),
    UNIQUE (from_member_id, to_member_id)
);

-- 차단
CREATE TABLE block (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    blocked_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_block_member FOREIGN KEY (member_id) REFERENCES member(id),
    CONSTRAINT fk_block_blocked FOREIGN KEY (blocked_id) REFERENCES member(id)
);

-- 습관 매핑
CREATE TABLE habit_category (
    habit_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    is_primary VARCHAR(1) DEFAULT '0',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (habit_id, category_id),
    CONSTRAINT fk_hc_habit FOREIGN KEY (habit_id) REFERENCES habit(id),
    CONSTRAINT fk_hc_category FOREIGN KEY (category_id) REFERENCES category(id)
);

-- 사용자 습관 스케줄
CREATE TABLE user_habit_schedule (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_habit_id BIGINT NOT NULL,
    day_of_week INT COMMENT '0:일, 6:토',
    times_per_week INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_sch_user_habit FOREIGN KEY (user_habit_id) REFERENCES user_habit(id)
);

-- 달성 기록
CREATE TABLE habit_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_habit_id BIGINT NOT NULL,
    target_date DATE NOT NULL,
    is_completed VARCHAR(1) DEFAULT '0',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_rec_user_habit FOREIGN KEY (user_habit_id) REFERENCES user_habit(id)
);

-- 습관 연속 달성 기록
CREATE TABLE habit_streak (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_habit_id BIGINT NOT NULL, -- FK 추가
    current_streak INT DEFAULT 0,
    max_streak INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_str_user_habit FOREIGN KEY (user_habit_id) REFERENCES user_habit(id)
);

-- 랭킹 시스템
CREATE TABLE ranking_snapshot (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT,
    period_type VARCHAR(20),
    is_active VARCHAR(1) DEFAULT '1',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_snap_category FOREIGN KEY (category_id) REFERENCES category(id)
);

-- 랭킹 결과
CREATE TABLE ranking_result (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    snapshot_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    rank_no INT NOT NULL,
    score INT DEFAULT 0,
    avg_streak INT DEFAULT 0,
    max_streak INT DEFAULT 0,
    CONSTRAINT fk_res_snapshot FOREIGN KEY (snapshot_id) REFERENCES ranking_snapshot(id),
    CONSTRAINT fk_res_member FOREIGN KEY (member_id) REFERENCES member(id)
);

-- 게시글
CREATE TABLE post (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    content TEXT,
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_post_member FOREIGN KEY (member_id) REFERENCES member(id)
);

-- 게시글 좋아요
CREATE TABLE post_like (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_like_post FOREIGN KEY (post_id) REFERENCES post(id),
    CONSTRAINT fk_like_member FOREIGN KEY (member_id) REFERENCES member(id),
    UNIQUE (post_id, member_id)
);

-- 알림
CREATE TABLE notification_setting (
    member_id BIGINT PRIMARY KEY,
    is_active VARCHAR(1) DEFAULT '1',
    start_time TIME,
    end_time TIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_noti_member FOREIGN KEY (member_id) REFERENCES member(id)
);

-- 배지
CREATE TABLE badge (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    condition_type VARCHAR(30),
    condition_value INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 회원 배지
CREATE TABLE member_badge (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    badge_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_mb_member FOREIGN KEY (member_id) REFERENCES member(id),
    CONSTRAINT fk_mb_badge FOREIGN KEY (badge_id) REFERENCES badge(id)
);