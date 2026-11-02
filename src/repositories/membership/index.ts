import { MembershipImpl } from "./membership_impl";
import type { MembershipRepo } from "./membership_repo";

export const membershipRepo: MembershipRepo = new MembershipImpl();

export type { MembershipRepo } from "./membership_repo";
export type { ApplicationPayload } from "./types";
