-- 습관 기록에 상태 표시(기본 '완료', 하트 사용시 '하트'처리)
ALTER TABLE habit_history
ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'DONE',
ADD CONSTRAINT fk_habit_history_user_habit_id
FOREIGN KEY (user_habit_id) REFERENCES user_habit (id) ON DELETE CASCADE;

-- 카테고리에 대표 이모지 컬럼 추가
ALTER TABLE category
ADD COLUMN emoji VARCHAR(255);