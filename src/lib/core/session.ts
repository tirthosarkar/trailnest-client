import { headers } from "next/headers";
import { auth } from "../auth";

// Define a type match based on your auth instance structure if needed,
// otherwise standard 'any' or your custom User/Session types work perfectly.
export interface UserSession {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
  [key: string]: unknown;
}

/**
 * Retrieves the currently authenticated user profile from the session context.
 */
export const getUserSession = async (): Promise<UserSession | null> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user || null;
  } catch (error) {
    console.error("Failed to fetch user session details:", error);
    return null;
  }
};

/**
 * Extracts the raw active session token string for API headers.
 */
export const getUserToken = async (): Promise<string | null> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.session?.token || null;
  } catch (error) {
    console.error("Failed to fetch user session token:", error);
    return null;
  }
};
