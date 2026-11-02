import { Result } from "@/core/types/results/results";
import {
  getFailure,
  ServerFailure,
  TimeOutFailure,
} from "@/core/types/results/failures";
import { getLocale, getTranslations } from "next-intl/server";
import { apiPrefix } from "@/core/constants/base-url";

const TIMED_OUT_DURATION = 15000;

export enum ApiDestination {
  GATEWAY = "gateway",
  FILE_UPLOADER = "file-uploader",
}

export async function callGet<T>(
  endPoint: string,
  destination: ApiDestination = ApiDestination.GATEWAY,
  baseURLPrefix?: string,
  customHeaders?: Record<string, string>,
): Promise<Result<T>> {
  return _request<T>({
    method: "get",
    endPoint,
    destination,
    baseURLPrefix,
    customHeaders,
  });
}

export async function callPost<T>(
  endPoint: string,
  body?: string | FormData,
  customHeaders?: Record<string, string>,
  destination: ApiDestination = ApiDestination.GATEWAY,
): Promise<Result<T>> {
  return _request<T>({
    method: "post",
    endPoint,
    body,
    customHeaders,
    destination,
  });
}

export async function callPut<T>(
  endPoint: string,
  body: string,
  destination: ApiDestination = ApiDestination.GATEWAY,
  customHeaders?: Record<string, string>,
): Promise<Result<T>> {
  return _request<T>({
    method: "put",
    endPoint,
    body,
    destination,
    customHeaders,
  });
}

export async function callPatch<T>(
  endPoint: string,
  body?: string,
  destination: ApiDestination = ApiDestination.GATEWAY,
  customHeaders?: Record<string, string>,
): Promise<Result<T>> {
  return _request<T>({
    method: "patch",
    endPoint,
    body,
    destination,
    customHeaders,
  });
}

export async function callDelete<T>(
  endPoint: string,
  destination: ApiDestination = ApiDestination.GATEWAY,
  baseURLPrefix?: string,
  body?: string,
  customHeaders?: Record<string, string>,
): Promise<Result<T>> {
  return _request<T>({
    method: "delete",
    endPoint,
    destination,
    baseURLPrefix,
    body,
    customHeaders,
  });
}

async function _request<T>({
  method,
  endPoint,
  body,
  customHeaders,
  destination = ApiDestination.GATEWAY,
  baseURLPrefix = apiPrefix,
}: {
  method: "get" | "post" | "put" | "patch" | "delete";
  endPoint: string;
  body?: string | FormData;
  customHeaders?: Record<string, string>;
  destination: ApiDestination;
  baseURLPrefix?: string;
}): Promise<Result<T>> {
  const baseUrl =
    destination === ApiDestination.GATEWAY
      ? `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${baseURLPrefix ?? ""}`
      : process.env.UPLOAD_FILE_BASE_URL;

  const url = `${baseUrl}${endPoint}`;
  const upperMethod = method.toUpperCase();

  try {
    const locale = await getLocale();
    const isMultipart =
      typeof FormData !== "undefined" && body instanceof FormData;
    const hasBody = body !== undefined;

    const config: RequestInit = {
      method: upperMethod,
      headers: _getHeaders(locale, isMultipart, customHeaders, hasBody),
      signal:
        destination !== ApiDestination.FILE_UPLOADER
          ? AbortSignal.timeout(TIMED_OUT_DURATION)
          : undefined,
    };

    if (hasBody && method !== "get" && method !== "delete") {
      config.body = body;
    }

    const response = await fetch(url, config);

    const rawBody = await response.text();

    if (rawBody.trim().length === 0) {
      if (!response.ok) {
        const failure: ServerFailure = {
          type: "server",
          message: `Request failed with status ${response.status}`,
          statusCode: response.status,
        };
        return { type: "failure", failure, statusCode: response.status };
      }
      return { type: "success", statusCode: response.status };
    }

    let responseData;
    try {
      responseData = JSON.parse(rawBody);
    } catch (jsonError) {
      const failure: ServerFailure = {
        type: "server",
        message: `JSON parsing failed: ${jsonError instanceof Error ? jsonError.message : String(jsonError)}`,
        statusCode: response.status,
      };
      return { type: "failure", failure, statusCode: response.status };
    }

    const t = await getTranslations("error");
    const failure = getFailure(t, response.ok, responseData);
    if (failure) {
      return { type: "failure", failure, statusCode: response.status };
    }

    return {
      type: "success",
      data: responseData,
      statusCode: response.status,
    };
  } catch (err) {
    const isTimeout =
      err instanceof DOMException &&
      (err.name === "TimeoutError" || err.name === "AbortError");

    if (isTimeout) {
      const failure: TimeOutFailure = {
        type: "timeout",
        message: "Time Out Failure",
      };
      return { type: "failure", failure };
    }

    const failure: ServerFailure = {
      type: "server",
      message: err instanceof Error ? err.message : "Server Failure",
    };
    return { type: "failure", failure };
  }
}

function _getHeaders(
  locale: string,
  isMultipart: boolean,
  customHeaders?: Record<string, string>,
  hasBody = true,
): Headers {
  const headers = new Headers();
  headers.set("Accept-Language", locale);
  headers.set("Accept", "application/json; charset=UTF-8");

  if (hasBody && !isMultipart) {
    headers.set("Content-Type", "application/json");
  }

  if (customHeaders) {
    Object.entries(customHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }

  return headers;
}
