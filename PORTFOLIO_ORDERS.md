# Portfolio Orders bot setup

Configure in Vercel Production environment variables (not NEXT_PUBLIC):
- PORTFOLIO_BOT_TOKEN — new BotFather token
- PORTFOLIO_ADMIN_CHAT_ID — numeric personal Telegram ID
- PORTFOLIO_WEBHOOK_SECRET — random 32+ character URL-safe secret
- SUPABASE_ORDERS_SERVER_KEY — server-only Supabase secret key (same project as portfolio_orders)

Redeploy, then open the new bot and press Start. Register the webhook by POSTing to https://shoxjahonos.vercel.app/api/telegram/setup with header x-setup-secret set to PORTFOLIO_WEBHOOK_SECRET. Never put secrets in URLs or commit them.

The public form continues to save via the publishable key until the server key is configured. Once the production server key and form are tested, revoke anonymous and authenticated INSERT on portfolio_orders to prevent direct REST submissions bypassing notifications. A failed Telegram notification does not discard the order; check /new or Supabase. No automatic retry queue is installed. Only the configured admin in private chat can access commands or callbacks.
