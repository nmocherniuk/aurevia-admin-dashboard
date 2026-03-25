import { Grid, TextField, Typography } from "@mui/material";
import { memo } from "react";
import DetailField from "../../../../../../components/DetailField";
import {
  modalTextFieldSx,
  sectionLabelSx,
} from "../../../../../../components/ui/modalStyles";
import type { SecurityOrganization } from "../../../data/types";

type Props = {
  readOnly: boolean;
  formValues: SecurityOrganization;
  onChange: <K extends keyof SecurityOrganization>(
    field: K,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CompanyDetailsSection({ readOnly, formValues, onChange }: Props) {
  return (
    <>
      <Typography sx={sectionLabelSx}>Company details</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField label="Legal form" value={formValues.legalForm} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Legal form"
              value={formValues.legalForm}
              onChange={onChange("legalForm")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="SIREN / SIRET"
              value={formValues.sirenOrSiret}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="SIREN / SIRET"
              value={formValues.sirenOrSiret}
              onChange={onChange("sirenOrSiret")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="License number"
              value={formValues.licenseNumber}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="License number"
              value={formValues.licenseNumber}
              onChange={onChange("licenseNumber")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField label="CNAPS number" value={formValues.cnapsNumber} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="CNAPS number"
              value={formValues.cnapsNumber}
              onChange={onChange("cnapsNumber")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="Registration date"
              value={formValues.registrationDate}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Registration date"
              value={formValues.registrationDate}
              onChange={onChange("registrationDate")}
              InputLabelProps={{ shrink: true }}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField
              label="Registered address"
              value={formValues.registeredAddress}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Registered address"
              value={formValues.registeredAddress}
              onChange={onChange("registeredAddress")}
              multiline
              minRows={2}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField
              label="Office address"
              value={formValues.officeAddress}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Office address"
              value={formValues.officeAddress}
              onChange={onChange("officeAddress")}
              multiline
              minRows={2}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField label="Website URL" value={formValues.websiteUrl} />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Website URL"
              value={formValues.websiteUrl}
              onChange={onChange("websiteUrl")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="General email"
              value={formValues.generalEmail}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              type="email"
              label="General email"
              value={formValues.generalEmail}
              onChange={onChange("generalEmail")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="Company phone number"
              value={formValues.companyPhoneNumber}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Company phone number"
              value={formValues.companyPhoneNumber}
              onChange={onChange("companyPhoneNumber")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="Director full name"
              value={formValues.directorFullName}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Director full name"
              value={formValues.directorFullName}
              onChange={onChange("directorFullName")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="Primary contact name"
              value={formValues.primaryContactName}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Primary contact name"
              value={formValues.primaryContactName}
              onChange={onChange("primaryContactName")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {readOnly ? (
            <DetailField
              label="Primary contact email"
              value={formValues.primaryContactEmail}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              type="email"
              label="Primary contact email"
              value={formValues.primaryContactEmail}
              onChange={onChange("primaryContactEmail")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12 }}>
          {readOnly ? (
            <DetailField
              label="Primary contact phone"
              value={formValues.primaryContactPhone}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Primary contact phone"
              value={formValues.primaryContactPhone}
              onChange={onChange("primaryContactPhone")}
              sx={modalTextFieldSx}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default memo(CompanyDetailsSection);
