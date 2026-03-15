import { useState } from "react";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";
import GroupIcon from "@mui/icons-material/Group";
import type { Partner, PartnerStatus } from "../data/types";

const statusColors: Record<PartnerStatus, { bg: string; color: string }> = {
  active: { bg: "rgba(34, 197, 94, 0.2)", color: "#22c55e" },
  inactive: { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" },
};

type Props = {
  partner: Partner;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewBodyguards?: () => void;
};

export default function PartnerCard({ partner: p, onView, onEdit, onDelete, onViewBodyguards }: Props) {
  const statusStyle = statusColors[p.status];
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
  };
  const closeMenu = () => setMenuAnchor(null);

  return (
    <Paper
      elevation={0}
      onClick={onView}
      sx={{
        p: 2,
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        textAlign: "left",
        width: "100%",
        cursor: onView ? "pointer" : undefined,
        "&:hover": onView ? { bgcolor: "rgba(255,255,255,0.03)" } : undefined,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              flexShrink: 0,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            <SecurityIcon fontSize="small" />
          </Box>
          <Box minWidth={0}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary" }}>
              {p.companyName}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {p.contactPerson}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
              ID: {p.id}
            </Typography>
          </Box>
        </Box>
        <IconButton size="small" sx={{ color: "text.secondary", flexShrink: 0 }} aria-label="actions" onClick={openMenu}>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { minWidth: 180, borderRadius: 2 } } }}
      >
        <MenuItem onClick={() => { onViewBodyguards?.(); closeMenu(); }}>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View bodyguards</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { onEdit?.(); closeMenu(); }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { onDelete?.(); closeMenu(); }} sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, mt: 1.5, pt: 1.5, borderTop: 1, borderColor: "divider" }}>
        <Chip label={p.status} size="small" sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, fontWeight: 700, fontSize: "0.7rem", textTransform: "capitalize" }} />
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {p.locationServiceArea}
        </Typography>
      </Box>
    </Paper>
  );
}
