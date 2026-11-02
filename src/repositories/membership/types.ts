import type {
  ApplicationSector,
  CompanySize,
  Country,
  TierId,
} from "@/content";

export interface ApplicationPayload {
  companyName: string;
  sector: ApplicationSector;
  country: Country;
  city?: string;
  website?: string;
  companySize?: CompanySize;
  fullName: string;
  position?: string;
  email: string;
  phone: string;
  tier: TierId;
  heardFrom?: string;
  message?: string;
  attachment?: File;
  consent: "on";
}
