import { Typography } from "@mui/material";
import { sectionLabelSx } from "../../../../../../components/ui/modalStyles";
import { memo } from "react";
import type { SecurityOrganization } from "../../../data/types";

type Props = {
  formValues: SecurityOrganization;
};

function BasicInfoSection({ formValues }: Props) {
  return (
    <>
      <Typography sx={sectionLabelSx}>Organization ID</Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "text.primary" }}>
        #{formValues.id ?? "—"}
      </Typography>
    </>
  );
}

export default memo(BasicInfoSection);
