import type { SecurityAgentDto } from "../../../../../../api/securityAgents";
import type { Bodyguard, BodyguardAvailabilityStatus } from "../../../data/types";
import {
  defaultSecurityAgentFormValues,
  type SecurityAgentFormValues,
} from "./bodyguardForm.types";

function splitCsv(s: string): string[] {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function joinCsv(arr: string[]): string {
  return arr.join(", ");
}

function parseIntOpt(s: string): number | undefined {
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : undefined;
}

function parseFloatOpt(s: string): number | undefined {
  const n = Number.parseFloat(s);
  return Number.isFinite(n) ? n : undefined;
}

function strOpt(s: string): string | undefined {
  const t = s.trim();
  return t === "" ? undefined : t;
}

function availabilityToUi(
  s: string,
): BodyguardAvailabilityStatus {
  if (s === "ON_ASSIGNMENT") return "on_assignment";
  if (s === "OFF_DUTY") return "off_duty";
  return "available";
}

/** Row shape for table/cards (legacy UI type) */
export function agentDtoToBodyguard(dto: SecurityAgentDto): Bodyguard {
  const license = [dto.professionalCardNumber, dto.cnapsNumber]
    .filter(Boolean)
    .join(" / ");
  return {
    id: dto.id,
    partnerId: dto.organizationId,
    name: `${dto.firstName} ${dto.lastName}`.trim(),
    licenseCertification: license || "—",
    experience:
      dto.experienceYears != null ? `${dto.experienceYears} years` : "—",
    languages: joinCsv(dto.languages ?? []),
    availabilityStatus: availabilityToUi(dto.availabilityStatus),
    notes: dto.notes ?? "",
  };
}

export function dtoToFormValues(
  dto: SecurityAgentDto | null,
): SecurityAgentFormValues {
  if (!dto) return { ...defaultSecurityAgentFormValues };

  const isoDate = (iso: string | null) =>
    iso ? iso.slice(0, 10) : "";

  return {
    firstName: dto.firstName,
    lastName: dto.lastName,
    birthDate: isoDate(dto.birthDate),
    nationality: dto.nationality ?? "",
    profilePhotoUrl: dto.profilePhotoUrl ?? "",
    phone: dto.phone ?? "",
    email: dto.email ?? "",
    address: dto.address ?? "",
    languages: joinCsv(dto.languages ?? []),
    emergencyContact: dto.emergencyContact ?? "",
    employmentStatus: (dto.employmentStatus as SecurityAgentFormValues["employmentStatus"]) ?? "",
    professionalCardNumber: dto.professionalCardNumber ?? "",
    cnapsNumber: dto.cnapsNumber ?? "",
    cardIssuedAt: isoDate(dto.cardIssuedAt),
    cardExpiresAt: isoDate(dto.cardExpiresAt),
    specializations: joinCsv(dto.specializations ?? []),
    experienceYears:
      dto.experienceYears != null ? String(dto.experienceYears) : "",
    hasVipExperience: dto.hasVipExperience,
    hasEventExperience: dto.hasEventExperience,
    hasDriverLicenseB: dto.hasDriverLicenseB,
    additionalLicenses: dto.additionalLicenses ?? "",
    physicalLevel: (dto.physicalLevel as SecurityAgentFormValues["physicalLevel"]) ?? "",
    hasFirstAidTraining: dto.hasFirstAidTraining,
    weaponExperience: dto.weaponExperience,
    readyForTravel: dto.readyForTravel,
    readyForNightShifts: dto.readyForNightShifts,
    passportProvided: dto.passportProvided,
    professionalCardProvided: dto.professionalCardProvided,
    cnapsProvided: dto.cnapsProvided,
    cvProvided: dto.cvProvided,
    certificatesProvided: dto.certificatesProvided,
    firstAidCertificateProvided: dto.firstAidCertificateProvided,
    driverLicenseProvided: dto.driverLicenseProvided,
    backgroundCheckProvided: dto.backgroundCheckProvided,
    profilePhotoProvided: dto.profilePhotoProvided,
    signedContractProvided: dto.signedContractProvided,
    baseCity: dto.baseCity ?? "",
    workingRadiusKm:
      dto.workingRadiusKm != null ? String(dto.workingRadiusKm) : "",
    availability: dto.availability ?? "",
    hourlyRate: dto.hourlyRate ?? "",
    dailyRate: dto.dailyRate ?? "",
    nightRate: dto.nightRate ?? "",
    canWorkInTeam: dto.canWorkInTeam,
    canTravelWithClient: dto.canTravelWithClient,
    canDoDriverSecurity: dto.canDoDriverSecurity,
    availabilityStatus: dto.availabilityStatus as SecurityAgentFormValues["availabilityStatus"],
    notes: dto.notes ?? "",
  };
}

function commonPayload(
  v: SecurityAgentFormValues,
): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    firstName: v.firstName.trim() || "Unnamed",
    lastName: v.lastName.trim() || "Agent",
    languages: splitCsv(v.languages),
    specializations: splitCsv(v.specializations),
    hasVipExperience: v.hasVipExperience,
    hasEventExperience: v.hasEventExperience,
    hasDriverLicenseB: v.hasDriverLicenseB,
    hasFirstAidTraining: v.hasFirstAidTraining,
    weaponExperience: v.weaponExperience,
    readyForTravel: v.readyForTravel,
    readyForNightShifts: v.readyForNightShifts,
    passportProvided: v.passportProvided,
    professionalCardProvided: v.professionalCardProvided,
    cnapsProvided: v.cnapsProvided,
    cvProvided: v.cvProvided,
    certificatesProvided: v.certificatesProvided,
    firstAidCertificateProvided: v.firstAidCertificateProvided,
    driverLicenseProvided: v.driverLicenseProvided,
    backgroundCheckProvided: v.backgroundCheckProvided,
    profilePhotoProvided: v.profilePhotoProvided,
    signedContractProvided: v.signedContractProvided,
    canWorkInTeam: v.canWorkInTeam,
    canTravelWithClient: v.canTravelWithClient,
    canDoDriverSecurity: v.canDoDriverSecurity,
    availabilityStatus: v.availabilityStatus,
  };

  const s = (x: string) => strOpt(x);
  if (v.birthDate) payload.birthDate = v.birthDate;
  payload.nationality = s(v.nationality);
  payload.profilePhotoUrl = s(v.profilePhotoUrl);
  payload.phone = s(v.phone);
  payload.email = s(v.email);
  payload.address = s(v.address);
  payload.emergencyContact = s(v.emergencyContact);
  if (v.employmentStatus) payload.employmentStatus = v.employmentStatus;
  payload.professionalCardNumber = s(v.professionalCardNumber);
  payload.cnapsNumber = s(v.cnapsNumber);
  if (v.cardIssuedAt) payload.cardIssuedAt = v.cardIssuedAt;
  if (v.cardExpiresAt) payload.cardExpiresAt = v.cardExpiresAt;
  const ey = parseIntOpt(v.experienceYears);
  if (ey !== undefined) payload.experienceYears = ey;
  payload.additionalLicenses = s(v.additionalLicenses);
  if (v.physicalLevel) payload.physicalLevel = v.physicalLevel;
  payload.baseCity = s(v.baseCity);
  const wr = parseIntOpt(v.workingRadiusKm);
  if (wr !== undefined) payload.workingRadiusKm = wr;
  payload.availability = s(v.availability);
  const hr = parseFloatOpt(v.hourlyRate);
  const dr = parseFloatOpt(v.dailyRate);
  const nr = parseFloatOpt(v.nightRate);
  if (hr !== undefined) payload.hourlyRate = hr;
  if (dr !== undefined) payload.dailyRate = dr;
  if (nr !== undefined) payload.nightRate = nr;
  payload.notes = s(v.notes) ?? null;

  return payload;
}

export function formValuesToCreateBody(
  organizationId: string,
  v: SecurityAgentFormValues,
): Record<string, unknown> {
  return {
    organizationId,
    ...commonPayload(v),
  };
}

export function formValuesToUpdateBody(
  v: SecurityAgentFormValues,
): Record<string, unknown> {
  return commonPayload(v);
}
