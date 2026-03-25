import { Button, Divider, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState, type ChangeEvent } from "react";
import BaseModal from "../../../../../components/BaseModal";
import { defaultFormValues } from "./securityPartnerForm.types";
import BasicInfoSection from "./components/BasicInfoSection";
import CompanyDetailsSection from "./components/CompanyDetailsSection";
import DocumentsSection from "./components/DocumentsSection";
import OperationsSection from "./components/OperationsSection";
import FinancialSection from "./components/FinancialSection";
import { orgToFormValues } from "./securityPartnerForm.mapper";
import type { SecurityOrganization } from "../../data/types";

type Props = {
  open: boolean;
  onClose: () => void;
  organization: SecurityOrganization | null;
  readOnly?: boolean;
  onSave?: (
    organizationId: string | null,
    values: SecurityOrganization,
  ) => void | Promise<void>;
};

export default function PartnerManagementModal({
  open,
  onClose,
  organization,
  readOnly = false,
  onSave,
}: Props) {
  const [formValues, setFormValues] =
    useState<SecurityOrganization>(defaultFormValues);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormValues(orgToFormValues(organization));
  }, [organization, open]);

  const handleChange =
    <K extends keyof SecurityOrganization>(field: K) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const nextValue =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormValues((prev) => ({ ...prev, [field]: nextValue }));
    };

  const handleSave = async () => {
    try {
      await Promise.resolve(onSave?.(organization?.id ?? null, formValues));
      onClose();
    } catch {
      // keep modal open on failure
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      maxWidth="sm"
      title={
        <>
          <InfoOutlinedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
          <Typography
            component="span"
            variant="h6"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            {readOnly
              ? "Organization details"
              : organization
                ? "Edit Organization"
                : "Add Organization"}
          </Typography>
        </>
      }
      actions={
        !readOnly ? (
          <>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={onClose}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  borderColor: "primary.dark",
                  bgcolor: "rgba(212, 175, 53, 0.08)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleSave}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                px: 2,
              }}
            >
              {organization ? "Save changes" : "Add Organization"}
            </Button>
          </>
        ) : undefined
      }
    >
      <BasicInfoSection formValues={formValues} />
      <Divider sx={{ my: 2 }} />
      <CompanyDetailsSection
        readOnly={readOnly}
        formValues={formValues}
        onChange={handleChange}
      />
      <Divider sx={{ my: 2 }} />
      <DocumentsSection
        readOnly={readOnly}
        formValues={formValues}
        onChange={handleChange}
      />
      <Divider sx={{ my: 2 }} />
      <OperationsSection
        readOnly={readOnly}
        formValues={formValues}
        onChange={handleChange}
      />
      <Divider sx={{ my: 2 }} />
      <FinancialSection
        readOnly={readOnly}
        formValues={formValues}
        onChange={handleChange}
      />
    </BaseModal>
  );
}
