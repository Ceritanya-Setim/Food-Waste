--
-- PostgreSQL database dump
--

\restrict MWmz7cL7UEBi2RXGOSKeLOExCgZgNZv6HcC3DdVa3yeV68nlpfz6WwUZeSoJwje

-- Dumped from database version 16.12 (Debian 16.12-1.pgdg13+1)
-- Dumped by pg_dump version 16.12 (Debian 16.12-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: business_locations; Type: TABLE; Schema: public; Owner: cihuy
--

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


ALTER TABLE public.business_locations OWNER TO cihuy;

--
-- Name: businesses; Type: TABLE; Schema: public; Owner: cihuy
--

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


ALTER TABLE public.businesses OWNER TO cihuy;

--
-- Name: food_images; Type: TABLE; Schema: public; Owner: cihuy
--

CREATE TABLE public.food_images (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    surplus_food_id uuid NOT NULL,
    image_url text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.food_images OWNER TO cihuy;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: cihuy
--

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


ALTER TABLE public.order_items OWNER TO cihuy;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: cihuy
--

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


ALTER TABLE public.orders OWNER TO cihuy;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: cihuy
--

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


ALTER TABLE public.payments OWNER TO cihuy;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: cihuy
--

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


ALTER TABLE public.reviews OWNER TO cihuy;

--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: cihuy
--

CREATE TABLE public.schema_migrations (
    version bigint NOT NULL,
    dirty boolean NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO cihuy;

--
-- Name: surplus_foods; Type: TABLE; Schema: public; Owner: cihuy
--

CREATE TABLE public.surplus_foods (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    business_location_id uuid NOT NULL,
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


ALTER TABLE public.surplus_foods OWNER TO cihuy;

--
-- Name: users; Type: TABLE; Schema: public; Owner: cihuy
--

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


ALTER TABLE public.users OWNER TO cihuy;

--
-- Data for Name: business_locations; Type: TABLE DATA; Schema: public; Owner: cihuy
--

COPY public.business_locations (id, business_id, address, city, province, postal_code, latitude, longitude, opening_time, closing_time, created_at, updated_at, deleted_at) FROM stdin;
3e7dd2ab-f9b0-4d90-a830-684df5b2f274	9fcc7230-e45f-4491-b747-dabe1cf7a1a3	Jl. Sudirman No. 10	Jakarta	DKI Jakarta	10220	-6.2088	106.8456	08:00:00	17:00:00	2026-03-07 14:22:32.135981	2026-03-07 14:22:32.135981	\N
dbb69039-637b-4d7f-98e4-ed0198164a1d	0421025f-c8b3-4ca3-b7f9-fc1d40798b95	Jl. Asia Afrika No. 15	Bandung	Jawa Barat	40111	-6.9175	107.6191	08:00:00	17:00:00	2026-03-07 14:22:32.139641	2026-03-07 14:22:32.139641	\N
9fa914ed-b715-408c-9d26-cea9d503ec4b	1a168029-a9ea-439d-9447-21f1b4784ae1	Jl. Pemuda No. 8	Surabaya	Jawa Timur	60271	-7.2575	112.7521	08:00:00	17:00:00	2026-03-07 14:22:32.142006	2026-03-07 14:22:32.142006	\N
1bb574ae-e29c-42e8-bae3-f33d6179936b	548d9075-6288-4b8f-9a51-45f439920876	Jl. Malioboro No. 1	Yogyakarta	DI Yogyakarta	55213	-7.7956	110.3695	08:00:00	17:00:00	2026-03-07 14:22:32.143953	2026-03-07 14:22:32.143953	\N
de25f5c8-46b8-4de2-b4f2-d5b9ff6e5947	82eb463b-d4f8-429b-aa31-40ef4f29ed39	Jl. Hasanuddin No. 20	Makassar	Sulawesi Selatan	90111	-5.1477	119.4327	08:00:00	17:00:00	2026-03-07 14:22:32.145817	2026-03-07 14:22:32.145817	\N
\.


--
-- Data for Name: businesses; Type: TABLE DATA; Schema: public; Owner: cihuy
--

COPY public.businesses (id, owner_id, business_name, description, category, logo_url, is_verified, created_at, updated_at, deleted_at) FROM stdin;
9fcc7230-e45f-4491-b747-dabe1cf7a1a3	c5dcb69b-bf2b-4bba-a29f-f35a703d7e43	Andi's Coffee	Cozy coffee shop with a modern vibe	fast-food	https://example.com/logo1.png	t	2026-03-07 14:22:32.122433	2026-03-07 14:22:32.122433	\N
0421025f-c8b3-4ca3-b7f9-fc1d40798b95	38b1024e-c9d2-4e02-a004-b9ad6c53bda2	Budi Bakery	Freshly baked bread and pastries	bakery	https://example.com/logo2.png	f	2026-03-07 14:22:32.126135	2026-03-07 14:22:32.126135	\N
1a168029-a9ea-439d-9447-21f1b4784ae1	62e87872-9c31-42f3-8bcb-28839910d4e9	Citra Restaurant	Authentic local cuisine with modern touch	buffets	https://example.com/logo3.png	t	2026-03-07 14:22:32.12809	2026-03-07 14:22:32.12809	\N
548d9075-6288-4b8f-9a51-45f439920876	fbe4077e-8446-48aa-8e75-441c2c9fa0d9	Dewa Hotel	Comfortable stay with great service	asian-food	https://example.com/logo4.png	t	2026-03-07 14:22:32.129904	2026-03-07 14:22:32.129904	\N
82eb463b-d4f8-429b-aa31-40ef4f29ed39	3d1dc838-b1ab-4360-b2cc-dcc7e424ac56	Eka's Eatery	Casual dining with tasty local dishes	buffets	https://example.com/logo5.png	f	2026-03-07 14:22:32.131852	2026-03-07 14:22:32.131852	\N
\.


--
-- Data for Name: food_images; Type: TABLE DATA; Schema: public; Owner: cihuy
--

COPY public.food_images (id, surplus_food_id, image_url, created_at, updated_at, deleted_at) FROM stdin;
9a153ea6-ecf5-47a1-aef1-0a8cd73137e2	17572007-4b29-4a05-9391-17d243ac3440	https://images.unsplash.com/photo-1509440159596-0249088772ff	2026-03-07 14:22:32.163264	2026-03-07 14:22:32.163264	\N
f64de879-4076-438b-a211-aa721d38f963	536a0dd4-fa98-4eb5-8415-0240ab83c404	https://images.unsplash.com/photo-1546069901-ba9599a7e63c	2026-03-07 14:22:32.166397	2026-03-07 14:22:32.166397	\N
843e8ead-6e43-42b4-8d90-24ddfcf54ceb	62e546bc-6d68-4fe1-90af-e91e71aad525	https://images.unsplash.com/photo-1604908176997-431ff0f9d9b3	2026-03-07 14:22:32.168439	2026-03-07 14:22:32.168439	\N
75af13ba-b5cc-43d4-b0ca-e83c8e4fcec2	3dabc633-55d3-42c6-b002-f6bac1081687	https://images.unsplash.com/photo-1504674900247-0877df9cc836	2026-03-07 14:22:32.170666	2026-03-07 14:22:32.170666	\N
daf6b71b-906b-4f67-9ce7-85d0c0e1c18f	90d1c0fb-fd7f-463a-bc0a-46be06444998	https://images.unsplash.com/photo-1499636136210-6f4ee915583e	2026-03-07 14:22:32.172566	2026-03-07 14:22:32.172566	\N
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: cihuy
--

COPY public.order_items (id, order_id, surplus_food_id, quantity, price_per_item, subtotal, created_at, updated_at, deleted_at) FROM stdin;
45108541-dbde-4bb0-9c47-a59a4f896b72	80e56344-5ef4-472f-a333-ac0b6603312f	17572007-4b29-4a05-9391-17d243ac3440	2	15000	30000	2026-03-07 14:22:32.189926	2026-03-07 14:22:32.189926	\N
50089a5a-9b0f-4089-857d-5929d7036a67	8e08b4c7-2147-4887-9651-3681760eec4e	536a0dd4-fa98-4eb5-8415-0240ab83c404	2	15000	30000	2026-03-07 14:22:32.189926	2026-03-07 14:22:32.189926	\N
32ba3e03-ede4-4799-bd9c-9d71e83dde33	60b48ce8-94cd-4bb6-be9b-18a0797d2972	62e546bc-6d68-4fe1-90af-e91e71aad525	2	15000	30000	2026-03-07 14:22:32.189926	2026-03-07 14:22:32.189926	\N
747e6f6a-f1ca-4057-a0b7-4eb71566203a	adb020a3-0e52-48c8-9854-e557b878ea2f	3dabc633-55d3-42c6-b002-f6bac1081687	2	15000	30000	2026-03-07 14:22:32.189926	2026-03-07 14:22:32.189926	\N
ca6934cd-dc78-47c5-93e8-1283ac86751f	e50f6bb3-c074-45af-94b3-b84d840b4e83	90d1c0fb-fd7f-463a-bc0a-46be06444998	2	15000	30000	2026-03-07 14:22:32.189926	2026-03-07 14:22:32.189926	\N
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: cihuy
--

COPY public.orders (id, user_id, business_location_id, total_price, status, pickup_code, order_time, pickup_time, created_at, updated_at, deleted_at) FROM stdin;
80e56344-5ef4-472f-a333-ac0b6603312f	c5dcb69b-bf2b-4bba-a29f-f35a703d7e43	3e7dd2ab-f9b0-4d90-a830-684df5b2f274	15000	pending	b7f4275b-f811-4144-862f-9a02ff6e08be	2026-03-07 13:52:32.175243	2026-03-07 15:22:32.175243	2026-03-07 14:22:32.175836	2026-03-07 14:22:32.175836	\N
8e08b4c7-2147-4887-9651-3681760eec4e	38b1024e-c9d2-4e02-a004-b9ad6c53bda2	dbb69039-637b-4d7f-98e4-ed0198164a1d	25000	paid	53af880f-c7a5-4186-be0d-f6fc4ca42a4a	2026-03-07 12:22:32.175243	2026-03-07 16:22:32.175243	2026-03-07 14:22:32.179779	2026-03-07 14:22:32.179779	\N
60b48ce8-94cd-4bb6-be9b-18a0797d2972	62e87872-9c31-42f3-8bcb-28839910d4e9	9fa914ed-b715-408c-9d26-cea9d503ec4b	12000	completed	fc0e7860-187b-408c-813d-0f7c4fb758e0	2026-03-07 09:22:32.175243	2026-03-07 12:22:32.175243	2026-03-07 14:22:32.182084	2026-03-07 14:22:32.182084	\N
adb020a3-0e52-48c8-9854-e557b878ea2f	fbe4077e-8446-48aa-8e75-441c2c9fa0d9	1bb574ae-e29c-42e8-bae3-f33d6179936b	10000	cancelled	882e56f3-fd25-4e64-affe-d4dc2270a5a2	2026-03-07 11:22:32.175243	2026-03-07 15:22:32.175243	2026-03-07 14:22:32.184146	2026-03-07 14:22:32.184146	\N
e50f6bb3-c074-45af-94b3-b84d840b4e83	3d1dc838-b1ab-4360-b2cc-dcc7e424ac56	de25f5c8-46b8-4de2-b4f2-d5b9ff6e5947	20000	expired	821f2923-2b5a-4beb-a099-b8e1bd5dc513	2026-03-07 04:22:32.175243	2026-03-07 08:22:32.175243	2026-03-07 14:22:32.186193	2026-03-07 14:22:32.186193	\N
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: cihuy
--

COPY public.payments (id, order_id, payment_method, payment_status, transaction_reference, paid_at, created_at, updated_at, deleted_at) FROM stdin;
74429082-1668-445f-98c0-8c0f8c686546	80e56344-5ef4-472f-a333-ac0b6603312f	gopay	pending	TRX-19622d0a-d747-457c-b48f-c5b4b76b58e9	\N	2026-03-07 14:22:32.194809	2026-03-07 14:22:32.194809	\N
a94feabe-ba66-4718-aa55-f4d04369ccba	8e08b4c7-2147-4887-9651-3681760eec4e	dana	status	TRX-7d8bfec6-afd2-4f75-80e3-64a65c2f46ce	2026-03-07 14:22:32.194127	2026-03-07 14:22:32.194809	2026-03-07 14:22:32.194809	\N
e12fb6aa-2293-4c3b-8b1b-24159dcb6f96	60b48ce8-94cd-4bb6-be9b-18a0797d2972	bank_transfer	failed	TRX-1c241dc3-a83f-42d6-9f48-76841098d112	\N	2026-03-07 14:22:32.194809	2026-03-07 14:22:32.194809	\N
deddb699-e911-4e5e-927f-8e8175ca5dea	adb020a3-0e52-48c8-9854-e557b878ea2f	gopay	pending	TRX-80aa4bf6-6bce-4e16-be75-1e3411def582	\N	2026-03-07 14:22:32.194809	2026-03-07 14:22:32.194809	\N
5413fce9-9067-433b-b777-d034b15eb509	e50f6bb3-c074-45af-94b3-b84d840b4e83	dana	status	TRX-e9b99b9b-e9a2-46a7-ac50-00ee690a4786	2026-03-07 14:22:32.194142	2026-03-07 14:22:32.194809	2026-03-07 14:22:32.194809	\N
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: cihuy
--

COPY public.reviews (id, order_id, surplus_food_id, user_id, rating, comment, created_at, updated_at, deleted_at) FROM stdin;
3995fe20-8103-44cd-aa47-f7400ea8055c	60b48ce8-94cd-4bb6-be9b-18a0797d2972	17572007-4b29-4a05-9391-17d243ac3440	62e87872-9c31-42f3-8bcb-28839910d4e9	5	Makanannya enak banget!	2026-03-07 14:22:32.201493	2026-03-07 14:22:32.201493	\N
9520acdf-e4df-45e0-89c0-53deb8882f79	8e08b4c7-2147-4887-9651-3681760eec4e	536a0dd4-fa98-4eb5-8415-0240ab83c404	38b1024e-c9d2-4e02-a004-b9ad6c53bda2	5	Fresh and delicious	2026-05-25 03:37:42.532294	2026-05-25 03:37:42.532294	\N
8acdb425-ff71-447e-a1f9-cc37813d7806	60b48ce8-94cd-4bb6-be9b-18a0797d2972	62e546bc-6d68-4fe1-90af-e91e71aad525	62e87872-9c31-42f3-8bcb-28839910d4e9	4	Worth the discounted price	2026-05-25 03:37:42.532294	2026-05-25 03:37:42.532294	\N
18f3bc0b-89cb-41c2-bf87-73fbd2e36e0d	adb020a3-0e52-48c8-9854-e557b878ea2f	3dabc633-55d3-42c6-b002-f6bac1081687	fbe4077e-8446-48aa-8e75-441c2c9fa0d9	5	Pickup was easy and food tasted great	2026-05-25 03:37:42.532294	2026-05-25 03:37:42.532294	\N
6a47ef86-e083-4e81-b765-258f38e894f4	e50f6bb3-c074-45af-94b3-b84d840b4e83	90d1c0fb-fd7f-463a-bc0a-46be06444998	3d1dc838-b1ab-4360-b2cc-dcc7e424ac56	3	Portion was okay but still good	2026-05-25 03:37:42.532294	2026-05-25 03:37:42.532294	\N
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: cihuy
--

COPY public.schema_migrations (version, dirty) FROM stdin;
20260221182322	f
\.


--
-- Data for Name: surplus_foods; Type: TABLE DATA; Schema: public; Owner: cihuy
--

COPY public.surplus_foods (id, business_location_id, title, description, original_price, discount_price, quantity_available, quantity_remaining, pickup_start_time, pickup_end_time, expiry_time, status, created_at, updated_at, deleted_at) FROM stdin;
17572007-4b29-4a05-9391-17d243ac3440	3e7dd2ab-f9b0-4d90-a830-684df5b2f274	Paket Roti Sisa Hari Ini	Berisi 5 roti campur (manis & asin)	50000	10000	10	10	2026-03-07 16:22:32.148574	2026-03-07 19:22:32.148579	2026-09-13 00:00:00	active	2026-03-07 14:22:32.149232	2026-03-07 14:22:32.149232	\N
536a0dd4-fa98-4eb5-8415-0240ab83c404	dbb69039-637b-4d7f-98e4-ed0198164a1d	Buffet Hotel Surplus	Makanan buffet sisa layak konsumsi	50000	10000	10	10	2026-03-07 16:22:32.148587	2026-03-07 19:22:32.148591	2026-09-13 00:00:00	active	2026-03-07 14:22:32.152986	2026-03-07 14:22:32.152986	\N
62e546bc-6d68-4fe1-90af-e91e71aad525	9fa914ed-b715-408c-9d26-cea9d503ec4b	Nasi Box Restoran	Nasi ayam + sayur	50000	10000	10	10	2026-03-07 16:22:32.148598	2026-03-07 19:22:32.148602	2026-09-13 00:00:00	active	2026-03-07 14:22:32.155437	2026-03-07 14:22:32.155437	\N
3dabc633-55d3-42c6-b002-f6bac1081687	1bb574ae-e29c-42e8-bae3-f33d6179936b	Paket Kopi & Pastry	1 kopi + 1 pastry random	50000	10000	10	10	2026-03-07 16:22:32.148608	2026-03-07 19:22:32.148611	2026-09-13 00:00:00	active	2026-03-07 14:22:32.157885	2026-03-07 14:22:32.157885	\N
90d1c0fb-fd7f-463a-bc0a-46be06444998	de25f5c8-46b8-4de2-b4f2-d5b9ff6e5947	Dessert Box Surprise	Dessert mix 3 item	50000	10000	10	10	2026-03-07 16:22:32.148618	2026-03-07 19:22:32.148622	2026-09-13 00:00:00	active	2026-03-07 14:22:32.159891	2026-03-07 14:22:32.159891	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cihuy
--

COPY public.users (id, full_name, email, phone_number, password_hash, role, profile_image_url, is_verified, created_at, updated_at, deleted_at) FROM stdin;
38b1024e-c9d2-4e02-a004-b9ad6c53bda2	Budi Santoso	budi@example.com	081234567891	$2a$10$ked/3avpdrwMmClgOQzGUOgDVRqvGT3nRyEBanPlFObBe2WS6spwG	customer		f	2026-03-07 14:22:32.114247	2026-03-07 14:22:32.114247	\N
62e87872-9c31-42f3-8bcb-28839910d4e9	Citra Lestari	citra@example.com	081234567892	$2a$10$CCGz88IO7UPDytuQn4cVDec8Z7D.j8u32Zr28.IXklCQEh9.ICXf.	merchant		t	2026-03-07 14:22:32.116165	2026-03-07 14:22:32.116165	\N
fbe4077e-8446-48aa-8e75-441c2c9fa0d9	Dewa Saputra	dewa@example.com	081234567893	$2a$10$Iiq2zt1I5dyV8byA9NazPuCoHT1FECfBdP1GWEsJacSNQ1NeQnqNe	merchant		t	2026-03-07 14:22:32.11773	2026-03-07 14:22:32.11773	\N
3d1dc838-b1ab-4360-b2cc-dcc7e424ac56	Eka Wijaya	eka@example.com	081234567894	$2a$10$z/pO/dg2CiHJCsnWntIy7ef0Hb/kPuURUpfgUXEj/Pc/mdTiQMItW	customer		f	2026-03-07 14:22:32.119222	2026-03-07 14:22:32.119222	\N
b48e37fe-9682-4a03-87c0-bc78adb9dbf9	orgil	orgil@gmail.com	123412341234	$2a$10$WQ1Qw9RB75VmQ9rJgMW6SOt11e8YQg2Iqx8d1aW1zSq5C6eeYtsre	customer		f	2026-05-27 16:39:02.855661	2026-05-27 16:39:02.855661	\N
c5dcb69b-bf2b-4bba-a29f-f35a703d7e43	andi	andi@example.com	081234567890	$2a$10$EDT9FVMzcogKYkyDYQlV2O3uAmAkOa4coGF/COalSulNu674w1zee	customer		t	2026-03-07 14:22:32.107379	2026-05-27 16:41:26.96963	\N
\.


--
-- Name: business_locations business_locations_pkey; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.business_locations
    ADD CONSTRAINT business_locations_pkey PRIMARY KEY (id);


--
-- Name: businesses businesses_pkey; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT businesses_pkey PRIMARY KEY (id);


--
-- Name: food_images food_images_pkey; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.food_images
    ADD CONSTRAINT food_images_pkey PRIMARY KEY (id);


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
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


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


--
-- Name: businesses fk_business_owner; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT fk_business_owner FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: food_images fk_image_food; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.food_images
    ADD CONSTRAINT fk_image_food FOREIGN KEY (surplus_food_id) REFERENCES public.surplus_foods(id) ON DELETE CASCADE;


--
-- Name: order_items fk_order_items_order; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items fk_order_items_surplus_food; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_items_surplus_food FOREIGN KEY (surplus_food_id) REFERENCES public.surplus_foods(id) ON DELETE CASCADE;


--
-- Name: orders fk_order_location; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_order_location FOREIGN KEY (business_location_id) REFERENCES public.business_locations(id) ON DELETE CASCADE;


--
-- Name: orders fk_order_user; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payments fk_payments_order; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: reviews fk_review_order; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_review_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: reviews fk_review_surplus_food; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_review_surplus_food FOREIGN KEY (surplus_food_id) REFERENCES public.surplus_foods(id) ON DELETE CASCADE;


--
-- Name: reviews fk_review_user; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: surplus_foods fk_surplus_location; Type: FK CONSTRAINT; Schema: public; Owner: cihuy
--

ALTER TABLE ONLY public.surplus_foods
    ADD CONSTRAINT fk_surplus_location FOREIGN KEY (business_location_id) REFERENCES public.business_locations(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict MWmz7cL7UEBi2RXGOSKeLOExCgZgNZv6HcC3DdVa3yeV68nlpfz6WwUZeSoJwje

