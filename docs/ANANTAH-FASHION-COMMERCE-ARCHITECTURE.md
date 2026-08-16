# Anantah Space Fashion Commerce Architecture

## Scope

Fashion is a modular monolith with separately testable Domain, Application, Infrastructure, Contracts, and API layers. It can later extract catalog, orders, search, or checkout without sharing tables across services.

Fashion owns only:

- PostgreSQL database `anantah_fashion_commerce`
- PostgreSQL schema `fashion`
- Migration history `fashion.__ef_migrations_history`
- Redis prefix `anantah:fashion:{environment}:`
- OpenSearch index alias `anantah-fashion-products-v1`
- Object-storage bucket `anantah-fashion-media-{environment}`

No migration may create or alter objects outside the `fashion` schema.

## Planned Domain Model

All mutable business tables use UUID primary keys, UTC audit timestamps, active state, and soft deletion where retention rules allow it.

| Domain | Tables | Important relationships and indexes |
| --- | --- | --- |
| Identity | `users`, `roles`, `user_roles` | unique normalized email; role name; composite user/role key |
| Catalog | `brands`, `categories`, `category_closure`, `products`, `product_variants`, `product_images`, `product_categories`, `collections`, `collection_products` | unique slugs/SKUs; category parent; product status/brand; ordered media |
| Inventory | `inventory_locations`, `inventory_items`, `inventory_reservations`, `inventory_movements` | unique location/variant; available quantity; reservation expiry |
| Customer | `addresses`, `payment_method_references`, `recently_viewed`, `notification_preferences` | user/address; user/provider token reference; user/product viewed time |
| Cart | `carts`, `cart_items`, `saved_items` | one active cart per customer/session; unique cart/variant |
| Wishlist | `wishlists`, `wishlist_items` | default wishlist per customer; unique wishlist/product |
| Promotions | `coupons`, `coupon_rules`, `coupon_redemptions`, `offers` | unique code; active date range; user/coupon redemption count |
| Orders | `orders`, `order_items`, `order_addresses`, `order_status_history`, `shipments`, `shipment_events` | unique order number; user/date; immutable item snapshots |
| Payments | `payments`, `payment_attempts`, `refunds` | provider transaction ID; order/status; idempotency key |
| Reviews | `reviews`, `review_media`, `review_votes` | one verified review per user/product/order item; moderation status |
| Returns | `return_requests`, `return_items`, `return_status_history` | unique return number; order/status; refund relationship |
| Content | `banners`, `content_pages`, `content_blocks`, `campaigns` | unique slug; placement/date range; publication status |
| Messaging | `notifications`, `notification_deliveries`, `support_cases`, `support_messages` | user/read time; channel/status; case status/date |
| Analytics | `analytics_events`, `daily_product_metrics`, `daily_sales_metrics` | event type/time; anonymous or user session; date/product indexes |

Money is stored as `numeric(19,4)` plus ISO currency. Order and payment snapshots remain immutable. Sensitive payment details are never stored; only provider references are retained.

## API Conventions

- Base path: `/api/v1/fashion`
- Errors: RFC 9457 Problem Details with `traceId`
- Pagination: `page`, `pageSize`, `totalCount`, `items`
- Sorting: allow-listed `sort` values only
- Commands: idempotency keys for checkout, payment, refund, and return creation
- Authentication: existing Anantah-issued JWT contract; enforcement begins in the Identity step
- Authorization: policy-based customer, support, merchandiser, operations, and administrator roles

### Current authentication boundary

The application shell and Fashion MFE share the `anantah.auth.session` browser contract and `anantah:auth-change` event. Session consumers validate shape and expiry before displaying identity state. The shell preserves only validated same-origin post-login paths and rejects protocol-relative or authentication-loop destinations.

The current Auth MFE is a development adapter and emits `demo_` access tokens. These tokens are never sent to the Fashion API and must not be accepted by backend authorization. JWT validation and protected API policies begin only after a real issuer, audience, signing-key discovery mechanism, and role-claim mapping are configured.

### Current CMS composition boundary

The public home experience reads a published page from `GET /api/v1/fashion/content/pages/{slug}`. The versioned contract composes ordered `hero`, `editorial`, `collection-grid`, and `service-strip` blocks. Unknown block kinds are ignored by the MFE so a content rollout cannot break the whole page.

Step 4 uses an Infrastructure-owned curated content adapter, which keeps the public home route available while PostgreSQL is absent. It is intentionally independent of catalog persistence and creates no tables or migrations. The future administration step will replace this adapter with authoring, preview, scheduling, publication workflow, and the planned `content_pages`, `content_blocks`, `banners`, and `campaigns` persistence without changing the public page contract.

## Delivery Sequence

1. Foundation and isolated persistence
2. Design system and shared UI
3. Authentication and application shell
4. Home and CMS composition
5. Catalog and filtering
6. Search
7. Product details
8. Cart
9. Checkout and payment abstraction
10. Orders and tracking
11. Wishlist and account
12. Reviews, promotions, and notifications
13. Returns and support
14. Administration
15. Analytics
16. Testing, documentation, deployment, and hardening