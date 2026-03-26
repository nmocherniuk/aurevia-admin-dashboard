import { api } from "./api";

/** Matches backend SecurityAgentDto */
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

export type CreateSecurityAgentBody = Record<string, unknown> & {
  organizationId: string;
  firstName: string;
  lastName: string;
};

export async function listSecurityAgents(organizationId?: string) {
  const { data } = await api.get<{ agents: SecurityAgentDto[] }>(
    "/security-agents",
    {
      params: organizationId ? { organizationId } : {},
    },
  );
  return data.agents;
}

export async function getSecurityAgent(id: string, organizationId?: string) {
  const { data } = await api.get<{ agent: SecurityAgentDto }>(
    `/security-agents/${id}`,
    {
      params: organizationId ? { organizationId } : {},
    },
  );
  return data.agent;
}

export async function createSecurityAgent(body: CreateSecurityAgentBody) {
  const { data } = await api.post<{ agent: SecurityAgentDto }>(
    "/security-agents",
    body,
  );
  return data.agent;
}

export async function updateSecurityAgent(
  id: string,
  body: Record<string, unknown>,
  organizationId?: string,
) {
  const { data } = await api.patch<{ agent: SecurityAgentDto }>(
    `/security-agents/${id}`,
    body,
    {
      params: organizationId ? { organizationId } : {},
    },
  );
  return data.agent;
}

export async function deleteSecurityAgent(
  id: string,
  organizationId?: string,
) {
  await api.delete(`/security-agents/${id}`, {
    params: organizationId ? { organizationId } : {},
  });
}
