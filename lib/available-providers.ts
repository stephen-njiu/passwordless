/**
 * Dynamically detect available social auth providers based on environment variables
 */

export type Provider = 
  | "github" 
  | "google" 
  | "twitter" 
  | "linkedin" 
  | "facebook" 
  | "discord" 
  | "gitlab" 
  | "tiktok" 
  | "microsoft" 
  | "spotify" 
  | "dropbox" 
  | "twitch"
  | "apple";

interface ProviderConfig {
  id: Provider;
  name: string;
  idVar: string;
  secretVar: string;
}

const PROVIDER_CONFIGS: ProviderConfig[] = [
  { id: "github", name: "GitHub", idVar: "GITHUB_CLIENT_ID", secretVar: "GITHUB_CLIENT_SECRET" },
  { id: "google", name: "Google", idVar: "GOOGLE_CLIENT_ID", secretVar: "GOOGLE_CLIENT_SECRET" },
  { id: "twitter", name: "Twitter", idVar: "TWITTER_CLIENT_ID", secretVar: "TWITTER_CLIENT_SECRET" },
  { id: "linkedin", name: "LinkedIn", idVar: "LINKEDIN_CLIENT_ID", secretVar: "LINKEDIN_CLIENT_SECRET" },
  { id: "facebook", name: "Facebook", idVar: "FACEBOOK_CLIENT_ID", secretVar: "FACEBOOK_CLIENT_SECRET" },
  { id: "discord", name: "Discord", idVar: "DISCORD_CLIENT_ID", secretVar: "DISCORD_CLIENT_SECRET" },
  { id: "gitlab", name: "GitLab", idVar: "GITLAB_CLIENT_ID", secretVar: "GITLAB_CLIENT_SECRET" },
  { id: "tiktok", name: "TikTok", idVar: "TIKTOK_CLIENT_ID", secretVar: "TIKTOK_CLIENT_SECRET" },
  { id: "microsoft", name: "Microsoft", idVar: "MICROSOFT_CLIENT_ID", secretVar: "MICROSOFT_CLIENT_SECRET" },
  { id: "spotify", name: "Spotify", idVar: "SPOTIFY_CLIENT_ID", secretVar: "SPOTIFY_CLIENT_SECRET" },
  { id: "dropbox", name: "Dropbox", idVar: "DROPBOX_CLIENT_ID", secretVar: "DROPBOX_CLIENT_SECRET" },
  { id: "twitch", name: "Twitch", idVar: "TWITCH_CLIENT_ID", secretVar: "TWITCH_CLIENT_SECRET" },
];

/**
 * Get list of available providers based on environment variables
 * This runs server-side to check for configured providers
 */
export function getAvailableProviders(): Provider[] {
  const available: Provider[] = [];

  for (const config of PROVIDER_CONFIGS) {
    const clientId = process.env[config.idVar];
    const clientSecret = process.env[config.secretVar];
    
    if (clientId && clientSecret) {
      available.push(config.id);
    }
  }

  // Check Apple separately (requires 4 env vars)
  const appleClientId = process.env.APPLE_CLIENT_ID;
  const appleTeamId = process.env.APPLE_TEAM_ID;
  const appleKeyId = process.env.APPLE_KEY_ID;
  const applePrivateKey = process.env.APPLE_PRIVATE_KEY;
  
  if (appleClientId && appleTeamId && appleKeyId && applePrivateKey) {
    available.push("apple");
  }

  return available;
}

/**
 * Get provider display name
 */
export function getProviderName(provider: Provider): string {
  const config = PROVIDER_CONFIGS.find(p => p.id === provider);
  return config?.name || provider.charAt(0).toUpperCase() + provider.slice(1);
}
