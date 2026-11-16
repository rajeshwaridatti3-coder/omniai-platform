# OmniAI architecture

OmniAI is a multi-tenant prompt-to-workflow SaaS application with a React client and Express/MongoDB API. The AI planner translates natural-language requests into structured actions. A workflow can generate a video, create platform copy, publish to social accounts, send business messages or email, and combine actions.

## Runtime components
- `client`: React + Vite dashboard (authentication, prompt composer, task approvals, integrations, messages, library, analytics, recurring automation and billing settings).
- `server`: Express REST API, JWT auth, Mongo models, AI planner, OAuth handlers, publishing/messaging adapters, analytics, webhooks and billing.
- MongoDB: users, encrypted platform connections, tasks, messages, assets, recurring automations, webhook events and subscriptions.
- Redis/BullMQ: durable background task queue. Without Redis, approved tasks run inline; this is for local development only.
- S3-compatible storage: signed upload/download URLs and generated-video mirroring when configured.
- Cron workers: one-time scheduled task dispatch, recurring automation runs and scheduled message delivery.

## Security model
- Passwords are bcrypt-hashed; sessions and OAuth state use signed JWTs.
- Connected access and refresh tokens are AES-256-GCM encrypted using `ENCRYPTION_KEY`.
- API requests are rate-limited; Helmet and CORS are enabled.
- Stripe webhook signatures and Meta/WhatsApp HMAC-SHA256 webhook signatures are verified; provider event IDs are persisted for deduplication.
- External actions default to approval. Automatic execution can be enabled in Settings or per recurring automation.
- Production requires HTTPS, a strong unique JWT secret, a 32-byte encryption key, strict CORS, managed services, backups and a secrets manager.

## Provider adapters
- LLM: OpenAI-compatible chat completions with JSON plan output.
- Video: Replicate prediction adapter or custom HTTP adapter. Provider model input schemas vary; validate the selected model and set `VIDEO_MODEL_VERSION`.
- Meta: OAuth account discovery for Facebook Pages and linked Instagram Professional accounts; Instagram Reels and Facebook photo/video publishing.
- LinkedIn: OAuth, image/video asset upload workflow and Posts API publishing. Product and member permissions are required.
- YouTube: Google OAuth, refresh-token support, resumable video upload and channel statistics.
- WhatsApp Cloud API: text and approved template messaging; signed delivery status webhook processing.
- Telegram Bot API and SMTP email adapters.
- Stripe: Checkout, customer billing portal, subscription lifecycle and payment-failure webhooks.
- S3-compatible object storage: browser uploads via signed PUT URLs and generated-video mirroring.

Provider APIs, scopes and access tiers change. Code paths are implemented, but live behavior depends on developer-app approval, account eligibility, API permissions, valid credentials, quotas, accessible media URLs and required customer consent. See `INTEGRATIONS.md`.

## API routes
- `/api/auth`: registration, login, current user and preferences.
- `/api/tasks`: prompt planning, task status, approvals, cancellation and copy generation.
- `/api/connections`: connected account listing, manual token connection and disconnect.
- `/api/oauth/:provider/start` and `/callback`: Meta, LinkedIn and YouTube authorization-code flows.
- `/api/messages`: send and schedule WhatsApp, Telegram and email messages.
- `/api/assets`: list assets, issue signed uploads, register uploaded assets and obtain signed read URLs.
- `/api/analytics`: workspace metrics and provider-specific account analytics.
- `/api/automations`: create, list, pause, resume and delete recurring cron workflows.
- `/api/billing`: plan information, subscription status, Stripe Checkout and customer portal.
- `/api/webhooks`: Stripe, Meta and WhatsApp verification and event endpoints.
