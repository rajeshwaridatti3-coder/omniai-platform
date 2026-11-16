# Feature inventory

## Application
- Responsive React SaaS dashboard, authentication, prompt composer, approvals, task monitor, media library, account connections, analytics and settings.
- JWT authentication, password hashing, protected API routes, Helmet, CORS and rate limiting.
- AI prompt planning and platform-specific social copy generation.
- Video generation provider adapter and asynchronous polling.

## Platform actions
- Meta OAuth, Facebook Page discovery and linked Instagram Professional account discovery.
- Instagram Reels publishing and Facebook image/video publishing.
- LinkedIn OAuth, image/video upload workflow and post creation.
- Google OAuth for YouTube, resumable video upload and channel statistics retrieval.
- WhatsApp Cloud API text/template messages, signed webhook verification and delivery-status processing.
- Telegram Bot API messages and SMTP email delivery.

## Automation and operations
- One-time scheduled tasks, approval/rejection/cancellation and task logs.
- Recurring cron workflows with timezone support, pause/resume, next-run calculation and approval gates.
- Scheduled message dispatch, Redis/BullMQ background execution and retry-friendly task state.
- OAuth state validation, encrypted access/refresh token storage and refresh-token handling for supported providers.
- Signed and deduplicated Stripe, Meta and WhatsApp webhook event handling.
- Stripe Checkout, subscription lifecycle state, failed-payment handling and customer billing portal.
- Platform analytics adapters for supported account types and a unified task/activity dashboard.

## External requirements
Live publishing, generation, messaging, analytics and billing depend on the provider's current API access, credentials, permissions, account eligibility, quotas and consent requirements. OAuth and publishing code is implemented as provider adapters; do not interpret successful local code checks as proof of a live provider account or API permission. See `INTEGRATIONS.md` before deploying.
