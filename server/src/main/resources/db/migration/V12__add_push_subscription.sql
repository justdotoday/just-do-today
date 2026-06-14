ALTER TABLE notification_setting
    DROP COLUMN start_time,
    DROP COLUMN end_time,
    ADD COLUMN push_endpoint TEXT NULL,
    ADD COLUMN push_p256dh   VARCHAR(255) NULL,
    ADD COLUMN push_auth     VARCHAR(100) NULL,
    ADD COLUMN notify_time   TIME NULL;
