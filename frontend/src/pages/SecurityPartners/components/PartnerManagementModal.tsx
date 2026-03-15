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
import type { Partner, PartnerStatus } from "../data/types";

export type PartnerFormValues = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  locationServiceArea: string;
  status: PartnerStatus;
};

const defaultFormValues: PartnerFormValues = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  locationServiceArea: "",
  status: "active",
};

function partnerToFormValues(partner: Partner | null): PartnerFormValues {
  if (!partner) return defaultFormValues;
  return {
    companyName: partner.companyName || "",
    contactPerson: partner.contactPerson || "",
    email: partner.email || "",
    phone: partner.phone || "",
    locationServiceArea: partner.locationServiceArea || "",
    status: partner.status,
  };
}

type Props = {
  open: boolean;
  onClose: () => void;
  partner: Partner | null;
  readOnly?: boolean;
  onSave?: (partnerId: string | null, values: PartnerFormValues) => void;
};

const PARTNER_STATUSES: PartnerStatus[] = ["active", "inactive"];

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

export default function PartnerManagementModal({
  open,
  onClose,
  partner,
  readOnly = false,
  onSave,
}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [formValues, setFormValues] = useState<PartnerFormValues>(defaultFormValues);

  useEffect(() => {
    setFormValues(partnerToFormValues(partner));
  }, [partner, open]);

  const handleChange = (field: keyof PartnerFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    onSave?.(partner?.id ?? null, formValues);
    onClose();
  };

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "rgba(255,255,255,0.04)",
      "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
      "&.Mui-focused": { bgcolor: "rgba(255,255,255,0.06)" },
    },
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
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
          py: 1.5,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InfoOutlinedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
          <Typography component="span" variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
            {readOnly ? "Partner details" : partner ? "Edit Partner" : "Add Partner"}
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="close" sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, sm: 3 }, overflowY: "auto" }}>
        <Typography sx={sectionLabelSx}>Partner ID</Typography>
        <Typography variant="body1" sx={valueBoxSx}>
          #{partner?.id ?? "—"}
        </Typography>

        <Typography sx={sectionLabelSx}>Company & contact</Typography>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>Company name</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.companyName || "—"}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" label="Company name" value={formValues.companyName} onChange={handleChange("companyName")} sx={textFieldSx} />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>Contact person</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.contactPerson || "—"}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" label="Contact person" value={formValues.contactPerson} onChange={handleChange("contactPerson")} sx={textFieldSx} />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>Email</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.email || "—"}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" type="email" label="Email" value={formValues.email} onChange={handleChange("email")} sx={textFieldSx} />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>Phone</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.phone || "—"}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" label="Phone" value={formValues.phone} onChange={handleChange("phone")} sx={textFieldSx} />
            )}
          </Grid>
          <Grid size={{ xs: 12 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>Location / service area</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.locationServiceArea || "—"}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" label="Location / service area" value={formValues.locationServiceArea} onChange={handleChange("locationServiceArea")} sx={textFieldSx} />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {readOnly ? (
              <>
                <Typography sx={fieldLabelSx}>Status</Typography>
                <Typography variant="body2" sx={valueBoxSx}>{formValues.status}</Typography>
              </>
            ) : (
              <TextField fullWidth size="small" select label="Status" value={formValues.status} onChange={handleChange("status")} sx={textFieldSx}>
                {PARTNER_STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
        </Grid>

        {!readOnly && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2.5, pt: 2, borderTop: 1, borderColor: "divider" }}>
            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleSave} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, px: 2 }}>
              {partner ? "Save changes" : "Add Partner"}
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
