CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE food_images(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    surplus_food_id UUID NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_image_food FOREIGN KEY (surplus_food_id) REFERENCES surplus_foods(id) ON DELETE CASCADE
);