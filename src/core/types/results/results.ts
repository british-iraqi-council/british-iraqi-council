import { AppFailure } from "./failures";

export type Result<T> = Success<T> | Failure;

export type Success<T> = {
  type: "success";
  data?: T;
  statusCode?: number;
};

export type Failure = {
  type: "failure";
  failure: AppFailure;
  statusCode?: number;
};

export function isSuccess<T>(result: Result<T>): result is Success<T> {
  return result.type === "success";
}

export function isFailure<T>(result: Result<T>): result is Failure {
  return result.type === "failure";
}

export interface ResultType<T> {
  status: string;
  message?: string;
  data?: T;
}
