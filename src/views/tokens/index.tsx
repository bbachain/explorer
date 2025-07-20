import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { PublicKey } from "@bbachain/web3.js";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";

// Components
import { HeadContainer } from "components/HeadContainer";
import { Address } from "components/common/Address";

// Hooks
import { useCluster } from "hooks/useCluster";

// Custom Search Icon
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <path
      d="m21 21-4.35-4.35"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Mock data for demonstration - replace with actual token fetching logic
const MOCK_TOKENS = [
  {
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    holders: 4907694,
    marketCap: 8704588375.9,
  },
  {
    mint: "So11111111111111111111111111111111111111112",
    name: "Wrapped SOL",
    symbol: "SOL",
    decimals: 9,
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    holders: 925578,
    marketCap: 3815538925.08,
  },
  {
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    name: "Tether",
    symbol: "USDT",
    decimals: 6,
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png",
    holders: 2189695,
    marketCap: 2389927585.19,
  },
];

export const TokensView: FC = () => {
  const [tokens, setTokens] = useState(MOCK_TOKENS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cluster } = useCluster();

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.mint.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Card
            sx={{
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
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#F59E0B",
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0.5 },
                      },
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    🪙 Tokens
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    opacity: 0.8,
                    mb: 3,
                  }}
                >
                  All SPL tokens on the BBAChain blockchain
                </Typography>

                {/* Search */}
                <TextField
                  fullWidth
                  placeholder="Search tokens by name, symbol, or mint address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(30, 41, 59, 0.5)",
                      "& fieldset": {
                        borderColor: "rgba(100, 116, 139, 0.3)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(245, 158, 11, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#F59E0B",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "text.primary",
                    },
                  }}
                />
              </Box>

              {/* Loading State */}
              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 300,
                  }}
                >
                  <CircularProgress sx={{ color: "primary.main" }} />
                </Box>
              )}

              {/* Tokens Table */}
              {!loading && (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              borderBottom:
                                "1px solid rgba(100, 116, 139, 0.2)",
                            }}
                          >
                            #
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              borderBottom:
                                "1px solid rgba(100, 116, 139, 0.2)",
                            }}
                          >
                            Token
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              borderBottom:
                                "1px solid rgba(100, 116, 139, 0.2)",
                            }}
                          >
                            Mint Address
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              borderBottom:
                                "1px solid rgba(100, 116, 139, 0.2)",
                            }}
                          >
                            Holders
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              borderBottom:
                                "1px solid rgba(100, 116, 139, 0.2)",
                            }}
                          >
                            Market Cap
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredTokens.map((token, index) => (
                          <TableRow
                            key={`${token.mint}-${index}`}
                            component={Link}
                            href={`/token/${token.mint}`}
                            sx={{
                              cursor: "pointer",
                              textDecoration: "none",
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
                                borderBottom:
                                  "1px solid rgba(100, 116, 139, 0.1)",
                                py: 2,
                              }}
                            >
                              <Chip
                                label={`#${index + 1}`}
                                size="small"
                                sx={{
                                  bgcolor:
                                    index === 0
                                      ? "rgba(251, 191, 36, 0.2)"
                                      : index === 1
                                      ? "rgba(156, 163, 175, 0.2)"
                                      : index === 2
                                      ? "rgba(251, 146, 60, 0.2)"
                                      : "rgba(100, 116, 139, 0.2)",
                                  color:
                                    index === 0
                                      ? "#FBB928"
                                      : index === 1
                                      ? "#9CA3AF"
                                      : index === 2
                                      ? "#FB923C"
                                      : "#64748B",
                                  fontWeight: 600,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                borderBottom:
                                  "1px solid rgba(100, 116, 139, 0.1)",
                                py: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Avatar
                                  src={token.logo}
                                  alt={token.symbol}
                                  sx={{ width: 32, height: 32 }}
                                >
                                  {token.symbol[0]}
                                </Avatar>
                                <Box>
                                  <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    {token.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                  >
                                    {token.symbol}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{
                                borderBottom:
                                  "1px solid rgba(100, 116, 139, 0.1)",
                                py: 2,
                              }}
                            >
                              <Address
                                pubkey={new PublicKey(token.mint)}
                                link
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                borderBottom:
                                  "1px solid rgba(100, 116, 139, 0.1)",
                                py: 2,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 500 }}
                              >
                                {token.holders.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                borderBottom:
                                  "1px solid rgba(100, 116, 139, 0.1)",
                                py: 2,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 500 }}
                              >
                                $
                                {token.marketCap.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {filteredTokens.length === 0 && searchTerm && (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                      <Typography
                        variant="body1"
                        sx={{ color: "text.secondary" }}
                      >
                        No tokens found matching &quot;{searchTerm}&quot;
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
