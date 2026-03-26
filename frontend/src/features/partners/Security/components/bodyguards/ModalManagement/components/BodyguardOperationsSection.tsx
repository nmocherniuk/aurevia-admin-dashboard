import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import DetailField from "../../../../../../../components/DetailField";
import {
  modalTextFieldSx,
  sectionLabelSx,
} from "../../../../../../../components/ui/modalStyles";
import { memo } from "react";
import type { SecurityAgentFormValues } from "../bodyguardForm.types";
import { AVAILABILITY_STATUS_OPTIONS } from "../bodyguardConstants";

type Props = {
  readOnly: boolean;
  formValues: SecurityAgentFormValues;
  onChange: <K extends keyof SecurityAgentFormValues>(
    field: K,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function BodyguardOperationsSection({
  readOnly,
  formValues,
  onChange,
}: Props) {
  return (
    <>
      <Typography sx={sectionLabelSx}>Operations & rates</Typography>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField label="Base city" value={formValues.baseCity} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Base city"
              value={formValues.baseCity}
              onChange={onChange("baseCity")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="Working radius (km)"
              value={formValues.workingRadiusKm}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Working radius (km)"
              value={formValues.workingRadiusKm}
              onChange={onChange("workingRadiusKm")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField
              label="Availability (notes)"
              value={formValues.availability}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Availability (notes)"
              multiline
              minRows={2}
              value={formValues.availability}
              onChange={onChange("availability")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="Status"
              value={
                AVAILABILITY_STATUS_OPTIONS.find(
                  (o) => o.value === formValues.availabilityStatus,
                )?.label ?? formValues.availabilityStatus
              }
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              select
              label="Availability status"
              value={formValues.availabilityStatus}
              onChange={onChange("availabilityStatus")}
              sx={modalTextFieldSx}
            >
              {AVAILABILITY_STATUS_OPTIONS.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {readOnly ? (
            <DetailField label="Hourly rate" value={formValues.hourlyRate} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Hourly rate"
              value={formValues.hourlyRate}
              onChange={onChange("hourlyRate")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {readOnly ? (
            <DetailField label="Daily rate" value={formValues.dailyRate} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Daily rate"
              value={formValues.dailyRate}
              onChange={onChange("dailyRate")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {readOnly ? (
            <DetailField label="Night rate" value={formValues.nightRate} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Night rate"
              value={formValues.nightRate}
              onChange={onChange("nightRate")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>

        {(
          [
            ["canWorkInTeam", "Can work in team"],
            ["canTravelWithClient", "Can travel with client"],
            ["canDoDriverSecurity", "Driver security"],
          ] as const
        ).map(([key, label]) => (
          <Grid key={key} size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <DetailField
                label={label}
                value={formValues[key] ? "Yes" : "No"}
              />
            ) : (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formValues[key]}
                    onChange={onChange(key)}
                  />
                }
                label={label}
              />
            )}
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField label="Notes" value={formValues.notes} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Notes"
              multiline
              minRows={3}
              value={formValues.notes}
              onChange={onChange("notes")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default memo(BodyguardOperationsSection);
