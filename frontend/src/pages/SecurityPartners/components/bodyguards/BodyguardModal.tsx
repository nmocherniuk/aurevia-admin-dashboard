import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import type { Bodyguard, BodyguardAvailabilityStatus } from "../../data/types";

export type BodyguardFormValues = {
  name: string;
  licenseCertification: string;
  experience: string;
  languages: string;
  availabilityStatus: BodyguardAvailabilityStatus;
  notes: string;
};

const defaultFormValues: BodyguardFormValues = {
  name: "",
  licenseCertification: "",
  experience: "",
  languages: "",
  availabilityStatus: "available",
  notes: "",
};

function bodyguardToFormValues(b: Bodyguard | null): BodyguardFormValues {
  if (!b) return defaultFormValues;
  return {
    name: b.name || "",
    licenseCertification: b.licenseCertification || "",
    experience: b.experience || "",
    languages: b.languages || "",
    availabilityStatus: b.availabilityStatus,
    notes: b.notes || "",
  };
}

type Props = {
  open: boolean;
  onClose: () => void;
  bodyguard: Bodyguard | null;
  readOnly?: boolean;
  onSave?: (bodyguardId: string | null, values: BodyguardFormValues) => void;
};

const AVAILABILITY_OPTIONS: BodyguardAvailabilityStatus[] = ["available", "on_assignment", "off_duty"];

const sectionLabelSx = {
  fontWeight: 700,
  fontSize: "0.75rem",
  letterSpacing: 1,
  color: "text.secondary",
  textTransform: "uppercase" as const,
  mb: 1,
  mt: 1.5,
};

const valueBoxSx = {
  fontWeight: 600,
  color: "text.primary",
  py: 1,
  px: 1.25,
  borderRadius: 2,
  border: 1,
  borderColor: "divider",
  bgcolor: "rgba(255,255,255,0.04)",
  fontSize: "0.875rem",
};

const fieldLabelSx = {
  fontSize: "0.75rem",
  color: "text.secondary",
  mb: 0.5,
  display: "block",
};

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    bgcolor: "rgba(255,255,255,0.04)",
    "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
    "&.Mui-focused": { bgcolor: "rgba(255,255,255,0.06)" },
  },
};

export default function BodyguardModal({
  open,
  onClose,
  bodyguard,
  readOnly = false,
  onSave,
}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formValues, setFormValues] = useState<BodyguardFormValues>(defaultFormValues);

  useEffect(() => {
    setFormValues(bodyguardToFormValues(bodyguard));
  }, [bodyguard, open]);

  const handleChange = (field: keyof BodyguardFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    onSave?.(bodyguard?.id ?? null, formValues);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: fullScreen ? 0 : 3,
          maxHeight: fullScreen ? "100%" : "90vh",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: 1, borderColor: "divider", py: 1.5, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InfoOutlinedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
          <Typography component="span" variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
            {readOnly ? "Bodyguard details" : bodyguard ? "Edit bodyguard" : "Add bodyguard"}
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="close" sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, overflowY: "auto" }}>
        <Typography sx={sectionLabelSx}>Bodyguard information</Typography>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>Name</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.name || "—"}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" label="Name" value={formValues.name} onChange={handleChange("name")} sx={textFieldSx} />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>License / certification</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.licenseCertification || "—"}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" label="License / certification" value={formValues.licenseCertification} onChange={handleChange("licenseCertification")} sx={textFieldSx} />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>Experience</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.experience || "—"}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" label="Experience" placeholder="e.g. 5 years" value={formValues.experience} onChange={handleChange("experience")} sx={textFieldSx} />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>Languages</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.languages || "—"}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" label="Languages" placeholder="e.g. English, French" value={formValues.languages} onChange={handleChange("languages")} sx={textFieldSx} />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>Availability status</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.availabilityStatus.replace("_", " ")}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" select label="Availability status" value={formValues.availabilityStatus} onChange={handleChange("availabilityStatus")} sx={textFieldSx}>
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt.replace("_", " ")}</MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
          <Grid size={{ xs: 12 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>Notes</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.notes || "—"}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" label="Notes" multiline rows={2} value={formValues.notes} onChange={handleChange("notes")} sx={textFieldSx} />
            )}
          </Grid>
        </Grid>
        {!readOnly && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2.5, pt: 2, borderTop: 1, borderColor: "divider" }}>
            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleSave} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, px: 2 }}>
              {bodyguard ? "Save changes" : "Add bodyguard"}
            </Button>
            <Button variant="outlined" startIcon={<CloseIcon />} onClick={onClose} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, borderColor: "primary.main", color: "primary.main", "&:hover": { borderColor: "primary.dark", bgcolor: "rgba(212, 175, 53, 0.08)" } }}>
              Cancel
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
