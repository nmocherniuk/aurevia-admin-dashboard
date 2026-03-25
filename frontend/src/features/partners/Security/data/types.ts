export type PartnerStatus = "active" | "inactive";

export type SecurityOrganization = {
  id: string;
  legalForm?: string | null;
  sirenOrSiret?: string | null;
  licenseNumber?: string | null;
  cnapsNumber?: string | null;
  registrationDate?: string | null;
  registeredAddress?: string | null;
  officeAddress?: string | null;
  websiteUrl?: string | null;
  generalEmail?: string | null;
  companyPhoneNumber?: string | null;
  directorFullName?: string | null;
  primaryContactName?: string | null;
  primaryContactEmail?: string | null;
  primaryContactPhone?: string | null;

  // Documents metadata
  kbisUploaded?: boolean;
  licenseUploaded?: boolean;
  rcProInsuranceUploaded?: boolean;
  cnapsAuthorizationUploaded?: boolean;
  bankDetailsProvided?: boolean;
  directorIdCopyProvided?: boolean;
  signedPartnershipAgreement?: boolean;
  additionalCertifications?: string | null;

  // Operations
  serviceAreas?: string | null;
  serviceTypes?: string[];
  support24_7?: boolean;
  minBookingHours?: number | string | null;
  mobilizationTimeMinutes?: number | string | null;
  agentsCount?: number | string | null;
  languagesSpoken?: string[];
  hasTeamLeader?: boolean;
  armedPersonnelAllowed?: boolean;
  unarmedPersonnelAllowed?: boolean;
  internationalMissions?: boolean;
  specialRequirements?: string | null;

  // Financial
  hourlyRate?: number | string | null;
  dailyRate?: number | string | null;
  nightRate?: number | string | null;
  eventRate?: number | string | null;
  executiveProtectionRate?: number | string | null;
  minimumBookingAmount?: number | string | null;
  commissionPercent?: number | string | null;
  paymentTerms?: string | null;
  bankAccountIban?: string | null;
  currency?: string | null;
};

export type BodyguardAvailabilityStatus =
  | "available"
  | "on_assignment"
  | "off_duty";

export type Bodyguard = {
  id: string;
  partnerId: string;
  name: string;
  licenseCertification: string;
  experience: string;
  languages: string;
  availabilityStatus: BodyguardAvailabilityStatus;
  notes: string;
};
