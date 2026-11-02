export type { Result, Success, Failure, ResultType } from "./results";
export { isSuccess, isFailure } from "./results";
export type {
  AppFailure,
  ServerFailure,
  TimeOutFailure,
  GenericFailure,
} from "./failures";
export { getFailure } from "./failures";
