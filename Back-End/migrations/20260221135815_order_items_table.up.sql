CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_items(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    surplus_food_id UUID NOT NULL,
    quantity INT NOT NULL,
    price_per_item INT NOT NULL,
    subtotal INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_order_items_order FOREIGN KEY(order_id)  REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_surplus_food FOREIGN KEY(surplus_food_id)  REFERENCES surplus_foods(id) ON DELETE CASCADE
);