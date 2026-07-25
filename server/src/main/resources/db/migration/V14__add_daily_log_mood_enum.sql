-- daily_log.mood 컬럼을 자유 문자열 → ENUM으로 고정
-- ⚠️ 적용 전 SELECT DISTINCT mood FROM daily_log 로 세 값 외 데이터 없는지 확인
ALTER TABLE daily_log
    MODIFY COLUMN mood ENUM('ATTEMPT', 'MAINTAIN', 'PERFECT');