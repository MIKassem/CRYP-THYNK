/**
 * Shared Constants
 * 
 * These constants are used by both the client and server.
 * They are defined in the shared directory to avoid duplication.
 */

/**
 * Cookie name for session management
 * Used to store user session ID
 */
export const COOKIE_NAME = "app_session_id";

/**
 * One year in milliseconds
 * Used for cookie expiration and other time-based calculations
 * Calculation: 1000ms * 60sec * 60min * 24hr * 365days
 */
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
