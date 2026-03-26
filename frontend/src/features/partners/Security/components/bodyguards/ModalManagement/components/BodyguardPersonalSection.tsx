import { Grid, TextField, Typography } from "@mui/material";
import DetailField from "../../../../../../../components/DetailField";
import {
  modalTextFieldSx,
  sectionLabelSx,
} from "../../../../../../../components/ui/modalStyles";
import { memo } from "react";
import type { SecurityAgentFormValues } from "../bodyguardForm.types";

type Props = {
  readOnly: boolean;
  formValues: SecurityAgentFormValues;
  onChange: <K extends keyof SecurityAgentFormValues>(
    field: K,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function BodyguardPersonalSection({ readOnly, formValues, onChange }: Props) {
  return (
    <>
      <Typography sx={sectionLabelSx}>Personal</Typography>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField label="First name" value={formValues.firstName} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="First name"
              value={formValues.firstName}
              onChange={onChange("firstName")}
              sx={modalTextFieldSx}
              required
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField label="Last name" value={formValues.lastName} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Last name"
              value={formValues.lastName}
              onChange={onChange("lastName")}
              sx={modalTextFieldSx}
              required
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField label="Birth date" value={formValues.birthDate} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Birth date"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={formValues.birthDate}
              onChange={onChange("birthDate")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField label="Nationality" value={formValues.nationality} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Nationality"
              value={formValues.nationality}
              onChange={onChange("nationality")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField label="Phone" value={formValues.phone} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Phone"
              value={formValues.phone}
              onChange={onChange("phone")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField label="Email" value={formValues.email} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Email"
              type="email"
              value={formValues.email}
              onChange={onChange("email")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField label="Address" value={formValues.address} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Address"
              multiline
              minRows={2}
              value={formValues.address}
              onChange={onChange("address")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="Languages"
              value={formValues.languages}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Languages"
              placeholder="Comma-separated"
              value={formValues.languages}
              onChange={onChange("languages")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="Emergency contact"
              value={formValues.emergencyContact}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Emergency contact"
              value={formValues.emergencyContact}
              onChange={onChange("emergencyContact")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField
              label="Profile photo URL"
              value={formValues.profilePhotoUrl}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Profile photo URL"
              value={formValues.profilePhotoUrl}
              onChange={onChange("profilePhotoUrl")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default memo(BodyguardPersonalSection);
