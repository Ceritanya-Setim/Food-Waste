CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE reviews(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    user_id UUID NOT NULL,
    business_id UUID NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_review_order FOREIGN KEY(order_id)  REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_review_user FOREIGN KEY(user_id)  REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_review_business FOREIGN KEY(business_id)  REFERENCES businesses(id) ON DELETE CASCADE
);