import { Button, Divider, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState, type ChangeEvent } from "react";
import BaseModal from "../../../../../../components/BaseModal";
import {
  defaultSecurityAgentFormValues,
  type SecurityAgentFormValues,
} from "./bodyguardForm.types";
import { dtoToFormValues } from "./bodyguardForm.mapper";
import type { SecurityAgentDto } from "../../../../../../api/securityAgents";
import { sectionLabelSx } from "../../../../../../components/ui/modalStyles";
import BodyguardPersonalSection from "./components/BodyguardPersonalSection";
import BodyguardProfessionalSection from "./components/BodyguardProfessionalSection";
import BodyguardDocumentsSection from "./components/BodyguardDocumentsSection";
import BodyguardOperationsSection from "./components/BodyguardOperationsSection";

type Props = {
  open: boolean;
  onClose: () => void;
  agent: SecurityAgentDto | null;
  readOnly?: boolean;
  onSave?: (
    agentId: string | null,
    values: SecurityAgentFormValues,
  ) => void | Promise<void>;
};

export default function BodyguardManagementModal({
  open,
  onClose,
  agent,
  readOnly = false,
  onSave,
}: Props) {
  const [formValues, setFormValues] = useState<SecurityAgentFormValues>(
    defaultSecurityAgentFormValues,
  );

  useEffect(() => {
    setFormValues(dtoToFormValues(agent));
  }, [agent, open]);

  const handleChange =
    <K extends keyof SecurityAgentFormValues>(field: K) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const nextValue =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormValues((prev) => ({ ...prev, [field]: nextValue }));
    };

  const handleSave = async () => {
    try {
      await Promise.resolve(onSave?.(agent?.id ?? null, formValues));
      onClose();
    } catch {
      // keep modal open on failure
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      maxWidth="md"
      title={
        <>
          <InfoOutlinedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
          <Typography
            component="span"
            variant="h6"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            {readOnly
              ? "Bodyguard details"
              : agent
                ? "Edit bodyguard"
                : "Add bodyguard"}
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
              {agent ? "Save changes" : "Add bodyguard"}
            </Button>
          </>
        ) : undefined
      }
    >
      {agent ? (
        <>
          <Typography sx={sectionLabelSx}>Agent ID</Typography>
          <Typography variant="body2" sx={{ mb: 1, color: "text.primary" }}>
            #{agent.id}
          </Typography>
        </>
      ) : null}

      <BodyguardPersonalSection
        readOnly={readOnly}
        formValues={formValues}
        onChange={handleChange}
      />
      <Divider sx={{ my: 2 }} />
      <BodyguardProfessionalSection
        readOnly={readOnly}
        formValues={formValues}
        onChange={handleChange}
      />
      <Divider sx={{ my: 2 }} />
      <BodyguardDocumentsSection
        readOnly={readOnly}
        formValues={formValues}
        onChange={handleChange}
      />
      <Divider sx={{ my: 2 }} />
      <BodyguardOperationsSection
        readOnly={readOnly}
        formValues={formValues}
        onChange={handleChange}
      />
    </BaseModal>
  );
}
