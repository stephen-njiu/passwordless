
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
// If your Prisma file is located elsewhere, you can change the path
// import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

function buildSocialProviders() {
  const entries: Array<[
    string,
    Record<string, string>
  ]> = [];

  // Providers that only need clientId/clientSecret
  const simple = [
    ["github", "GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"],
    ["google", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
    ["twitter", "TWITTER_CLIENT_ID", "TWITTER_CLIENT_SECRET"],
    ["linkedin", "LINKEDIN_CLIENT_ID", "LINKEDIN_CLIENT_SECRET"],
    ["facebook", "FACEBOOK_CLIENT_ID", "FACEBOOK_CLIENT_SECRET"],
    ["discord", "DISCORD_CLIENT_ID", "DISCORD_CLIENT_SECRET"],
    ["gitlab", "GITLAB_CLIENT_ID", "GITLAB_CLIENT_SECRET"],
    ["tiktok", "TIKTOK_CLIENT_ID", "TIKTOK_CLIENT_SECRET"],
    ["microsoft", "MICROSOFT_CLIENT_ID", "MICROSOFT_CLIENT_SECRET"],
    ["spotify", "SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET"],
    ["dropbox", "DROPBOX_CLIENT_ID", "DROPBOX_CLIENT_SECRET"],
    ["twitch", "TWITCH_CLIENT_ID", "TWITCH_CLIENT_SECRET"],
  ] as const;

  for (const [key, idVar, secretVar] of simple) {
    const clientId = process.env[idVar];
    const clientSecret = process.env[secretVar];
    if (clientId && clientSecret) {
      entries.push([key, { clientId, clientSecret }]);
    }
  }

  // Apple requires extra fields; only include if all present
  const appleClientId = process.env.APPLE_CLIENT_ID;
  const appleTeamId = process.env.APPLE_TEAM_ID;
  const appleKeyId = process.env.APPLE_KEY_ID;
  const applePrivateKey = process.env.APPLE_PRIVATE_KEY;
  if (appleClientId && appleTeamId && appleKeyId && applePrivateKey) {
    entries.push([
      "apple",
      {
        clientId: appleClientId,
        teamId: appleTeamId,
        keyId: appleKeyId,
        privateKey: applePrivateKey,
      } as unknown as Record<string, string>,
    ]);
  }

  return Object.fromEntries(entries) as any;
}
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
    session: {
            cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // Cache duration in seconds
            },
        },
  socialProviders: buildSocialProviders(),
    emailAndPassword: {
        enabled: false,
    },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const from = process.env.SEND_EMAIL_FROM;
        if (!from) {
          console.error("SEND_EMAIL_FROM is not configured. Unable to send magic link email.");
          return;
        }

        if (!process.env.RESEND_API_KEY) {
          console.error("RESEND_API_KEY is not configured. Unable to send magic link email.");
          return;
        }

        const subject = "Your sign-in link";
        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                      
                      <!-- Header with Logo -->
                      <tr>
                        <td style="padding: 40px 40px 32px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                          <img src="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/logo.png" alt="CV99X" width="120" height="auto" style="display: block; margin: 0 auto; max-width: 120px; height: auto;" />
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px;">
                          <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #1a1a1a; line-height: 1.4;">Sign in to your account</h2>
                          <p style="margin: 0 0 24px; font-size: 15px; color: #666666; line-height: 1.6;">Click the button below to securely sign in to CV99X. This link will expire in 15 minutes.</p>
                          
                          <!-- Button -->
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td align="center" style="padding: 8px 0 32px;">
                                <a href="${url}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 600; letter-spacing: 0.3px;">Sign In</a>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Divider -->
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                            <tr>
                              <td style="border-top: 1px solid #e5e5e5;"></td>
                            </tr>
                          </table>
                          
                          <!-- Fallback -->
                          <p style="margin: 0 0 8px; font-size: 13px; color: #999999; line-height: 1.5;">If the button doesn't work, copy and paste this link:</p>
                          <p style="margin: 0; font-size: 13px; word-break: break-all;"><a href="${url}" style="color: #667eea; text-decoration: none;">${url}</a></p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="padding: 32px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
                          <p style="margin: 0 0 8px; font-size: 13px; color: #999999; line-height: 1.5;">This email was sent to ${email}</p>
                          <p style="margin: 0; font-size: 13px; color: #999999; line-height: 1.5;">If you didn't request this, you can safely ignore this email.</p>
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `;

        const text = `Sign in to your account by clicking this link: ${url}`;

        try {
          const { error } = await resend.emails.send({
            to: email,
            from,
            subject,
            html,
            text,
          });

          if (error) {
            console.error("Resend send error", error);
          }
        } catch (error) {
          console.error("Failed to send magic link via Resend", error);
        }
      },
    }),
  ],
});
