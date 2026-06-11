CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.business_locations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    business_id uuid NOT NULL,
    address text NOT NULL,
    city character varying(100) NOT NULL,
    province character varying(100) NOT NULL,
    postal_code character varying(20) NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    opening_time time without time zone NOT NULL,
    closing_time time without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);

CREATE TABLE public.businesses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    owner_id uuid NOT NULL,
    business_name character varying(100) NOT NULL,
    description text,
    category character varying(100) NOT NULL,
    logo_url text,
    is_verified boolean,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);

CREATE TABLE public.order_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    order_id uuid NOT NULL,
    surplus_food_id uuid NOT NULL,
    quantity integer NOT NULL,
    price_per_item integer NOT NULL,
    subtotal integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);

CREATE TABLE public.orders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    business_location_id uuid NOT NULL,
    total_price integer NOT NULL,
    status character varying(50) NOT NULL,
    pickup_code character varying(100) NOT NULL,
    order_time timestamp without time zone NOT NULL,
    pickup_time timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);

CREATE TABLE public.payments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    order_id uuid NOT NULL,
    payment_method character varying(50) NOT NULL,
    payment_status character varying(50) NOT NULL,
    transaction_reference character varying(255) NOT NULL,
    paid_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);

CREATE TABLE public.reviews (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    order_id uuid NOT NULL,
    surplus_food_id uuid NOT NULL,
    user_id uuid NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);
CREATE TABLE public.surplus_foods (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    business_location_id uuid NOT NULL,
    image_url text NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    original_price integer NOT NULL,
    discount_price integer NOT NULL,
    quantity_available integer NOT NULL,
    quantity_remaining integer NOT NULL,
    pickup_start_time timestamp without time zone NOT NULL,
    pickup_end_time timestamp without time zone NOT NULL,
    expiry_time timestamp without time zone NOT NULL,
    status character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone_number character varying(20),
    password_hash text NOT NULL,
    role character varying(20) NOT NULL,
    profile_image_url text,
    is_verified boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);

-- =====================================================
-- DATA: public.users - Updated
-- =====================================================
INSERT INTO public.users (id, full_name, email, phone_number, password_hash, role, profile_image_url, is_verified, created_at, updated_at, deleted_at) VALUES ('38b1024e-c9d2-4e02-a004-b9ad6c53bda2', 'Budi Santoso', 'budi@example.com', '081234567891', '$2a$10$ked/3avpdrwMmClgOQzGUOgDVRqvGT3nRyEBanPlFObBe2WS6spwG', 'customer', 'http://localhost:5000/storage/profile/avatar.png', FALSE, '2026-03-07 14:22:32.114247', '2026-03-07 14:22:32.114247', NULL);
INSERT INTO public.users (id, full_name, email, phone_number, password_hash, role, profile_image_url, is_verified, created_at, updated_at, deleted_at) VALUES ('3d1dc838-b1ab-4360-b2cc-dcc7e424ac56', 'Eka Wijaya', 'eka@example.com', '081234567894', '$2a$10$z/pO/dg2CiHJCsnWntIy7ef0Hb/kPuURUpfgUXEj/Pc/mdTiQMItW', 'customer', 'http://localhost:5000/storage/profile/avatar.png', FALSE, '2026-03-07 14:22:32.119222', '2026-03-07 14:22:32.119222', NULL);
INSERT INTO public.users (id, full_name, email, phone_number, password_hash, role, profile_image_url, is_verified, created_at, updated_at, deleted_at) VALUES ('b48e37fe-9682-4a03-87c0-bc78adb9dbf9', 'orgil', 'orgil@gmail.com', '123412341234', '$2a$10$WQ1Qw9RB75VmQ9rJgMW6SOt11e8YQg2Iqx8d1aW1zSq5C6eeYtsre', 'customer', 'http://localhost:5000/storage/profile/avatar.png', FALSE, '2026-05-27 16:39:02.855661', '2026-05-27 16:39:02.855661', NULL);
INSERT INTO public.users (id, full_name, email, phone_number, password_hash, role, profile_image_url, is_verified, created_at, updated_at, deleted_at) VALUES ('c5dcb69b-bf2b-4bba-a29f-f35a703d7e43', 'andi', 'andi@example.com', '081234567890', '$2a$10$EDT9FVMzcogKYkyDYQlV2O3uAmAkOa4coGF/COalSulNu674w1zee', 'customer', 'http://localhost:5000/storage/profile/avatar.png', TRUE, '2026-03-07 14:22:32.107379', '2026-05-27 16:41:26.96963', NULL);
-- Merchant
INSERT INTO public.users (id, full_name, email, phone_number, password_hash, role, profile_image_url, is_verified, created_at, updated_at, deleted_at) VALUES ('62e87872-9c31-42f3-8bcb-28839910d4e9', 'Citra Lestari', 'citra@example.com', '081234567892', '$2a$10$CCGz88IO7UPDytuQn4cVDec8Z7D.j8u32Zr28.IXklCQEh9.ICXf.', 'merchant', 'http://localhost:5000/storage/profile/avatar.png', TRUE, '2026-03-07 14:22:32.116165', '2026-03-07 14:22:32.116165', NULL);
INSERT INTO public.users (id, full_name, email, phone_number, password_hash, role, profile_image_url, is_verified, created_at, updated_at, deleted_at) VALUES ('fbe4077e-8446-48aa-8e75-441c2c9fa0d9', 'Dewa Saputra', 'dewa@example.com', '081234567893', '$2a$10$Iiq2zt1I5dyV8byA9NazPuCoHT1FECfBdP1GWEsJacSNQ1NeQnqNe', 'merchant', 'http://localhost:5000/storage/profile/avatar.png', TRUE, '2026-03-07 14:22:32.11773', '2026-03-07 14:22:32.11773', NULL);
INSERT INTO public.users (id, full_name, email, phone_number, password_hash, role, profile_image_url, is_verified, created_at, updated_at, deleted_at) VALUES ('d8c2b1a1-1234-4a1b-8c9d-0e1f2a3b4c5d', 'Fina Melati', 'fina@example.com', '081234567895', '$2a$10$CCGz88IO7UPDytuQn4cVDec8Z7D.j8u32Zr28.IXklCQEh9.ICXf.', 'merchant', 'http://localhost:5000/storage/profile/avatar.png', TRUE, '2026-06-08 09:21:43', '2026-06-08 09:21:43', NULL);
INSERT INTO public.users (id, full_name, email, phone_number, password_hash, role, profile_image_url, is_verified, created_at, updated_at, deleted_at) VALUES ('e9d3c2b2-2345-4b1c-9d0e-1f2a3b4c5d6e', 'Gilang Ramadhan', 'gilang@example.com', '081234567896', '$2a$10$Iiq2zt1I5dyV8byA9NazPuCoHT1FECfBdP1GWEsJacSNQ1NeQnqNe', 'merchant', 'http://localhost:5000/storage/profile/avatar.png', TRUE, '2026-06-08 09:21:43', '2026-06-08 09:21:43', NULL);

-- =====================================================
-- DATA: public.businesses - Updated
-- =====================================================
INSERT INTO public.businesses (id, owner_id, business_name, description, category, created_at, updated_at) VALUES 
('b1111111-1111-4111-a111-111111111111', '62e87872-9c31-42f3-8bcb-28839910d4e9', 'Umami Noodle House', 'Spesialis Makanan Berat', 'Makanan Berat', NOW(), NOW()),
('b2222222-2222-4222-a222-222222222222', 'fbe4077e-8446-48aa-8e75-441c2c9fa0d9', 'Sweet Layer Patisserie', 'Spesialis Bakery', 'Roti & Kue', NOW(), NOW()),
('b3333333-3333-4333-a333-333333333333', 'd8c2b1a1-1234-4a1b-8c9d-0e1f2a3b4c5d', 'Gyoza & Co.', 'Spesialis Camilan', 'Camilan', NOW(), NOW()),
('b4444444-4444-4444-a444-444444444444', 'e9d3c2b2-2345-4b1c-9d0e-1f2a3b4c5d6e', 'Botanical Tea Lounge', 'Spesialis Minuman', 'Minuman', NOW(), NOW());

-- =====================================================
-- DATA: public.business_locations - Updated
-- =====================================================
INSERT INTO public.business_locations (id, business_id, address, city, province, postal_code, latitude, longitude, opening_time, closing_time, created_at, updated_at) VALUES 
('10c11111-1111-4111-a111-111111111111', 'b1111111-1111-4111-a111-111111111111', 'Jl. Melawai Raya No. 8', 'Jakarta Selatan', 'DKI Jakarta', '12160', -6.2435, 106.8010, '08:00:00', '22:00:00', NOW(), NOW()),
('10c22222-2222-4222-a222-222222222222', 'b2222222-2222-4222-a222-222222222222', 'Jl. Panglima Polim No. 5', 'Jakarta Selatan', 'DKI Jakarta', '12160', -6.2450, 106.8000, '08:00:00', '22:00:00', NOW(), NOW()),
('10c33333-3333-4333-a333-333333333333', 'b3333333-3333-4333-a333-333333333333', 'Mall Grand Indonesia', 'Jakarta Pusat', 'DKI Jakarta', '10310', -6.1950, 106.8200, '10:00:00', '22:00:00', NOW(), NOW()),
('10c44444-4444-4444-a444-444444444444', 'b4444444-4444-4444-a444-444444444444', 'Jl. Suryo No. 14', 'Jakarta Selatan', 'DKI Jakarta', '12180', -6.2350, 106.8150, '07:00:00', '23:00:00', NOW(), NOW());

-- =====================================================
-- DATA: public.surplus_foods - Updated
-- =====================================================
INSERT INTO public.surplus_foods (id, business_location_id, image_url, title, description, original_price, discount_price, quantity_available, quantity_remaining, pickup_start_time, pickup_end_time, expiry_time, status, created_at, updated_at) VALUES 
-- 3 MENU UNTUK BUSINESS 1 (MAKANAN BERAT)
('f1000000-0000-4000-a000-000000000001', '10c11111-1111-4111-a111-111111111111', 'https://images.squarespace-cdn.com/content/v1/5e185ce3e56525704fdae715/285175dc-3dda-4f26-8136-397d8d61dad6/DSC02846.jpg', 'Kyoto Tori Paitan Ramen (Mini/Regular Portions)', 'Kelebihan sisa bahan mi segar harian, khusus porsi terakhir malam ini diberikan potongan harga besar.', 38000, 20000, 2, 2, '2026-06-08 21:00:00', '2026-06-08 22:00:00', '2026-08-08 23:59:59', 'active', NOW(), NOW()),
('f1000000-0000-4000-a000-000000000002', '10c11111-1111-4111-a111-111111111111', 'https://i.ytimg.com/vi/1RhFkVRWSU8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDVNbtvvkkG-XYRoZz-1fQYp7nUvg', 'Nasi Goreng Sei Sapi Asap', 'Menu andalan restoran yang paling banyak dicari pengguna untuk diselamatkan hari ini.', 20000, 20000, 3, 3, '2026-06-08 16:00:00', '2026-06-08 17:00:00', '2026-08-08 23:59:59', 'active', NOW(), NOW()),
('f1000000-0000-4000-a000-000000000003', '10c11111-1111-4111-a111-111111111111', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200', 'Honey Garlic Butter Chicken Rice Bowl', 'Fillet ayam krispi bumbu mentega bawang putih madu dengan telur mata sapi porsi reguler.', 0, 0, 2, 2, '2026-06-08 21:00:00', '2026-06-08 22:30:00', '2026-08-08 23:59:59', 'active', NOW(), NOW()),
-- 3 MENU UNTUK BUSINESS 2 (ROTI & KUE)
('f2000000-0000-4000-a000-000000000001', '10c22222-2222-4222-a222-222222222222', 'https://thenovicechefblog.com/wp-content/uploads/2011/09/Salted-Caramel-Brownies-Image.jpg', 'Salted Caramel Fudgy Brownies', 'Potongan sisa cake event catering, diobral murah meriah menjelang malam.', 15000, 15000, 5, 5, '2026-06-08 19:00:00', '2026-06-08 20:30:00', '2026-08-08 23:59:59', 'active', NOW(), NOW()),
('f2000000-0000-4000-a000-000000000002', '10c22222-2222-4222-a222-222222222222', 'https://www.tencha.in/cdn/shop/articles/ashishagarwalv_matcha_tiramisu_ar_169_fb7dc0dd-a7a1-4d91-97ee-6679f3950a50_copy.jpg?v=1716642506&width=2048', 'Classic Matcha Tiramisu (Personal Cup)', 'Menu pencuci mulut paling laris yang menjadi favorit komunitas pencinta makanan surplus.', 45000, 15000, 2, 2, '2026-06-08 20:00:00', '2026-06-08 21:00:00', '2026-08-08 23:59:59', 'active', NOW(), NOW()),
('f2000000-0000-4000-a000-000000000003', '10c22222-2222-4222-a222-222222222222', 'https://hips.hearstapps.com/hmg-prod/images/churros-index-661d4692d05e4.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*', 'Cinnamon Sugar Churros (6 pcs)', 'Kue churros renyah bertabur gula kayu manis lengkap dengan saus cokelat hitam kental.', 15000, 15000, 3, 3, '2026-06-08 21:00:00', '2026-06-08 22:00:00', '2026-08-08 23:59:59', 'active', NOW(), NOW()),
-- 3 MENU UNTUK BUSINESS 3 (CAMILAN)
('f3000000-0000-4000-a000-000000000001', '10c33333-3333-4333-a333-333333333333', 'https://cardamommagazine.com/wp-content/uploads/2021/04/chicken-gyoza.jpg', 'Crispy Garlic Chicken Gyoza (5 pcs)', 'Sisa batch penggorengan sore, harganya dipotong langsung agar cepat terjual sebelum kedai tutup.', 25000, 12000, 4, 4, '2026-06-08 18:00:00', '2026-06-08 19:30:00', '2026-08-08 23:59:59', 'active', NOW(), NOW()),
('f3000000-0000-4000-a000-000000000002', '10c33333-3333-4333-a333-333333333333', 'https://hungryhealthyhappy.com/wp-content/uploads/2021/04/parmesan-truffle-fries-featured.jpg', 'Truffle Parmesan Fries', 'Kentang goreng gurih aromatik yang seluruh hasil penjualannya akan disalurkan ke panti asuhan terdekat.', 18000, 18000, 5, 5, '2026-06-08 17:00:00', '2026-06-08 18:00:00', '2026-08-08 23:59:59', 'active', NOW(), NOW()),
('f3000000-0000-4000-a000-000000000003', '10c33333-3333-4333-a333-333333333333', 'https://asset.kompas.com/crops/qK5SgGe89V44eAziu65Qjf07eU4=/0x10:968x655/1200x800/data/photo/2024/01/30/65b87d3e40a77.jpg', 'Hakau Udang Transparan (4 pcs)', 'Dimsum kukus klasik dengan kulit transparan lembut berisi udang utuh segar.', 0, 0, 3, 3, '2026-06-08 17:30:00', '2026-06-08 19:00:00', '2026-08-08 23:59:59', 'active', NOW(), NOW()),
-- 3 MENU UNTUK BUSINESS 4 (MINUMAN)
('f4000000-0000-4000-a000-000000000001', '10c44444-4444-4444-a444-444444444444', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200', 'Lychee Rose White Tea', 'Stok seduh dingin sisa penjualan siang, diturunkan harganya agar segera habis sebelum tutup operasional.', 0, 0, 4, 4, '2026-06-08 17:00:00', '2026-06-08 18:00:00', '2026-08-08 23:59:59', 'active', NOW(), NOW()),
('f4000000-0000-4000-a000-000000000002', '10c44444-4444-4444-a444-444444444444', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1200', 'Iced Sea Salt Caramel Latte', 'Pembelian menu signature ini otomatis mendonasikan sebagian dana untuk pengelolaan sisa makanan terpadu komunitas lokal.', 8000, 8000, 3, 3, '2026-06-08 16:00:00', '2026-06-08 17:00:00', '2026-08-08 23:59:59', 'active', NOW(), NOW()),
('f4000000-0000-4000-a000-000000000003', '10c44444-4444-4444-a444-444444444444', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200', 'Fizzy Blue Curacao Mocktail', 'Minuman soda jeruk biru yang menyegarkan dengan campuran perasan lemon dan daun mint segar.', 26000, 26000, 3, 3, '2026-06-08 20:00:00', '2026-06-08 21:00:00', '2026-08-08 23:59:59', 'active', NOW(), NOW());

-- =====================================================
-- DATA: public.orders - Updated
-- =====================================================
INSERT INTO public.orders (id, user_id, business_location_id, total_price, status, pickup_code, order_time, pickup_time, created_at, updated_at, deleted_at) VALUES 
('80e56344-5ef4-472f-a333-ac0b6603312f', 'c5dcb69b-bf2b-4bba-a29f-f35a703d7e43', '10c11111-1111-4111-a111-111111111111', 15000, 'pending', 'PICKUP-080826', '2026-03-07 13:52:32', '2026-03-07 15:22:32', NOW(), NOW(), NULL),
('8e08b4c7-2147-4887-9651-3681760eec4e', '38b1024e-c9d2-4e02-a004-b9ad6c53bda2', '10c22222-2222-4222-a222-222222222222', 25000, 'paid', 'PICKUP-080827', '2026-03-07 12:22:32', '2026-03-07 16:22:32', NOW(), NOW(), NULL),
('60b48ce8-94cd-4bb6-be9b-18a0797d2972', '3d1dc838-b1ab-4360-b2cc-dcc7e424ac56', '10c33333-3333-4333-a333-333333333333', 12000, 'completed', 'PICKUP-080828', '2026-03-07 09:22:32', '2026-03-07 12:22:32', NOW(), NOW(), NULL),
('adb020a3-0e52-48c8-9854-e557b878ea2f', 'b48e37fe-9682-4a03-87c0-bc78adb9dbf9', '10c44444-4444-4444-a444-444444444444', 10000, 'cancelled', 'PICKUP-080829', '2026-03-07 11:22:32', '2026-03-07 15:22:32', NOW(), NOW(), NULL),
('e50f6bb3-c074-45af-94b3-b84d840b4e83', '3d1dc838-b1ab-4360-b2cc-dcc7e424ac56', '10c11111-1111-4111-a111-111111111111', 20000, 'expired', 'PICKUP-080830', '2026-03-07 04:22:32', '2026-03-07 08:22:32', NOW(), NOW(), NULL);


-- =====================================================
-- DATA: public.order_items - Updated
-- =====================================================
INSERT INTO public.order_items (id, order_id, surplus_food_id, quantity, price_per_item, subtotal, created_at, updated_at, deleted_at) VALUES 
('45108541-dbde-4bb0-9c47-a59a4f896b72', '80e56344-5ef4-472f-a333-ac0b6603312f', 'f1000000-0000-4000-a000-000000000001', 2, 15000, 30000, NOW(), NOW(), NULL),
('50089a5a-9b0f-4089-857d-5929d7036a67', '8e08b4c7-2147-4887-9651-3681760eec4e', 'f2000000-0000-4000-a000-000000000001', 2, 15000, 30000, NOW(), NOW(), NULL),
('32ba3e03-ede4-4799-bd9c-9d71e83dde33', '60b48ce8-94cd-4bb6-be9b-18a0797d2972', 'f3000000-0000-4000-a000-000000000001', 2, 15000, 30000, NOW(), NOW(), NULL),
('747e6f6a-f1ca-4057-a0b7-4eb71566203a', 'adb020a3-0e52-48c8-9854-e557b878ea2f', 'f4000000-0000-4000-a000-000000000002', 2, 15000, 30000, NOW(), NOW(), NULL),
('ca6934cd-dc78-47c5-93e8-1283ac86751f', 'e50f6bb3-c074-45af-94b3-b84d840b4e83', 'f1000000-0000-4000-a000-000000000002', 2, 15000, 30000, NOW(), NOW(), NULL);

-- =====================================================
-- DATA: public.payments - Updated
-- =====================================================
INSERT INTO public.payments (id, order_id, payment_method, payment_status, transaction_reference, paid_at, created_at, updated_at, deleted_at) VALUES 
('74429082-1668-445f-98c0-8c0f8c686546', '80e56344-5ef4-472f-a333-ac0b6603312f', 'gopay', 'pending', 'TRX-19622d0a-d747-457c-b48f-c5b4b76b58e9', NULL, NOW(), NOW(), NULL),
('a94feabe-ba66-4718-aa55-f4d04369ccba', '8e08b4c7-2147-4887-9651-3681760eec4e', 'dana', 'success', 'TRX-7d8bfec6-afd2-4f75-80e3-64a65c2f46ce', '2026-03-07 14:22:32', NOW(), NOW(), NULL),
('e12fb6aa-2293-4c3b-8b1b-24159dcb6f96', '60b48ce8-94cd-4bb6-be9b-18a0797d2972', 'bank_transfer', 'failed', 'TRX-1c241dc3-a83f-42d6-9f48-76841098d112', NULL, NOW(), NOW(), NULL),
('deddb699-e911-4e5e-927f-8e8175ca5dea', 'adb020a3-0e52-48c8-9854-e557b878ea2f', 'gopay', 'pending', 'TRX-80aa4bf6-6bce-4e16-be75-1e3411def582', NULL, NOW(), NOW(), NULL),
('5413fce9-9067-433b-b777-d034b15eb509', 'e50f6bb3-c074-45af-94b3-b84d840b4e83', 'dana', 'success', 'TRX-e9b99b9b-e9a2-46a7-ac50-00ee690a4786', '2026-03-07 14:22:32', NOW(), NOW(), NULL);


-- =====================================================
-- DATA: public.reviews - Updated
-- =====================================================
INSERT INTO public.reviews (id, order_id, surplus_food_id, user_id, rating, comment, created_at, updated_at, deleted_at) VALUES 
('3995fe20-8103-44cd-aa47-f7400ea8055c', '60b48ce8-94cd-4bb6-be9b-18a0797d2972', 'f3000000-0000-4000-a000-000000000001', '3d1dc838-b1ab-4360-b2cc-dcc7e424ac56', 5, 'Makanannya enak banget!', NOW(), NOW(), NULL),
('9520acdf-e4df-45e0-89c0-53deb8882f79', '8e08b4c7-2147-4887-9651-3681760eec4e', 'f2000000-0000-4000-a000-000000000001', '38b1024e-c9d2-4e02-a004-b9ad6c53bda2', 5, 'Fresh and delicious', NOW(), NOW(), NULL),
('8acdb425-ff71-447e-a1f9-cc37813d7806', '60b48ce8-94cd-4bb6-be9b-18a0797d2972', 'f3000000-0000-4000-a000-000000000001', '3d1dc838-b1ab-4360-b2cc-dcc7e424ac56', 4, 'Worth the discounted price', NOW(), NOW(), NULL),
('18f3bc0b-89cb-41c2-bf87-73fbd2e36e0d', 'adb020a3-0e52-48c8-9854-e557b878ea2f', 'f4000000-0000-4000-a000-000000000002', 'b48e37fe-9682-4a03-87c0-bc78adb9dbf9', 5, 'Pickup was easy and food tasted great', NOW(), NOW(), NULL),
('6a47ef86-e083-4e81-b765-258f38e894f4', 'e50f6bb3-c074-45af-94b3-b84d840b4e83', 'f1000000-0000-4000-a000-000000000002', '3d1dc838-b1ab-4360-b2cc-dcc7e424ac56', 3, 'Portion was okay but still good', NOW(), NOW(), NULL);


-- FOREIGN KEYS
ALTER TABLE ONLY public.business_locations
    ADD CONSTRAINT business_locations_pkey PRIMARY KEY (id);


--
-- Name: businesses businesses_pkey; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT businesses_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pickup_code_key; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pickup_code_key UNIQUE (pickup_code);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: surplus_foods surplus_foods_pkey; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.surplus_foods
    ADD CONSTRAINT surplus_foods_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: business_locations fk_business_location; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.business_locations
    ADD CONSTRAINT fk_business_location FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT fk_business_owner FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_items_surplus_food FOREIGN KEY (surplus_food_id) REFERENCES public.surplus_foods(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_order_location FOREIGN KEY (business_location_id) REFERENCES public.business_locations(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_review_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_review_surplus_food FOREIGN KEY (surplus_food_id) REFERENCES public.surplus_foods(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.surplus_foods
    ADD CONSTRAINT fk_surplus_location FOREIGN KEY (business_location_id) REFERENCES public.business_locations(id) ON DELETE CASCADE;