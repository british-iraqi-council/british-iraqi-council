export type AppFailure = ServerFailure | TimeOutFailure | GenericFailure;

export function errorCodeOf(failure: AppFailure): string | undefined {
  return failure.type === "server" ? failure.code : undefined;
}

export type ServerFailure = {
  type: "server";
  message: string;
  statusCode?: number;
  code?: string;
};

export type TimeOutFailure = {
  type: "timeout";
  message: string;
};

export type GenericFailure = {
  type: "generic";
  message: string;
};

interface ResponseData {
  message?: string;
  status?: string;
  isSuccess?: boolean;
  errorCode?: string;
}

export function getFailure(
  t: (key: string) => string,
  isOk: boolean,
  responseData: ResponseData,
): AppFailure | null {
  if (!isOk) {
    const failure: ServerFailure = {
      type: "server",
      message: responseData.message || t("unexpectedError"),
      code: responseData.errorCode,
    };
    return failure;
  }

  if (responseData == null) {
    return null;
  }

  if ("isSuccess" in responseData) {
    if (responseData.isSuccess === false) {
      const failure: ServerFailure = {
        type: "server",
        message: responseData.message || t("unexpectedError"),
        code: responseData.errorCode,
      };
      return failure;
    }
    return null;
  }

  if (responseData.message && responseData.status !== "success") {
    const failure: ServerFailure = {
      type: "server",
      message: responseData.message || t("unexpectedError"),
    };
    return failure;
  }

  return null;
}
