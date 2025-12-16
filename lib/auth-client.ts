import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";

// Check if magic link is enabled
const isMagicLinkEnabled = 
  typeof window !== 'undefined' 
    ? false // Client-side check will be done via server action
    : process.env.MAGIC_LINK?.toUpperCase() === "TRUE";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    plugins: isMagicLinkEnabled ? [magicLinkClient()] : [],
});