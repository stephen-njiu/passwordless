# Dynamic Social Auth Providers

CV99X now supports **fully dynamic social authentication providers**. Simply add environment variables to enable new OAuth providers—no code changes required!

## How It Works

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
