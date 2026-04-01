-- 온보딩 여부 확인 컬럼
ALTER TABLE member
ADD COLUMN onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE;

-- user_habit 테이블에 habit 테이블 컬럼들 추가
ALTER TABLE user_habit
DROP FOREIGN KEY fk_uh_habit,
DROP COLUMN habit_id,
ADD COLUMN name VARCHAR(100) NOT NULL AFTER member_id,
ADD COLUMN category_id BIGINT AFTER name,
ADD CONSTRAINT fk_uh_category FOREIGN KEY (category_id) REFERENCES category(id);

-- category 테이블에 member_id 추가로 사용자 카테고리 구분
ALTER TABLE category
ADD COLUMN member_id BIGINT NULL,
ADD CONSTRAINT fk_category_member FOREIGN KEY
(member_id) REFERENCES member(id) ON DELETE CASCADE,
MODIFY COLUMN code VARCHAR(30) NULL;

-- 쓰지 않는 테이블 삭제
DROP TABLE IF EXISTS habit_category;
DROP TABLE IF EXISTS habit;
DROP TABLE IF EXISTS user_category;