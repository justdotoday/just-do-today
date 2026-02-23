UPDATE category
SET code = 'NIGHT_ROUTINE'
WHERE name = '나이트루틴' AND code = 'MORNING_ROUTINE';

INSERT INTO category (code, name, emoji, is_active, display_order)
SELECT 'MORNING_ROUTINE', '모닝루틴', '🌞', 1, 9
WHERE NOT EXISTS (
  SELECT 1 FROM category WHERE code = 'MORNING_ROUTINE'
);