import { callPost } from "@/core/services/api-services";
import { APPLICATION_ENDPOINT } from "@/core/constants/endpoints";
import type { Result, ResultType } from "@/core/types/results/results";
import { toFormData } from "@/lib/to-form-data";
import type { MembershipRepo } from "./membership_repo";
import type { ApplicationPayload } from "./types";

export class MembershipImpl implements MembershipRepo {
  async apply(payload: ApplicationPayload): Promise<Result<ResultType<null>>> {
    return callPost<ResultType<null>>(
      APPLICATION_ENDPOINT,
      toFormData({ ...payload }),
    );
  }
}
