import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Google OAuth
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      // GitHub OAuth
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      // LinkedIn OAuth
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media-exp1.licdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media-exp2.licdn.com",
        pathname: "**",
      },
      // Facebook/Meta OAuth
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "graph.facebook.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "scontent.*.fbcdn.net",
        pathname: "**",
      },
      // Discord OAuth
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "**",
      },
      // Twitter/X OAuth
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "abs.twimg.com",
        pathname: "**",
      },
      // Microsoft OAuth
      {
        protocol: "https",
        hostname: "graph.microsoft.com",
        pathname: "**",
      },
      // Apple OAuth
      {
        protocol: "https",
        hostname: "appleid.cdn-apple.com",
        pathname: "**",
      },
      // Spotify OAuth
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "**",
      },
      // Twitch OAuth
      {
        protocol: "https",
        hostname: "static-cdn.jtvnw.net",
        pathname: "**",
      },
      // GitLab OAuth
      {
        protocol: "https",
        hostname: "gitlab.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "**",
      },
      // TikTok OAuth
      {
        protocol: "https",
        hostname: "p16-sign-va.tiktokcdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "p16-sign-sg.tiktokcdn.com",
        pathname: "**",
      },
      // Dropbox OAuth
      {
        protocol: "https",
        hostname: "*.dropboxusercontent.com",
        pathname: "**",
      },
      // Generic CDNs
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
