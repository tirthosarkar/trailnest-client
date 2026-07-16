'use server';

import { redirect } from 'next/navigation';
import { getUserToken } from './session';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

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
      console.warn('Unauthorized request. Access tokens may be expired.');
      redirect('/unauthorized');
    case 403:
      console.warn('Forbidden. You do not have permission.');
      redirect('/forbidden');
    case 404:
      console.warn('Resource not found.');
      redirect('/not-found');
    case 500:
      console.error('Internal Server Error.');
      break;
    default:
      console.error(`HTTP Error: ${res.status}`);
  }

  throw new Error(errorMessage);
};

export const serverFetch = async <T = unknown>(path: string): Promise<T> => {
  try {
    const res = await fetch(`${baseURL}${path}`);

    if (!res.ok) {
      let errorData: Record<string, unknown>;
      try {
        errorData = await res.json();
      } catch {
        errorData = {};
      }
      throw new Error(
        (errorData.message as string) ||
          `Fetch failed with status ${res.status}`,
      );
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`Server Fetch error at ${path}:`, error);
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
      throw new Error('HTTP_REDIRECT_TRIGGER');
    }

    return (await res.json()) as T;
  } catch (error) {
    const err = error as Error & { digest?: string };

    if (err.message === 'HTTP_REDIRECT_TRIGGER' && responseToProcess) {
      handleStatusCode(responseToProcess, parsedErrorData);
    }

    if (err.digest?.startsWith('NEXT_REDIRECT')) {
      throw err;
    }

    console.error(`Protected Fetch error at ${path}:`, error);
    throw error;
  }
};

export const serverMutation = async <T = unknown>(
  path: string,
  data?: unknown,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
): Promise<T | { success: true }> => {
  let responseToProcess: Response | null = null;
  let parsedErrorData: Record<string, unknown> = {};

  try {
    console.log(`🚀 Request Method: ${method} | URL: ${baseURL}${path}`);

    const res = await fetch(`${baseURL}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(await authHeader()),
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
      responseToProcess = res;
      try {
        parsedErrorData = await res.json();
      } catch {
        parsedErrorData = { message: 'An unknown error occurred' };
      }
      throw new Error('HTTP_REDIRECT_TRIGGER');
    }

    if (res.status === 204) {
      return { success: true };
    }

    return (await res.json()) as T;
  } catch (error) {
    const err = error as Error & { digest?: string };

    if (err.message === 'HTTP_REDIRECT_TRIGGER' && responseToProcess) {
      handleStatusCode(responseToProcess, parsedErrorData);
    }

    if (err.digest?.startsWith('NEXT_REDIRECT')) {
      throw err;
    }

    console.error(`Mutation failed at [${method}] ${path}:`, error);
    throw error;
  }
};
