-- 프리즈 기한 컬럼 추가
ALTER TABLE user_habit
ADD COLUMN frozen_until DATE;

-- member 테이블에 freezes 컬럼 추가
ALTER TABLE member
ADD COLUMN freezes INT NOT NULL DEFAULT 1;

-- category 테이블에서 color 컬럼 삭제
ALTER TABLE category
DROP COLUMN color;

-- user_habit 테이블에서 color 컬럼 추가
ALTER TABLE user_habit
ADD COLUMN color VARCHAR(20) NOT NULL
AFTER status;

-- category 테이블에 데이터 추가
INSERT INTO category
  (code, name, emoji, is_active, display_order)
VALUES
  ('HEALTH', '건강관리', '💊', 1, 1),
  ('MINDFULNESS', '마음챙김', '☕', 1, 2),
  ('EXERCISE', '운동', '🏋️', 1, 3),
  ('LIFESTYLE', '생활습관', '✅', 1, 4),
  ('SELF_DEVELOPMENT','자기계발', '📝', 1, 5),
  ('READING', '독서', '📖', 1, 6),
  ('STUDY', '공부', '📘', 1, 7),
  ('CAREER', '커리어', '💼', 1, 8),
  ('MORNING_ROUTINE', '모닝루틴', '🌞', 1, 9),
  ('MORNING_ROUTINE', '나이트루틴', '🌙', 1, 10)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  emoji = VALUES(emoji),
  is_active = VALUES(is_active),
  display_order = VALUES(display_order);