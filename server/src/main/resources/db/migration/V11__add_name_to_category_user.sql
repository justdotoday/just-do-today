-- category_user 테이블에 유저 카테고리 이름 컬럼 추가
ALTER TABLE category_user ADD COLUMN name VARCHAR(100) NULL AFTER emoji;

-- 기존 행 이름을 category.name에서 복사
UPDATE category_user cu
    JOIN category c ON cu.category_id = c.id
    SET cu.name = c.name;

-- NOT NULL로 변경
ALTER TABLE category_user MODIFY COLUMN name VARCHAR(100) NOT NULL;