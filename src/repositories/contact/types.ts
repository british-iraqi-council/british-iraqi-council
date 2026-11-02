import type { ContactSubject } from "@/content";

export interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
}
