import { callPost } from "@/core/services/api-services";
import { CONTACT_ENDPOINT } from "@/core/constants/endpoints";
import type { Result, ResultType } from "@/core/types/results/results";
import { toFormData } from "@/lib/to-form-data";
import type { ContactRepo } from "./contact_repo";
import type { ContactPayload } from "./types";

export class ContactImpl implements ContactRepo {
  async send(payload: ContactPayload): Promise<Result<ResultType<null>>> {
    return callPost<ResultType<null>>(
      CONTACT_ENDPOINT,
      toFormData({ ...payload }),
    );
  }
}
