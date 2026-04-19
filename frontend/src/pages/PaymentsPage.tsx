import { Box, Container, CircularProgress, Alert } from "@mui/material";
import { useMemo, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PaymentsHeader from "../features/Payments/components/PaymentsHeader";
import PaymentsFilters from "../features/Payments/components/PaymentsFilters";
import PaymentsTable from "../features/Payments/components/PaymentsTable";
import PaymentDetailModal from "../features/Payments/components/PaymentDetailModal";
import CardStat from "../components/CardStat";
import type { Payment } from "../api/payments";
import { listPayments } from "../api/payments";
import { queryKeys } from "../api/queryKeys";
import { DEFAULT_PAYMENTS_FILTERS } from "../features/Payments/constants/filters";
import type { PaymentsFilterState } from "../features/Payments/constants/filters";
import { filterPayments } from "../features/Payments/utils/filterPayments";
import { formatMoney } from "../features/Payments/utils/formatMoney";

export default function PaymentsPage() {
  const [filters, setFilters] = useState<PaymentsFilterState>(
    DEFAULT_PAYMENTS_FILTERS,
  );
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.payments.list(),
    queryFn: listPayments,
  });

  const filteredPayments = useMemo(
    () => filterPayments(payments, filters),
    [payments, filters],
  );

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    let todayRevenue = 0;
    let unpaid = 0;
    let paid = 0;
    for (const p of payments) {
      if (p.paymentStatus === "unpaid") unpaid += 1;
      if (p.paymentStatus === "paid") paid += 1;
      if (p.paymentStatus === "paid" && p.date === today) {
        todayRevenue += p.amount;
      }
    }
    const currency = payments[0]?.currency ?? "EUR";
    return [
      {
        label: "Today Revenue",
        value: formatMoney(todayRevenue, currency),
        icon: AttachMoneyIcon,
      },
      { label: "Unpaid", value: String(unpaid), icon: HourglassEmptyIcon },
      { label: "Paid", value: String(paid), icon: CheckCircleOutlineIcon },
    ];
  }, [payments]);

  const handleFilterChange = useCallback(
    <K extends keyof PaymentsFilterState>(
      key: K,
      value: PaymentsFilterState[K],
    ) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <Box sx={{ minHeight: "100%", pb: 3, overflowX: "hidden" }}>
      <Container
        maxWidth={false}
        sx={{ px: { xs: 1.5, sm: 2, md: 3 }, maxWidth: "100%" }}
      >
        <PaymentsHeader />

        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error instanceof Error ? error.message : "Failed to load payments"}
          </Alert>
        )}

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              md: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {stats.map((stat) => (
            <CardStat key={stat.label} stat={stat} />
          ))}
        </Box>

        <Box sx={{ mt: 2 }}>
          <PaymentsFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Box>

        <Box sx={{ mt: 2, display: isLoading ? "none" : "block" }}>
          <PaymentsTable
            payments={filteredPayments}
            onPaymentClick={setSelectedPayment}
            onCapture={() => {}}
            onRefund={() => {}}
            onResendLink={() => {}}
          />
        </Box>

        <PaymentDetailModal
          open={!!selectedPayment}
          onClose={() => setSelectedPayment(null)}
          payment={selectedPayment}
        />
      </Container>
    </Box>
  );
}
