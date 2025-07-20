import React, { FC, useState, useEffect } from "react";
import { PublicKey } from "@bbachain/web3.js";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Box,
  Chip,
  Avatar,
  Grid,
  Alert,
} from "@mui/material";

// Components
import { HeadContainer } from "components/HeadContainer";
import { ErrorCard } from "components/common/ErrorCard";
import { LoadingCard } from "components/common/LoadingCard";
import { Address } from "components/common/Address";

// Hooks
import { useCluster } from "hooks/useCluster";

// Types
interface TokenMetadata {
  name: string;
  symbol: string;
  description?: string;
  image?: string;
  decimals: number;
  supply?: string;
  holders?: number;
  mintAuthority?: string;
  freezeAuthority?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
}

type Props = { mint: string };

export const TokenDetailView: FC<Props> = ({ mint }) => {
  const [metadata, setMetadata] = useState<TokenMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cluster } = useCluster();

  let pubkey: PublicKey | undefined;

  try {
    pubkey = new PublicKey(mint);
  } catch (err) {
    setError(`Invalid mint address: ${mint}`);
  }

  useEffect(() => {
    if (!pubkey) return;

    // Mock data - replace with actual metadata fetching using @bbachain/spl-token-metadata
    const fetchTokenMetadata = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock metadata based on common tokens
        const mockMetadata: TokenMetadata = {
          name:
            mint === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
              ? "USD Coin"
              : "Unknown Token",
          symbol:
            mint === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
              ? "USDC"
              : "UNKNOWN",
          description:
            "A digital stablecoin that is pegged to the United States dollar.",
          image:
            "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          decimals: 6,
          supply: "52,420,000,000",
          holders: 4907694,
          mintAuthority: null,
          freezeAuthority: null,
          website: "https://www.centre.io/",
          twitter: "https://twitter.com/centre_io",
        };

        setMetadata(mockMetadata);
      } catch (err) {
        setError("Failed to fetch token metadata");
      } finally {
        setLoading(false);
      }
    };

    fetchTokenMetadata();
  }, [mint, pubkey]);

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: `
            linear-gradient(135deg, 
              rgba(15, 23, 42, 0.95) 0%,
              rgba(30, 41, 59, 0.9) 25%,
              rgba(51, 65, 85, 0.8) 50%,
              rgba(30, 58, 138, 0.7) 75%,
              rgba(79, 70, 229, 0.6) 100%
            )
          `,
          px: 4,
          py: 3,
        }}
      >
        <HeadContainer />
        <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}>
          <ErrorCard text={error} />
        </Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: `
            linear-gradient(135deg, 
              rgba(15, 23, 42, 0.95) 0%,
              rgba(30, 41, 59, 0.9) 25%,
              rgba(51, 65, 85, 0.8) 50%,
              rgba(30, 58, 138, 0.7) 75%,
              rgba(79, 70, 229, 0.6) 100%
            )
          `,
          px: 4,
          py: 3,
        }}
      >
        <HeadContainer />
        <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}>
          <LoadingCard message="Loading token details..." />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          linear-gradient(135deg, 
            rgba(15, 23, 42, 0.95) 0%,
            rgba(30, 41, 59, 0.9) 25%,
            rgba(51, 65, 85, 0.8) 50%,
            rgba(30, 58, 138, 0.7) 75%,
            rgba(79, 70, 229, 0.6) 100%
          ),
          radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
        `,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%),
            linear-gradient(-45deg, transparent 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)
          `,
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          px: 4,
          py: 3,
        }}
      >
        <HeadContainer />

        <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}>
          <Grid container spacing={3}>
            {/* Token Overview */}
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  mb: 2,
                  background:
                    "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {/* Header */}
                  <Box
                    sx={{
                      background: "rgba(30, 41, 59, 0.5)",
                      p: 3,
                      borderBottom: "1px solid rgba(100, 116, 139, 0.2)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <Avatar
                        src={metadata?.image}
                        alt={metadata?.symbol}
                        sx={{ width: 64, height: 64 }}
                      >
                        {metadata?.symbol?.[0]}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            mb: 1,
                          }}
                        >
                          {metadata?.name || "Unknown Token"}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Chip
                            label={metadata?.symbol || "UNKNOWN"}
                            sx={{
                              bgcolor: "rgba(245, 158, 11, 0.2)",
                              color: "#F59E0B",
                              border: "1px solid rgba(245, 158, 11, 0.3)",
                              fontWeight: 600,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              opacity: 0.8,
                            }}
                          >
                            SPL Token
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {metadata?.description && (
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          mt: 2,
                          lineHeight: 1.6,
                        }}
                      >
                        {metadata.description}
                      </Typography>
                    )}
                  </Box>

                  {/* Token Details Table */}
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(100, 116, 139, 0.1)",
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              borderBottom:
                                "1px solid rgba(100, 116, 139, 0.1)",
                              py: 2,
                            }}
                          >
                            Mint Address
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              borderBottom:
                                "1px solid rgba(100, 116, 139, 0.1)",
                              py: 2,
                              fontFamily: "monospace",
                            }}
                          >
                            <Address
                              pubkey={pubkey || new PublicKey(mint)}
                              link
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(100, 116, 139, 0.1)",
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              borderBottom:
                                "1px solid rgba(100, 116, 139, 0.1)",
                              py: 2,
                            }}
                          >
                            Decimals
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              borderBottom:
                                "1px solid rgba(100, 116, 139, 0.1)",
                              py: 2,
                            }}
                          >
                            {metadata?.decimals}
                          </TableCell>
                        </TableRow>
                        {metadata?.supply && (
                          <TableRow
                            sx={{
                              "&:hover": {
                                backgroundColor: "rgba(100, 116, 139, 0.1)",
                              },
                            }}
                          >
                            <TableCell
                              sx={{
                                color: "text.primary",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                borderBottom:
                                  "1px solid rgba(100, 116, 139, 0.1)",
                                py: 2,
                              }}
                            >
                              Total Supply
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                borderBottom:
                                  "1px solid rgba(100, 116, 139, 0.1)",
                                py: 2,
                              }}
                            >
                              {metadata.supply}
                            </TableCell>
                          </TableRow>
                        )}
                        {metadata?.holders && (
                          <TableRow
                            sx={{
                              "&:hover": {
                                backgroundColor: "rgba(100, 116, 139, 0.1)",
                              },
                            }}
                          >
                            <TableCell
                              sx={{
                                color: "text.primary",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                borderBottom:
                                  "1px solid rgba(100, 116, 139, 0.1)",
                                py: 2,
                              }}
                            >
                              Holders
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                borderBottom:
                                  "1px solid rgba(100, 116, 139, 0.1)",
                                py: 2,
                              }}
                            >
                              {metadata.holders.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        )}
                        <TableRow
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(100, 116, 139, 0.1)",
                            },
                            "&:last-child td": {
                              borderBottom: "none",
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              py: 2,
                            }}
                          >
                            Mint Authority
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              py: 2,
                            }}
                          >
                            {metadata?.mintAuthority ? (
                              <Address
                                pubkey={new PublicKey(metadata.mintAuthority)}
                                link
                              />
                            ) : (
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  fontStyle: "italic",
                                }}
                              >
                                None (Fixed Supply)
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Social Links & Actions */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      mb: 2,
                    }}
                  >
                    🔗 Links & Resources
                  </Typography>

                  {metadata?.website && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        component="a"
                        href={metadata.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#8B5CF6",
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        🌐 Official Website
                      </Typography>
                    </Box>
                  )}

                  {metadata?.twitter && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        component="a"
                        href={metadata.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#8B5CF6",
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        🐦 Twitter
                      </Typography>
                    </Box>
                  )}

                  <Alert
                    severity="info"
                    sx={{
                      mt: 3,
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "text.primary",
                      "& .MuiAlert-icon": {
                        color: "#3B82F6",
                      },
                    }}
                  >
                    <Typography variant="body2">
                      Token metadata is fetched from on-chain sources and may
                      take time to update.
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
