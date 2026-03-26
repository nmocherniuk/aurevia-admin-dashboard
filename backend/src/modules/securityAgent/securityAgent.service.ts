import type { SecurityAgentsModel } from "../../generated/prisma/models/SecurityAgents.js";
import type { Prisma } from "../../generated/prisma/client.js";
import {
  createSecurityAgent as createRepo,
  deleteSecurityAgentById,
  findSecurityAgentById,
  findSecurityAgentsByOrganizationId,
  updateSecurityAgent as updateRepo,
} from "./securityAgent.repository.js";

function decToString(d: unknown): string | null {
  if (d == null) return null;
  if (typeof d === "object" && d !== null && "toFixed" in d) {
    return (d as { toFixed: (n: number) => string }).toFixed(2);
  }
  return String(d);
}

function toIso(d: Date | null | undefined): string | null {
  return d ? d.toISOString() : null;
}

/** JSON-serializable DTO for the frontend */
export type SecurityAgentDto = {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  birthDate: string | null;
  nationality: string | null;
  profilePhotoUrl: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  languages: string[];
  emergencyContact: string | null;
  employmentStatus: string | null;
  professionalCardNumber: string | null;
  cnapsNumber: string | null;
  cardIssuedAt: string | null;
  cardExpiresAt: string | null;
  specializations: string[];
  experienceYears: number | null;
  hasVipExperience: boolean;
  hasEventExperience: boolean;
  hasDriverLicenseB: boolean;
  additionalLicenses: string | null;
  physicalLevel: string | null;
  hasFirstAidTraining: boolean;
  weaponExperience: boolean;
  readyForTravel: boolean;
  readyForNightShifts: boolean;
  passportProvided: boolean;
  professionalCardProvided: boolean;
  cnapsProvided: boolean;
  cvProvided: boolean;
  certificatesProvided: boolean;
  firstAidCertificateProvided: boolean;
  driverLicenseProvided: boolean;
  backgroundCheckProvided: boolean;
  profilePhotoProvided: boolean;
  signedContractProvided: boolean;
  baseCity: string | null;
  workingRadiusKm: number | null;
  availability: string | null;
  hourlyRate: string | null;
  dailyRate: string | null;
  nightRate: string | null;
  canWorkInTeam: boolean;
  canTravelWithClient: boolean;
  canDoDriverSecurity: boolean;
  availabilityStatus: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export function toPublicRow(row: SecurityAgentsModel): SecurityAgentDto {
  return {
    id: row.id,
    organizationId: row.organizationId,
    firstName: row.firstName,
    lastName: row.lastName,
    birthDate: toIso(row.birthDate),
    nationality: row.nationality,
    profilePhotoUrl: row.profilePhotoUrl,
    phone: row.phone,
    email: row.email,
    address: row.address,
    languages: row.languages,
    emergencyContact: row.emergencyContact,
    employmentStatus: row.employmentStatus,
    professionalCardNumber: row.professionalCardNumber,
    cnapsNumber: row.cnapsNumber,
    cardIssuedAt: toIso(row.cardIssuedAt),
    cardExpiresAt: toIso(row.cardExpiresAt),
    specializations: row.specializations,
    experienceYears: row.experienceYears,
    hasVipExperience: row.hasVipExperience,
    hasEventExperience: row.hasEventExperience,
    hasDriverLicenseB: row.hasDriverLicenseB,
    additionalLicenses: row.additionalLicenses,
    physicalLevel: row.physicalLevel,
    hasFirstAidTraining: row.hasFirstAidTraining,
    weaponExperience: row.weaponExperience,
    readyForTravel: row.readyForTravel,
    readyForNightShifts: row.readyForNightShifts,
    passportProvided: row.passportProvided,
    professionalCardProvided: row.professionalCardProvided,
    cnapsProvided: row.cnapsProvided,
    cvProvided: row.cvProvided,
    certificatesProvided: row.certificatesProvided,
    firstAidCertificateProvided: row.firstAidCertificateProvided,
    driverLicenseProvided: row.driverLicenseProvided,
    backgroundCheckProvided: row.backgroundCheckProvided,
    profilePhotoProvided: row.profilePhotoProvided,
    signedContractProvided: row.signedContractProvided,
    baseCity: row.baseCity,
    workingRadiusKm: row.workingRadiusKm,
    availability: row.availability,
    hourlyRate: decToString(row.hourlyRate ?? undefined),
    dailyRate: decToString(row.dailyRate ?? undefined),
    nightRate: decToString(row.nightRate ?? undefined),
    canWorkInTeam: row.canWorkInTeam,
    canTravelWithClient: row.canTravelWithClient,
    canDoDriverSecurity: row.canDoDriverSecurity,
    availabilityStatus: row.availabilityStatus,
    notes: row.notes,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function listSecurityAgents(organizationId?: string) {
  const rows = await findSecurityAgentsByOrganizationId(organizationId);
  return rows.map(toPublicRow);
}

export async function getSecurityAgentById(id: string, organizationId?: string) {
  const row = await findSecurityAgentById(id);
  if (!row) return null;
  if (organizationId && row.organizationId !== organizationId) return null;
  return toPublicRow(row);
}

export async function createSecurityAgent(
  data: Prisma.SecurityAgentsUncheckedCreateInput,
) {
  const row = await createRepo(data);
  return toPublicRow(row);
}

export async function updateSecurityAgent(
  id: string,
  data: Prisma.SecurityAgentsUncheckedUpdateInput,
  organizationId?: string,
) {
  const row = await findSecurityAgentById(id);
  if (!row) return null;
  if (organizationId && row.organizationId !== organizationId) return null;
  const updated = await updateRepo(id, data);
  return toPublicRow(updated);
}

export async function deleteSecurityAgent(id: string, organizationId?: string) {
  const row = await findSecurityAgentById(id);
  if (!row) return null;
  if (organizationId && row.organizationId !== organizationId) return null;
  await deleteSecurityAgentById(id);
  return true;
}
