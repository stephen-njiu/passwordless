# Dynamic Social Auth Providers & Optional Magic Link

CV99X supports **fully dynamic social authentication providers** and **optional magic link authentication**. Simply adjust environment variables to configure your authentication methods—no code changes required!

## 🔐 Authentication Configuration

### Magic Link (Optional)

Magic link authentication can be toggled on or off via environment variable:

```env
# Enable magic link authentication
MAGIC_LINK="TRUE"

# Disable magic link authentication (only social OAuth)
MAGIC_LINK="FALSE"
```

**When enabled (`MAGIC_LINK="TRUE"`):**

- Users see an email input field
- Magic link emails are sent via Resend
- Requires `RESEND_API_KEY` and `SEND_EMAIL_FROM` configured

**When disabled (`MAGIC_LINK="FALSE"` or not set):**

- Email form is hidden
- Only social OAuth buttons are displayed
- Email configuration not required

### Social OAuth (Baseline)

**At least one OAuth provider (preferably Google) should be configured as the baseline.**

The system automatically:

1. Detects configured providers from environment variables
2. Renders appropriate SVG icons on the sign-in page
3. Handles authentication flow for each provider
4. Adjusts grid layout based on number of providers (2-4 columns)

## Supported Providers

- **GitHub**
- **Google**
- **LinkedIn**
- **Twitter/X**
- **Facebook**
- **Discord**
- **GitLab**
- **TikTok**
- **Microsoft**
- **Spotify**
- **Dropbox**
- **Twitch**
- **Apple** (requires 4 env vars)

## 📋 Configuration Examples

### Option 1: Social OAuth Only (Recommended)

Best for production apps where you want users to authenticate with existing accounts:

```env
# Disable magic link
MAGIC_LINK="FALSE"

# Configure Google as baseline
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Optional: Add more providers
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
```

### Option 2: Magic Link Only

Best for simple apps or when you want to own the full authentication flow:

```env
# Enable magic link
MAGIC_LINK="TRUE"

# Configure email sending
RESEND_API_KEY="re_xxxxx"
SEND_EMAIL_FROM="noreply@yourdomain.com"

# No OAuth providers configured
```

### Option 3: Both Magic Link + Social OAuth (Most Flexible)

Best for maximum user flexibility:

```env
# Enable magic link
MAGIC_LINK="TRUE"

# Configure email sending
RESEND_API_KEY="re_xxxxx"
SEND_EMAIL_FROM="noreply@yourdomain.com"

# Configure Google as baseline
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Optional: Add more providers
LINKEDIN_CLIENT_ID="your_linkedin_client_id"
LINKEDIN_CLIENT_SECRET="your_linkedin_client_secret"
```

## Adding a Provider

### Standard Provider (needs 2 variables)

Add to your `.env` file:

```env
# GitHub Example
GITHUB_CLIENT_ID="your_client_id_here"
GITHUB_CLIENT_SECRET="your_client_secret_here"

# Twitter Example
TWITTER_CLIENT_ID="your_twitter_client_id"
TWITTER_CLIENT_SECRET="your_twitter_client_secret"
```

### Apple (needs 4 variables)

```env
APPLE_CLIENT_ID="your_apple_client_id"
APPLE_TEAM_ID="your_apple_team_id"
APPLE_KEY_ID="your_apple_key_id"
APPLE_PRIVATE_KEY="your_apple_private_key"
```

## ⚠️ OAuth Redirect URLs Configuration

**IMPORTANT**: For each OAuth provider, you must configure the redirect URL in the provider's developer console.

### Local Development

Set the redirect URL to:

```
http://localhost:3000/api/auth/callback/{provider}
```

Replace `{provider}` with the actual provider name:

- LinkedIn: `http://localhost:3000/api/auth/callback/linkedin`
- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`
- Twitter: `http://localhost:3000/api/auth/callback/twitter`
- etc.

### Production

Set the redirect URL to your production domain:

```
https://yourdomain.com/api/auth/callback/{provider}
```

### Custom Base Path

If you change the base path of the auth routes in Better Auth configuration, update the redirect URL accordingly:

```
https://yourdomain.com/your-custom-path/callback/{provider}
```

**Example for LinkedIn:**

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps)
2. Select your app
3. Navigate to "Auth" settings
4. Add redirect URL: `http://localhost:3000/api/auth/callback/linkedin`
5. Save changes

## Testing

1. Add provider credentials to `.env`
2. Restart your dev server
3. Visit `/auth/sign`
4. The new provider button appears automatically!

## Customization

Each provider has unique branding:

- **Icon**: SVG component in `SocialSignIn.tsx`
- **Color**: Border/shadow hover effects (purple, pink, blue, etc.)
- **Layout**: Auto-adjusts grid columns (2-4 based on count)

## Example Configurations

### Minimal (Email only)

```env
# No social providers - only magic link email auth
```

### Basic (2 providers)

```env
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### Full Stack (5 providers)

```env
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
LINKEDIN_CLIENT_ID="..."
LINKEDIN_CLIENT_SECRET="..."
TWITTER_CLIENT_ID="..."
TWITTER_CLIENT_SECRET="..."
DISCORD_CLIENT_ID="..."
DISCORD_CLIENT_SECRET="..."
```

## Architecture

- **Backend**: `lib/auth.ts` - Better Auth config with dynamic provider builder
- **Detection**: `lib/available-providers.ts` - Scans env vars
- **UI**: `components/auth/SocialSignIn.tsx` - Dynamic button rendering
- **Integration**: `components/auth/CV99XAuthForm.tsx` - Receives provider list
- **Page**: `app/auth/sign/page.tsx` - Server component passes providers

## No Code Changes Needed! 🎉

Just update `.env` and restart the server to add/remove providers.
