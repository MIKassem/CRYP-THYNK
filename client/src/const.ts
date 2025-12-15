/**
 * Frontend Constants Configuration
 * 
 * This file defines application-wide constants used throughout the frontend.
 * Constants can be overridden by environment variables (see .env file).
 */

// Import shared constants from the shared directory (used by both client and server)
export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/**
 * Application Title
 * Displayed in the browser tab and header bar
 * Can be overridden with VITE_APP_TITLE environment variable
 */
export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "CRYP-THYNK Unlimited";

/**
 * Application Logo URL
 * Used in the header and other branding locations
 * Can be overridden with VITE_APP_LOGO environment variable
 */
export const APP_LOGO =
  import.meta.env.VITE_APP_LOGO ||
  "https://placehold.co/128x128/E1E7EF/1F2937?text=App";

/**
 * Generate OAuth Login URL
 * 
 * Creates a login URL dynamically based on the current origin.
 * This ensures the OAuth redirect works correctly regardless of
 * whether the app is running locally or in production.
 * 
 * @returns {string} Complete OAuth login URL with all required parameters
 */
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri); // Base64 encode for security

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
