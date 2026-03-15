import { Box } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import BusinessIcon from "@mui/icons-material/Business";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import CardStat from "../../../components/ui/CardStat";

const stats = [
  { label: "Total Partners", value: "12", icon: SecurityIcon },
  { label: "Active Partners", value: "9", icon: BusinessIcon },
  { label: "Inactive", value: "3", icon: PersonOffIcon },
];

export default function SecurityPartnersStats() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
        gap: 2,
      }}
    >
      {stats.map((stat) => (
        <CardStat key={stat.label} stat={stat} />
      ))}
    </Box>
  );
}
