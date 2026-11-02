import type { Result, ResultType } from "@/core/types/results/results";
import type { ApplicationPayload } from "./types";

export interface MembershipRepo {
  apply(payload: ApplicationPayload): Promise<Result<ResultType<null>>>;
}
