CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    business_location_id UUID NOT NULL,
    total_price INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    pickup_code VARCHAR(100) UNIQUE NOT NULL,
    order_time TIMESTAMP NOT NULL,
    pickup_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_location FOREIGN KEY (business_location_id) REFERENCES business_locations(id) ON DELETE CASCADE
);