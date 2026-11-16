# OmniAI provider integration guide

All credentials are read from the server `.env`. Do not put server secrets in `client/.env`.

## OAuth callback URLs

Register these exact callback URLs in the provider developer consoles:

- Meta: `${API_URL}/api/oauth/meta/callback`
- LinkedIn: `${API_URL}/api/oauth/linkedin/callback`
- Google/YouTube: `${API_URL}/api/oauth/youtube/callback`

The user must sign in to OmniAI before requesting an OAuth authorization URL. The API returns an `authorizationUrl`; the client redirects the browser to it. OAuth state is signed, provider-bound and expires after ten minutes. Access and refresh tokens are encrypted at rest.

### Meta / Instagram / Facebook

Set `META_APP_ID`, `META_APP_SECRET`, `META_REDIRECT_URI`, `META_GRAPH_VERSION`, and `META_VERIFY_TOKEN`. Configure Facebook Login and the required Graph API permissions for the intended use case. The callback enumerates Pages and linked Instagram professional accounts, storing page-scoped tokens for publishing. Instagram publishing requires an eligible Professional account linked to a Facebook Page and accessible public media URLs. Configure webhook callback `/api/webhooks/meta` and the same verify token. Subscribe only to products/fields your app is approved to receive.

### LinkedIn

Set `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_REDIRECT_URI`, and `LINKEDIN_API_VERSION`. Request OpenID profile scopes and the appropriate share/video permissions. LinkedIn may require product approval. Video publishing uses the Videos API initialize-upload, byte-range upload instructions, finalize-upload, and Posts API. API version availability and member/organization permissions depend on your LinkedIn application.

### YouTube

Set `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REDIRECT_URI`. Enable YouTube Data API v3 and request upload/read scopes. Google refresh tokens are requested with offline access and consent. Uploads use the resumable upload protocol. YouTube may impose quota, verification and audit requirements; test with private visibility first.

### WhatsApp Business

Set `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_API_VERSION`, `WHATSAPP_VERIFY_TOKEN`, `META_APP_SECRET`. Connect a WhatsApp Business account using a supported access token in Connections. Configure webhook callback `/api/webhooks/whatsapp`; GET verification uses `WHATSAPP_VERIFY_TOKEN`, POST signatures use `META_APP_SECRET`. Free-form text is subject to the customer-service window; approved templates and opt-in are required for business-initiated messages. Template send requests can include `templateName`, `languageCode`, and `components`.

### Telegram and email

Set `TELEGRAM_BOT_TOKEN` and connect a Telegram bot/chat destination. For email set SMTP host, port, username and password. Use a provider-approved sender identity and comply with anti-spam rules.

## Video generation and media hosting

Set `VIDEO_PROVIDER`, `VIDEO_API_KEY`, `VIDEO_API_BASE_URL`, and the model/version required by your selected provider. The adapter is configured for a Replicate-compatible prediction API. Configure a production object storage provider (S3-compatible or Cloudinary) and persist publicly accessible or signed URLs. Social platforms cannot fetch `localhost` URLs. Set appropriate CORS, MIME types, retention and file-size limits.

## Webhooks and billing

Set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`; configure Stripe webhook endpoint `/api/webhooks/stripe` for checkout completion, subscription lifecycle and invoice payment failure events. Set price IDs in the Settings page (or `VITE_STRIPE_PRO_PRICE_ID` for the default UI value). Configure the public `CLIENT_URL` for checkout redirects. Use HTTPS in production.

Meta and WhatsApp webhook POST requests are HMAC-SHA256 verified using `META_APP_SECRET`. Stripe requests are verified using the raw request body and Stripe signing secret. Events are persisted with provider/event identifiers to avoid duplicate processing.

## Important operational notes

- Keep `approvalMode=always` until you have tested each provider and verified recipient/account permissions.
- OAuth access tokens are encrypted using AES-256-GCM; `ENCRYPTION_KEY` must be exactly 64 hexadecimal characters.
- Configure a strong random `JWT_SECRET` and HTTPS reverse proxy.
- Redis enables durable BullMQ execution. Without Redis, some tasks execute inline and are not suitable for production reliability.
- Configure API quotas, request size limits, logging retention, backups and monitoring before public launch.
- Provider endpoints, scopes, API versions and approval policies change. Confirm your app's current API access in each provider console before launch.

### S3-compatible storage

Set `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, and optionally `S3_ENDPOINT` for R2/MinIO. `S3_PUBLIC_BASE_URL` should be a public CDN/bucket base URL if your publishing provider must fetch media after the short-lived signed URL expires. The browser uploads directly to the signed URL returned by `POST /api/assets/upload-url`; configure bucket CORS to allow `PUT` from your deployed frontend origin and expose the `ETag` header if your storage provider requires it. Generated videos are mirrored to the bucket when `S3_BUCKET` is configured.
