ALTER TABLE member
  ADD COLUMN profile_image_url VARCHAR(255) NULL,
  ADD COLUMN user_code VARCHAR(6) NOT NULL UNIQUE,
  MODIFY COLUMN nickname VARCHAR(20) UNIQUE NOT NULL,
  DROP COLUMN email,
  DROP COLUMN password,
	DROP COLUMN ranking_enabled;

ALTER TABLE habit_category
	DROP COLUMN is_primary;