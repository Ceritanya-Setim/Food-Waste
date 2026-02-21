CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE surplus_foods(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_location_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    original_price INT NOT NULL,
    discount_price INT NOT NULL,
    quantity_available INT NOT NULL,
    quantity_remaining INT NOT NULL,
    pickup_start_time TIMESTAMP NOT NULL,
    pickup_end_time TIMESTAMP NOT NULL,
    expiry_time TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_surplus_location FOREIGN KEY(business_location_id) REFERENCES business_locations(ID) ON DELETE CASCADE
);