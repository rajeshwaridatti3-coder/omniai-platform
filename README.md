# OmniAI — AI Content Creation & Automation SaaS

OmniAI is a full-stack React + Express + MongoDB application for turning natural-language prompts into AI-planned workflows: AI video generation, social publishing, business messaging, email, scheduled and recurring automation, approvals, analytics, OAuth account connections, webhooks and subscription billing.

## Included modules

- React dashboard, authentication, prompt composer, task review, media library, connections, analytics, settings and recurring automation UI.
- AI prompt planner and copy generation through an OpenAI-compatible API.
- Video generation adapter (Replicate-compatible API) and asset storage records.
- Meta OAuth for Facebook Pages and linked Instagram professional accounts; Instagram Reels and Facebook video/photo publishing adapters.
- LinkedIn OAuth, text/image/video publishing adapters.
- Google OAuth for YouTube, resumable video uploads and channel statistics adapter.
- WhatsApp Cloud API text/template messaging and delivery status webhook processing.
- Telegram Bot API messaging and SMTP email delivery.
- Encrypted provider tokens, OAuth token refresh where provider supports it, account disconnect.
- One-time scheduling, recurring cron workflows with timezone support, approval gates and background execution.
- Stripe Checkout, customer portal, subscription lifecycle webhooks and subscription state.
- Signed webhook verification, event deduplication, execution logs and retry-friendly task states.

## Quick start

1. Install Node.js 20+, Docker Desktop and npm.
2. Copy `.env.example` to `.env` and set `JWT_SECRET` and `ENCRYPTION_KEY` (64 hex characters / 32 bytes). Configure MongoDB and Redis.
3. Start infrastructure: `docker compose up -d`.
4. Install dependencies: `npm install`.
5. Start the application: `npm run dev`.
6. Open `http://localhost:5173`, register, then configure API credentials and connected accounts.

Detailed setup: [`docs/SETUP.md`](docs/SETUP.md). Provider setup: [`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md). Architecture: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Verification notes: [`docs/VERIFICATION.md`](docs/VERIFICATION.md).

## Provider setup is still required

The application code includes provider adapters and integration routes, but live actions cannot work until you create developer applications, add their credentials, configure exact redirect URLs, obtain review/permissions where required, connect eligible accounts, and expose webhook URLs over HTTPS. Some platform APIs are restricted to approved account types and permissions. The project does not bypass platform rules or send messages without required consent.

For local development, use test accounts and keep execution approval enabled. Never commit `.env`, access tokens, refresh tokens, signing secrets or customer data. Use HTTPS and a persistent MongoDB/Redis service in production. Configure object storage with a public/signed media URL for video publishing; local disk URLs are not accessible to social platforms.
