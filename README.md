# CV99X - Premium Authentication Template

A Next.js 15+ authentication system with **optional passwordless magic link** and **dynamic social OAuth providers**, styled with a futuristic CV99X premium theme.

## 🚀 Features

- **Optional Passwordless Authentication** - Toggle magic link sign-in via email (powered by Resend) with a simple env variable
- **Dynamic Social OAuth** - Automatically detects configured providers from `.env`
- **Flexible Configuration** - Use magic link only, social OAuth only, or both together
- **13 OAuth Providers Supported**:
  - GitHub, Google, LinkedIn, Twitter/X
  - Facebook, Discord, Microsoft, Apple
  - Spotify, Twitch, GitLab, TikTok, Dropbox
- **Protected Routes** - Proxy automatically guards pages
- **Premium UI** - Dark theme with neon accents, animated backgrounds, Framer Motion
- **Database** - Prisma + Neon (PostgreSQL)
- **Type-Safe** - Full TypeScript support

---

## 📋 Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) account (free tier available)
- A [Resend](https://resend.com) account (for magic link emails)
- OAuth app credentials for any providers you want to enable

---

## 🛠️ Quick Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd cv99x-dep2
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# ===================================
# DATABASE (Required)
# ===================================
# Get from: https://console.neon.tech
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# ===================================
# BETTER AUTH (Required)
# ===================================
BETTER_AUTH_SECRET="your-secret-key-at-least-32-characters-long"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"  # Change to your domain in production

# ===================================
# MAGIC LINK (Optional - Enable/Disable Email Authentication)
# ===================================
# Set to "TRUE" to enable magic link email authentication
# Set to "FALSE" to disable (will only use social OAuth)
MAGIC_LINK="TRUE"

# ===================================
# EMAIL (Required ONLY if MAGIC_LINK="TRUE")
# ===================================
# Get from: https://resend.com/api-keys
RESEND_API_KEY="re_xxxxxxxxxxxxx"
SEND_EMAIL_FROM="support@cv99x.com"  # Use your verified domain
Change logo.png  in /public/logo.png to your custom logo.

# ===================================
# OAUTH PROVIDERS (At least one required, especially Google as baseline)
# ===================================

# GitHub OAuth
# Get from: https://github.com/settings/developers
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Google OAuth
# Get from: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID="your_google_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# LinkedIn OAuth
# Get from: https://www.linkedin.com/developers/apps
LINKEDIN_CLIENT_ID="your_linkedin_client_id"
LINKEDIN_CLIENT_SECRET="your_linkedin_client_secret"

# Twitter/X OAuth
# Get from: https://developer.twitter.com/en/portal/dashboard
TWITTER_CLIENT_ID="your_twitter_client_id"
TWITTER_CLIENT_SECRET="your_twitter_client_secret"

# Facebook OAuth
# Get from: https://developers.facebook.com/apps
FACEBOOK_CLIENT_ID="your_facebook_app_id"
FACEBOOK_CLIENT_SECRET="your_facebook_app_secret"

# Discord OAuth
# Get from: https://discord.com/developers/applications
DISCORD_CLIENT_ID="your_discord_client_id"
DISCORD_CLIENT_SECRET="your_discord_client_secret"

# Microsoft OAuth
# Get from: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps
MICROSOFT_CLIENT_ID="your_microsoft_client_id"
MICROSOFT_CLIENT_SECRET="your_microsoft_client_secret"

# Apple OAuth
# Get from: https://developer.apple.com/account/resources/identifiers/list
APPLE_CLIENT_ID="your_apple_service_id"
APPLE_CLIENT_SECRET="your_apple_client_secret"
APPLE_TEAM_ID="your_apple_team_id"
APPLE_KEY_ID="your_apple_key_id"

# Spotify OAuth
# Get from: https://developer.spotify.com/dashboard/applications
SPOTIFY_CLIENT_ID="your_spotify_client_id"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"

# Twitch OAuth
# Get from: https://dev.twitch.tv/console/apps
TWITCH_CLIENT_ID="your_twitch_client_id"
TWITCH_CLIENT_SECRET="your_twitch_client_secret"

# GitLab OAuth
# Get from: https://gitlab.com/-/profile/applications
GITLAB_CLIENT_ID="your_gitlab_application_id"
GITLAB_CLIENT_SECRET="your_gitlab_secret"

# TikTok OAuth
# Get from: https://developers.tiktok.com/apps
TIKTOK_CLIENT_ID="your_tiktok_client_key"
TIKTOK_CLIENT_SECRET="your_tiktok_client_secret"

# Dropbox OAuth
# Get from: https://www.dropbox.com/developers/apps
DROPBOX_CLIENT_ID="your_dropbox_app_key"
DROPBOX_CLIENT_SECRET="your_dropbox_app_secret"
```

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init


```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000/auth/sign](http://localhost:3000/auth/sign)

---

## 🔐 How Authentication Works

### Magic Link (Email) - Optional

**Enable by setting `MAGIC_LINK="TRUE"` in your `.env` file.**

When enabled:

1. User enters their email
2. System sends a magic link via Resend
3. User clicks link → automatically signed in
4. No password required!

When disabled (`MAGIC_LINK="FALSE"` or not set):

- Magic link form is hidden
- Only social OAuth buttons are shown

### Social OAuth (Dynamic) - Baseline

**Google OAuth is recommended as the baseline.** At least one OAuth provider should be configured.

The system **automatically detects** which OAuth providers you've configured in `.env`:

- If you add `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET` → GitHub button appears
- If you add `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` → Google button appears
- Remove credentials → button disappears automatically

**No code changes needed!** Just update `.env` and restart the server.

### Configuration Options

You can configure authentication in three ways:

1. **Magic Link Only**: Set `MAGIC_LINK="TRUE"` with no OAuth providers
2. **Social OAuth Only**: Set `MAGIC_LINK="FALSE"` with OAuth providers configured (recommended: Google as baseline)
3. **Both**: Set `MAGIC_LINK="TRUE"` with OAuth providers configured (most flexible)

---

## 🎨 OAuth Redirect URLs

When setting up OAuth apps, use these redirect URLs:

**Local Development:**

```
http://localhost:3000/api/auth/callback/github
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/linkedin
http://localhost:3000/api/auth/callback/{provider}
```

**Production:**

```
https://yourdomain.com/api/auth/callback/github
https://yourdomain.com/api/auth/callback/google
https://yourdomain.com/api/auth/callback/{provider}
```

Replace `{provider}` with the lowercase provider name (github, google, linkedin, etc.)

For detailed provider setup instructions, see [SOCIAL_AUTH_PROVIDERS.md](./SOCIAL_AUTH_PROVIDERS.md)

---

## 🛡️ Protected Routes

The Proxy automatically:

- ✅ **Protects `/profile`** - Redirects unauthenticated users to `/auth/sign`
- ✅ **Guards `/auth/sign`** - Redirects authenticated users to `/profile`
- ✅ **Allows public access** to `/` (home page)

To add more protected routes, update `proxy.ts`

---

## 📁 Project Structure

```
cv99x-dep2/
├── app/
│   ├── auth/sign/          # Sign-in page (magic link + social)
│   ├── profile/            # Protected profile page
│   └── api/auth/[...all]/  # Better Auth API routes
├── components/
│   └── auth/               # Auth components (forms, buttons)
├── lib/
│   ├── auth.ts             # Better Auth server config
│   ├── auth-client.ts      # Better Auth client config
│   └── available-providers.ts  # Dynamic provider detection
├── prisma/
│   └── schema.prisma       # Database schema
├── proxy.ts           # Route protection
└── .env                    # Environment variables
```

---

## 🎯 Customization

### Add/Remove OAuth Providers

Simply add or remove the provider credentials in `.env`:

```env
# Want GitHub? Add these:
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# Don't want LinkedIn? Just delete or comment out:
# LINKEDIN_CLIENT_ID="..."
# LINKEDIN_CLIENT_SECRET="..."
```

Restart the server - the UI updates automatically!

### Styling

The project uses:

- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **CV99X Theme** - Dark neutral backgrounds with purple/pink/blue neon accents

Modify colors in `app/globals.css` and component files.

---

## 🚀 Production Deployment

### 1. Update Environment Variables

```env
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
SEND_EMAIL_FROM="noreply@yourdomain.com"  # Use your verified domain
```

### 2. Update OAuth Redirect URLs

Go to each OAuth provider's dashboard and add production callback URLs:

```
https://yourdomain.com/api/auth/callback/{provider}
```

### 3. Deploy to Vercel

```bash
npm run build
vercel deploy
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## 📚 Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Auth**: Better Auth 1.4.7 (passwordless + social OAuth)
- **Database**: Prisma 5.22 + Neon PostgreSQL
- **Email**: Resend
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion (motion package)
- **Language**: TypeScript 5
- **Fonts**: Inter + JetBrains Mono

---

## 🐛 Troubleshooting

### "Invalid src prop" error for images

- Restart the dev server after adding OAuth providers
- Images are configured in `next.config.ts` for all major providers

### Magic link not sending

- Check `RESEND_API_KEY` is correct
- Verify `SEND_EMAIL_FROM` uses a verified domain (or use `onboarding@resend.dev` for testing)
- Make sure the email template is correctly configured in `lib/auth.ts`

### OAuth not working

- Verify redirect URLs match: `http://localhost:3000/api/auth/callback/{provider}`
- Check both `CLIENT_ID` and `CLIENT_SECRET` are set
- Restart dev server after changing `.env`

### Prisma errors

- Stop the dev server before running `npx prisma generate` or `npx prisma migrate`
- Ensure `DATABASE_URL` is correct

---

## 📝 License

MIT

---

## 🤝 Contributing

This is a template project. Feel free to fork and customize for your needs!

---

**Built with ❤️ using Better Auth and Next.js**
