import { useState } from "react";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import SecurityIcon from "@mui/icons-material/Security";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import type { Partner, PartnerStatus } from "../data/types";
import PartnerCard from "./PartnerCard";

const statusColors: Record<PartnerStatus, { bg: string; color: string }> = {
  active: { bg: "rgba(34, 197, 94, 0.2)", color: "#22c55e" },
  inactive: { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" },
};

const headerCellSx = {
  fontWeight: 700,
  color: "text.secondary",
  textTransform: "uppercase" as const,
  letterSpacing: 0.8,
  py: 1.5,
};

type Props = {
  partners: Partner[];
  page: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPartnerView?: (partner: Partner) => void;
  onPartnerEdit?: (partner: Partner) => void;
  onPartnerDelete?: (partner: Partner) => void;
  onViewBodyguards?: (partner: Partner) => void;
};

const ROWS_PER_PAGE = 4;

export default function PartnersTable({
  partners,
  page,
  totalCount,
  onPageChange,
  onPartnerView,
  onPartnerEdit,
  onPartnerDelete,
  onViewBodyguards,
}: Props) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const openMenu = (e: React.MouseEvent<HTMLElement>, partner: Partner) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
    setSelectedPartner(partner);
  };
  const closeMenu = () => {
    setMenuAnchor(null);
    setSelectedPartner(null);
  };
  const from = (page - 1) * ROWS_PER_PAGE + 1;
  const to = (page - 1) * ROWS_PER_PAGE + partners.length;
  const hasNext = page * ROWS_PER_PAGE < totalCount;
  const hasPrev = page > 1;

  const paginationBar = (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: { xs: 1.5, md: 2 }, py: 1.5, borderTop: 1, borderColor: "divider" }}>
      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
        SHOWING {from}-{to} OF {totalCount} PARTNERS
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <IconButton size="small" disabled={!hasPrev} onClick={() => onPageChange(page - 1)} sx={{ bgcolor: "rgba(255,255,255,0.06)", color: "text.primary", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }, "&.Mui-disabled": { color: "text.secondary" } }}>
          <ArrowLeftIcon />
        </IconButton>
        <IconButton size="small" disabled={!hasNext} onClick={() => onPageChange(page + 1)} sx={{ bgcolor: "rgba(255,255,255,0.06)", color: "text.primary", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }, "&.Mui-disabled": { color: "text.secondary" } }}>
          <ArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );

  if (!isDesktop) {
    return (
      <Paper elevation={0} sx={{ borderRadius: { xs: 2, md: 3 }, border: 1, borderColor: "divider", bgcolor: "background.paper", overflow: "hidden" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: { xs: 1.5, md: 2 }, py: 1.5, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>Partners</Typography>
        </Box>
        <Box sx={{ px: { xs: 1.5, md: 2 }, py: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {partners.map((p) => (
            <PartnerCard
              key={p.id}
              partner={p}
              onView={onPartnerView ? () => onPartnerView(p) : undefined}
              onEdit={onPartnerEdit ? () => onPartnerEdit(p) : undefined}
              onDelete={onPartnerDelete ? () => onPartnerDelete(p) : undefined}
              onViewBodyguards={onViewBodyguards ? () => onViewBodyguards(p) : undefined}
            />
          ))}
        </Box>
        {paginationBar}
      </Paper>
    );
  }

  return (
    <>
      <Paper elevation={0} sx={{ borderRadius: 3, border: 1, borderColor: "divider", bgcolor: "background.paper", overflow: "hidden" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.5, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>Partners</Typography>
        </Box>
        <Box sx={{ overflowX: "auto" }}>
          <Table size="medium" sx={{ minWidth: 720 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "rgba(255,255,255,0.04)" }}>
                <TableCell sx={headerCellSx}>Company</TableCell>
                <TableCell sx={headerCellSx}>Contact</TableCell>
                <TableCell sx={headerCellSx}>Email / Phone</TableCell>
                <TableCell sx={headerCellSx}>Service area</TableCell>
                <TableCell sx={headerCellSx}>Status</TableCell>
                <TableCell sx={{ ...headerCellSx, width: 56 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partners.map((p) => {
                const statusStyle = statusColors[p.status];
                return (
                  <TableRow
                    key={p.id}
                    onClick={() => onPartnerView?.(p)}
                    sx={{ cursor: onPartnerView ? "pointer" : "default", "&:hover": { bgcolor: "rgba(255,255,255,0.03)" } }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "text.secondary" }}>
                          <SecurityIcon fontSize="small" />
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>{p.companyName}</Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>ID: {p.id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: "text.primary" }}>{p.contactPerson}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>{p.email}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>{p.phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>{p.locationServiceArea}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={p.status} size="small" sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, fontWeight: 700, fontSize: "0.7rem", textTransform: "capitalize" }} />
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <IconButton size="small" sx={{ color: "text.secondary" }} aria-label="actions" onClick={(e) => openMenu(e, p)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        {paginationBar}
      </Paper>
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }} slotProps={{ paper: { sx: { minWidth: 180, borderRadius: 2 } } }}>
        <MenuItem onClick={() => { selectedPartner && onViewBodyguards?.(selectedPartner); closeMenu(); }}>
          <ListItemIcon><GroupIcon fontSize="small" /></ListItemIcon>
          <ListItemText>View bodyguards</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { selectedPartner && onPartnerEdit?.(selectedPartner); closeMenu(); }}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { selectedPartner && onPartnerDelete?.(selectedPartner); closeMenu(); }} sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}><DeleteIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
