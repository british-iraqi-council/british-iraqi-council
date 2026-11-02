import type { Result, ResultType } from "@/core/types/results/results";
import type { ContactPayload } from "./types";

export interface ContactRepo {
  send(payload: ContactPayload): Promise<Result<ResultType<null>>>;
}
