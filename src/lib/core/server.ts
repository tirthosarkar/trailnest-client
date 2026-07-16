"use server";

import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
// Define error response type
interface ErrorResponse {
  error?: string;
  message?: string;
  data?: {
    message?: string;
  };
}

export const authHeader = async (): Promise<Record<string, string>> => {
  const token = await getUserToken();
  return token ? { authorization: `Bearer ${token}` } : {};
};

/**
 * Evaluates HTTP status codes and routes the client accordingly.
 */
const handleStatusCode = (
  res: Response,
  errorData: Record<string, unknown> = {},
): never => {
  const errorMessage =
    (errorData.message as string) || `Request failed with status ${res.status}`;

  switch (res.status) {
    case 401:
      console.warn("Unauthorized request. Access tokens may be expired.");
      redirect("/unauthorized");
    case 403:
      console.warn("Forbidden. You do not have permission.");
      redirect("/forbidden");
    case 404:
      console.warn("Resource not found.");
      redirect("/not-found");
    case 500:
      console.error("Internal Server Error.");
      break;
    default:
      console.error(`HTTP Error: ${res.status}`);
  }

  throw new Error(errorMessage);
};

// Updated serverFetch with query params support
export const serverFetch = async <T = unknown>(
  path: string,
  params?: Record<string, string | number | boolean>,
): Promise<T> => {
  try {
    // Build URL with query parameters
    let url = `${baseURL}${path}`;

    if (params) {
      const queryParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, String(value));
        }
      });

      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    console.log(`🔍 Fetching: ${url}`);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Only add auth header if it exists
    try {
      const auth = await authHeader();
      if (auth && Object.keys(auth).length > 0) {
        headers.Authorization = auth.Authorization;
      }
    } catch (authError) {
      console.warn("Auth header not available:", authError);
    }

    const res = await fetch(url, {
      headers,
    });

    console.log(`📡 Response Status: ${res.status} for ${url}`);

    if (!res.ok) {
      let errorMessage = `Fetch failed with status ${res.status}`;

      try {
        const errorData = (await res.json()) as ErrorResponse;
        console.error("❌ Error Response:", errorData);

        // Extract error message safely using optional chaining
        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.data?.message) {
          errorMessage = errorData.data.message;
        }
      } catch {
        // If response is not JSON, use status text
        errorMessage = res.statusText || errorMessage;
        console.error("❌ Error Response: Non-JSON response");
      }

      throw new Error(errorMessage);
    }

    const data = await res.json();
    console.log(`✅ Success Response: ${url}`);
    return data as T;
  } catch (error) {
    console.error(`❌ Server Fetch error at ${path}:`, error);
    throw error;
  }
};

export const protectedFetch = async <T = unknown>(path: string): Promise<T> => {
  let responseToProcess: Response | null = null;
  let parsedErrorData: Record<string, unknown> = {};

  try {
    const res = await fetch(`${baseURL}${path}`, {
      headers: await authHeader(),
    });

    if (!res.ok) {
      responseToProcess = res;
      try {
        parsedErrorData = await res.json();
      } catch {
        parsedErrorData = {};
      }
      throw new Error("HTTP_REDIRECT_TRIGGER");
    }

    return (await res.json()) as T;
  } catch (error) {
    const err = error as Error & { digest?: string };

    if (err.message === "HTTP_REDIRECT_TRIGGER" && responseToProcess) {
      handleStatusCode(responseToProcess, parsedErrorData);
    }

    if (err.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }

    console.error(`Protected Fetch error at ${path}:`, error);
    throw error;
  }
};

export const serverMutation = async <T = unknown>(
  path: string,
  data?: unknown,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
): Promise<T | { success: true }> => {
  let responseToProcess: Response | null = null;
  let parsedErrorData: Record<string, unknown> = {};

  try {
    console.log(`🚀 Request Method: ${method} | URL: ${baseURL}${path}`);

    const res = await fetch(`${baseURL}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
      responseToProcess = res;
      try {
        parsedErrorData = await res.json();
      } catch {
        parsedErrorData = { message: "An unknown error occurred" };
      }
      throw new Error("HTTP_REDIRECT_TRIGGER");
    }

    if (res.status === 204) {
      return { success: true };
    }

    return (await res.json()) as T;
  } catch (error) {
    const err = error as Error & { digest?: string };

    if (err.message === "HTTP_REDIRECT_TRIGGER" && responseToProcess) {
      handleStatusCode(responseToProcess, parsedErrorData);
    }

    if (err.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }

    console.error(`Mutation failed at [${method}] ${path}:`, error);
    throw error;
  }
};
