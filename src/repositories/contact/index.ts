import { ContactImpl } from "./contact_impl";
import type { ContactRepo } from "./contact_repo";

export const contactRepo: ContactRepo = new ContactImpl();

export type { ContactRepo } from "./contact_repo";
export type { ContactPayload } from "./types";
