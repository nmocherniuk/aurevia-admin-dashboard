import type { SecurityOrganization } from "../../data/types";
import { defaultFormValues } from "./securityPartnerForm.types";

export function orgToFormValues(
  SecurityOrg: SecurityOrganization | null,
): SecurityOrganization {
  if (!SecurityOrg) return defaultFormValues;

  return {
    id: SecurityOrg.id || "",
    legalForm: SecurityOrg?.legalForm ?? "",
    sirenOrSiret: SecurityOrg?.sirenOrSiret ?? "",
    licenseNumber: SecurityOrg?.licenseNumber ?? "",
    cnapsNumber: SecurityOrg?.cnapsNumber ?? "",
    registrationDate: SecurityOrg?.registrationDate
      ? String(SecurityOrg.registrationDate).slice(0, 10)
      : "",
    registeredAddress: SecurityOrg?.registeredAddress ?? "",
    officeAddress: SecurityOrg?.officeAddress ?? "",
    websiteUrl: SecurityOrg?.websiteUrl ?? "",
    generalEmail: SecurityOrg?.generalEmail ?? "",
    companyPhoneNumber: SecurityOrg?.companyPhoneNumber ?? "",
    directorFullName: SecurityOrg?.directorFullName ?? "",
    primaryContactName: SecurityOrg?.primaryContactName ?? "",
    primaryContactEmail: SecurityOrg?.primaryContactEmail ?? "",
    primaryContactPhone: SecurityOrg?.primaryContactPhone ?? "",

    kbisUploaded: SecurityOrg?.kbisUploaded ?? false,
    licenseUploaded: SecurityOrg?.licenseUploaded ?? false,
    rcProInsuranceUploaded: SecurityOrg?.rcProInsuranceUploaded ?? false,
    cnapsAuthorizationUploaded:
      SecurityOrg?.cnapsAuthorizationUploaded ?? false,
    bankDetailsProvided: SecurityOrg?.bankDetailsProvided ?? false,
    directorIdCopyProvided: SecurityOrg?.directorIdCopyProvided ?? false,
    signedPartnershipAgreement:
      SecurityOrg?.signedPartnershipAgreement ?? false,
    additionalCertifications: SecurityOrg?.additionalCertifications ?? "",

    serviceAreas: SecurityOrg?.serviceAreas ?? "",
    serviceTypes: SecurityOrg?.serviceTypes ?? [],
    support24_7: SecurityOrg?.support24_7 ?? false,
    minBookingHours:
      SecurityOrg?.minBookingHours != null
        ? String(SecurityOrg.minBookingHours)
        : "",
    mobilizationTimeMinutes:
      SecurityOrg?.mobilizationTimeMinutes != null
        ? String(SecurityOrg.mobilizationTimeMinutes)
        : "",
    agentsCount:
      SecurityOrg?.agentsCount != null ? String(SecurityOrg.agentsCount) : "",
    languagesSpoken: SecurityOrg?.languagesSpoken ?? [],
    hasTeamLeader: SecurityOrg?.hasTeamLeader ?? false,
    armedPersonnelAllowed: SecurityOrg?.armedPersonnelAllowed ?? false,
    unarmedPersonnelAllowed: SecurityOrg?.unarmedPersonnelAllowed ?? true,
    internationalMissions: SecurityOrg?.internationalMissions ?? false,
    specialRequirements: SecurityOrg?.specialRequirements ?? "",

    hourlyRate:
      SecurityOrg?.hourlyRate != null ? String(SecurityOrg.hourlyRate) : "",
    dailyRate:
      SecurityOrg?.dailyRate != null ? String(SecurityOrg.dailyRate) : "",
    nightRate:
      SecurityOrg?.nightRate != null ? String(SecurityOrg.nightRate) : "",
    eventRate:
      SecurityOrg?.eventRate != null ? String(SecurityOrg.eventRate) : "",
    executiveProtectionRate:
      SecurityOrg?.executiveProtectionRate != null
        ? String(SecurityOrg?.executiveProtectionRate)
        : "",
    minimumBookingAmount:
      SecurityOrg?.minimumBookingAmount != null
        ? String(SecurityOrg.minimumBookingAmount)
        : "",
    commissionPercent:
      SecurityOrg?.commissionPercent != null
        ? String(SecurityOrg.commissionPercent)
        : "",
    paymentTerms: SecurityOrg?.paymentTerms ?? "",
    bankAccountIban: SecurityOrg?.bankAccountIban ?? "",
    currency:
      SecurityOrg?.currency === "EUR" ||
      SecurityOrg?.currency === "USD" ||
      SecurityOrg?.currency === "GBP"
        ? SecurityOrg.currency
        : "EUR",
  };
}
