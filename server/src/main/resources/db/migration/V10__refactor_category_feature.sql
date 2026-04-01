-- user_habit에 공개여부 컬럼 추가
ALTER TABLE user_habit
ADD COLUMN is_public VARCHAR(1) DEFAULT '1' AFTER start_date;

-- category_user 테이블 추가
CREATE TABLE category_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    emoji VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category_user_category
        FOREIGN KEY (category_id) REFERENCES category(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_category_user_member
        FOREIGN KEY (member_id) REFERENCES member(id)
        ON DELETE CASCADE,
    CONSTRAINT uq_category_user_category_member
        UNIQUE (category_id, member_id)
);

-- category 테이블 수정
ALTER TABLE category
	DROP FOREIGN KEY fk_category_member,
	DROP COLUMN member_id,
	DROP COLUMN emoji,
	ADD CONSTRAINT uq_category_name UNIQUE (name);

-- user_habit에 category_id를 category_user_id로 변경
ALTER TABLE user_habit
	DROP FOREIGN KEY fk_uh_category,
	DROP COLUMN category_id,
    ADD COLUMN category_user_id BIGINT NOT NULL,
    ADD CONSTRAINT fk_user_habit_category_user
    FOREIGN KEY (category_user_id) REFERENCES category_user(id)
    ON DELETE RESTRICT;