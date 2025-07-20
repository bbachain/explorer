import React, { FC, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  SvgIcon,
  Paper,
} from "@mui/material";
import Link from "next/link";

// Components
import { Epoch } from "./common/Epoch";
import { ErrorCard } from "./common/ErrorCard";
import { LoadingCard } from "./common/LoadingCard";

// Hooks
import { ClusterStatus, useCluster } from "hooks/useCluster";
import { SupplyStatus, useFetchSupply, useSupply } from "hooks/useSupply";
import {
  usePerformanceInfo,
  useStatsInfo,
  useStatsProvider,
} from "hooks/useStatsInfo";
import useQueryContext from "hooks/useQueryContext";

// Utils
import { abbreviatedNumber, slotsToHumanString, toBBA } from "utils";

// Modern Icons Components
const SupplyIcon = () => (
  <SvgIcon sx={{ fontSize: "2rem" }}>
    <path
      d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
      fill="currentColor"
    />
  </SvgIcon>
);

const BlockIcon = () => (
  <SvgIcon sx={{ fontSize: "2rem" }}>
    <path
      d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"
      fill="currentColor"
    />
  </SvgIcon>
);

const TransactionIcon = () => (
  <SvgIcon sx={{ fontSize: "2rem" }}>
    <path
      d="M2,17H20V19H2M1.15,12.65L4,15.5L12.85,6.65C13.05,6.45 13.05,6.1 12.85,5.9L11.9,4.95C11.7,4.75 11.35,4.75 11.15,4.95L4,12.1L2.85,10.95C2.65,10.75 2.3,10.75 2.1,10.95L1.15,11.9C0.95,12.1 0.95,12.45 1.15,12.65Z"
      fill="currentColor"
    />
  </SvgIcon>
);

const EpochIcon = () => (
  <SvgIcon sx={{ fontSize: "2rem" }}>
    <path
      d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"
      fill="currentColor"
    />
  </SvgIcon>
);

export const NetworkStats: FC = () => {
  const { fmtUrlWithCluster } = useQueryContext();
  const { cluster, status } = useCluster();
  const supply: any = useSupply();
  const fetchSupply = useFetchSupply();
  const statsInfo = useStatsInfo();
  const { setActive } = useStatsProvider();

  const performanceInfo = usePerformanceInfo();
  const transactionCount = performanceInfo.transactionCount;

  const { avgSlotTime_1min, avgSlotTime_1h, epochInfo } = statsInfo;
  const averageSlotTime = Math.round(1000 * avgSlotTime_1min);
  const hourlySlotTime = Math.round(1000 * avgSlotTime_1h);

  const { blockHeight, slotIndex, slotsInEpoch } = epochInfo;
  const epochProgress = ((100 * slotIndex) / slotsInEpoch).toFixed(1) + "%";
  const epochTimeRemaining = slotsToHumanString(
    slotsInEpoch - slotIndex,
    hourlySlotTime
  );

  function fetchData() {
    fetchSupply();
  }

  function displayDaltons(value: number) {
    return abbreviatedNumber(toBBA(value));
  }

  useEffect(() => {
    if (status === ClusterStatus.Connected) {
      fetchData();
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActive(true);
    return () => setActive(false);
  }, [setActive, cluster]);

  if (supply === SupplyStatus.Disconnected) {
    // we'll return here to prevent flicker
    return null;
  }

  if (supply === SupplyStatus.Idle || supply === SupplyStatus.Connecting) {
    return <LoadingCard message="Loading supply and price data" />;
  } else if (typeof supply === "string") {
    return <ErrorCard text={supply} retry={fetchData} />;
  }

  const stats = [
    {
      title: "TOTAL SUPPLY",
      value: displayDaltons(supply.circulating),
      subtitle: "BBA Tokens",
      icon: <SupplyIcon />,
      gradient:
        "linear-gradient(135deg, rgba(6, 214, 160, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)",
      iconColor: "#06D6A0",
    },
    {
      title: "LATEST BLOCK",
      value: blockHeight.toLocaleString(),
      subtitle: `${averageSlotTime}ms avg`,
      link: `/block/${blockHeight}`,
      icon: <BlockIcon />,
      gradient:
        "linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
      iconColor: "#3B82F6",
    },
    {
      title: "TRANSACTIONS",
      value: transactionCount.toLocaleString(),
      subtitle: "Total processed",
      icon: <TransactionIcon />,
      gradient:
        "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%)",
      iconColor: "#8B5CF6",
    },
    {
      title: "CURRENT EPOCH",
      value: epochInfo.epoch.toLocaleString(),
      subtitle: `${epochProgress} complete`,
      icon: <EpochIcon />,
      gradient:
        "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)",
      iconColor: "#F59E0B",
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Network Overview
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Real-time statistics and metrics from the BBAChain network
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => {
          const StatComponent = (
            <Card
              sx={{
                height: "100%",
                background: stat.gradient,
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: 3,
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                cursor: stat.link ? "pointer" : "default",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: stat.iconColor,
                },
              }}
            >
              <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                      }}
                    >
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      color: stat.iconColor,
                      opacity: 0.8,
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                    lineHeight: 1.2,
                    mb: stat.subtitle ? 1 : 0,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  {stat.value}
                </Typography>

                {stat.subtitle && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 500,
                      opacity: 0.8,
                    }}
                  >
                    {stat.subtitle}
                  </Typography>
                )}

                {/* Progress indicator for epoch */}
                {stat.title === "CURRENT EPOCH" && (
                  <Box sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        height: 4,
                        bgcolor: "rgba(100, 116, 139, 0.3)",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: epochProgress,
                          background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${stat.iconColor}88 100%)`,
                          borderRadius: 2,
                          transition: "width 0.3s ease-in-out",
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          );

          return (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              {stat.link ? (
                <Link
                  href={fmtUrlWithCluster(stat.link)}
                  style={{ textDecoration: "none" }}
                >
                  {StatComponent}
                </Link>
              ) : (
                StatComponent
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
