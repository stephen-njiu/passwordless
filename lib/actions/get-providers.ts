"use server";

import { getAvailableProviders, type Provider } from "@/lib/available-providers";

/**
 * Server action to get available OAuth providers
 * This allows the client to dynamically render only configured providers
 */
export async function getConfiguredProviders(): Promise<Provider[]> {
  return getAvailableProviders();
}
