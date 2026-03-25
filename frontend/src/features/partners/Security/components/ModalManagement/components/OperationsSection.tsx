import React, { memo, type ChangeEvent } from "react";
import {
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import DetailField from "../../../../../../components/DetailField";
import {
  modalTextFieldSx,
  sectionLabelSx,
} from "../../../../../../components/ui/modalStyles";
import {
  LANGUAGE_OPTIONS,
  SECURITY_SERVICE_TYPES,
  SPECIAL_REQUIREMENTS_OPTIONS,
} from "../constants";
import type { SecurityOrganization } from "../../../data/types";

type Props = {
  readOnly: boolean;
  formValues: SecurityOrganization;
  onChange: <K extends keyof SecurityOrganization>(
    field: K,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function OperationsSection({ readOnly, formValues, onChange }: Props) {
  return (
    <>
      <Typography sx={sectionLabelSx}>Operations</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField
              label="Service areas"
              value={formValues.serviceAreas}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Service areas"
              value={formValues.serviceAreas}
              onChange={onChange("serviceAreas")}
              multiline
              minRows={2}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField
              label="Service types"
              value={(formValues.serviceTypes ?? []).join(", ")}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              select
              label="Service types"
              value={formValues.serviceTypes}
              SelectProps={{ multiple: true }}
              onChange={(e) =>
                onChange("serviceTypes")(e as ChangeEvent<HTMLInputElement>)
              }
              sx={modalTextFieldSx}
            >
              {SECURITY_SERVICE_TYPES.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>

        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField
              label="Support 24/7"
              value={formValues.support24_7 ? "Yes" : "No"}
            />
          ) : (
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.support24_7}
                  onChange={onChange("support24_7")}
                />
              }
              label="Support 24/7"
            />
          )}
        </Grid>

        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField
              label="Languages spoken"
              value={(formValues.languagesSpoken ?? []).join(", ")}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              select
              label="Languages spoken"
              value={formValues.languagesSpoken}
              SelectProps={{ multiple: true }}
              onChange={(e) =>
                onChange("languagesSpoken")(e as ChangeEvent<HTMLInputElement>)
              }
              sx={modalTextFieldSx}
            >
              {LANGUAGE_OPTIONS.map((l) => (
                <MenuItem key={l} value={l}>
                  {l}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {readOnly ? (
            <DetailField
              label="Min booking (hours)"
              value={formValues.minBookingHours}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Min booking (hours)"
              value={formValues.minBookingHours}
              onChange={onChange("minBookingHours")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {readOnly ? (
            <DetailField
              label="Mobilization time (min)"
              value={formValues.mobilizationTimeMinutes}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Mobilization time (min)"
              value={formValues.mobilizationTimeMinutes}
              onChange={onChange("mobilizationTimeMinutes")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {readOnly ? (
            <DetailField label="Agents count" value={formValues.agentsCount} />
          ) : (
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Agents count"
              value={formValues.agentsCount}
              onChange={onChange("agentsCount")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>

        {SPECIAL_REQUIREMENTS_OPTIONS.map((c) => (
          <Grid key={String(c.key)} size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <DetailField
                label={c.label}
                value={formValues[c.key] ? "Yes" : "No"}
              />
            ) : (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(formValues[c.key])}
                    onChange={onChange(c.key)}
                  />
                }
                label={c.label}
              />
            )}
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField
              label="Special requirements"
              value={formValues.specialRequirements}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Special requirements"
              value={formValues.specialRequirements}
              onChange={onChange("specialRequirements")}
              multiline
              minRows={2}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default memo(OperationsSection);
