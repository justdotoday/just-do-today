CREATE TABLE user_habit_freeze_history(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_habit_id BIGINT NOT NULL,
    frozen_from  DATE NOT NULL,
    frozen_until DATE NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    FOREIGN KEY (user_habit_id) REFERENCES user_habit(id) ON DELETE CASCADE
);