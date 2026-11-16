# OmniAI — setup and run

## Requirements
- Node.js 20+ and npm
- MongoDB 7+ (or MongoDB Atlas)
- Redis 7+ (recommended and required for durable production queueing)
- API credentials for the AI/video/platform providers you want to activate

## 1. Install and configure

```bash
cp .env.example .env
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
npm install
```

Use the generated 64-character hexadecimal value as `ENCRYPTION_KEY`. Set a separate long random `JWT_SECRET`. Configure `MONGODB_URI`, `REDIS_URL`, `CLIENT_URL`, and `API_URL`.

## 2. Start databases

```bash
docker compose up -d
```

Or use hosted MongoDB and Redis services.

## 3. Configure AI and video generation

- Set `LLM_API_KEY`, `LLM_BASE_URL`, and `LLM_MODEL`. The planner expects an OpenAI-compatible chat-completions API that supports JSON response format.
- Set `VIDEO_PROVIDER=replicate`, `VIDEO_API_KEY`, and `VIDEO_MODEL_VERSION` to a compatible Replicate text-to-video model version. Model input names vary by model; adjust `server/src/services/video.js` if your selected model uses a different schema.

## 4. Run locally

```bash
npm run dev
```

Client: http://localhost:5173 — API health: http://localhost:5000/api/health

## 5. Connect provider accounts

Open Connections. OAuth is available for Meta (Facebook Pages and linked Instagram Professional accounts), LinkedIn and YouTube after their server credentials and exact callback URLs are configured. WhatsApp Business and Telegram can be connected with supported developer credentials through the manual connection flow. Tokens are encrypted at rest.

See [`INTEGRATIONS.md`](./INTEGRATIONS.md) for provider setup, scopes, callback URLs and webhook configuration.

## 6. Test safely

Keep approval mode enabled. Generate a workflow and inspect its planned actions, target account, recipient, copy, media and schedule before approval. Test WhatsApp templates with an opted-in test recipient. Test YouTube with `privacyStatus=private` first. Do not test bulk sends against real customers.

## Production checklist

- Deploy the client and API behind HTTPS; set public `CLIENT_URL`, `API_URL`, and exact OAuth redirect URLs.
- Use managed MongoDB and Redis with backups, monitoring and least-privilege credentials.
- Store secrets in a secret manager; rotate tokens and restrict OAuth scopes.
- Configure platform developer apps, privacy policy, data deletion, webhook subscriptions and required app reviews.
- Configure object storage/CDN for generated media. Social platforms cannot fetch localhost or private network URLs; provide stable public/signed URLs.
- Configure Stripe products/prices, webhook endpoint and customer portal settings.
- Set abuse prevention, moderation, plan quotas, audit retention, logging retention and incident alerts before public launch.
