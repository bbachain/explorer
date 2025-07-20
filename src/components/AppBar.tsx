import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Chip,
  Typography,
  Button,
} from "@mui/material";
// Components
import { Logo } from "./common/Logo";
import NavElement from "./nav-element";
import NetworkSwitcher from "./NetworkSwitcher";

// Hooks
import useQueryContext from "hooks/useQueryContext";

export function AppBarContainer() {
  const { fmtUrlWithCluster } = useQueryContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [settingsMenuAnchor, setSettingsMenuAnchor] =
    useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenuAnchor(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setSettingsMenuAnchor(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        borderBottom: "1px solid rgba(100, 116, 139, 0.3)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        mb: { xs: 1, md: 2 },
      }}
    >
      <Toolbar sx={{ minHeight: 80, px: { xs: 2, md: 4 } }}>
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center", mr: "auto" }}>
          <Box sx={{ display: { xs: "none", sm: "block" }, ml: { md: 2 } }}>
            <Link
              href={fmtUrlWithCluster("/")}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Logo width={200} height={100} />
            </Link>
          </Box>
          {/* Mobile Logo */}
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <Link
              href={fmtUrlWithCluster("/")}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                BBAChain
              </Typography>
            </Link>
          </Box>
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Button
            component={Link}
            href={fmtUrlWithCluster("/")}
            sx={{ color: "white", fontWeight: 500 }}
          >
            Home
          </Button>
          <Button
            component={Link}
            href={fmtUrlWithCluster("/blocks")}
            sx={{ color: "white", fontWeight: 500 }}
          >
            Blocks
          </Button>
          <Button
            component={Link}
            href={fmtUrlWithCluster("/transactions")}
            sx={{ color: "white", fontWeight: 500 }}
          >
            Transactions
          </Button>
          {/* <Button
            component={Link}
            href={fmtUrlWithCluster("/validators")}
            sx={{ color: "white", fontWeight: 500 }}
          >
            Validators
          </Button> */}
          <Button
            component={Link}
            href={fmtUrlWithCluster("/accounts")}
            sx={{ color: "white", fontWeight: 500 }}
          >
            Accounts
          </Button>
        </Box>

        {/* Network Switcher */}
        <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
          <NetworkSwitcher />
        </Box>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            onClick={handleMobileMenuOpen}
            sx={{
              color: "text.primary",
              bgcolor: "rgba(100, 116, 139, 0.1)",
              border: "1px solid rgba(100, 116, 139, 0.2)",
              borderRadius: 2,
              p: 1,
              "&:hover": {
                bgcolor: "rgba(100, 116, 139, 0.2)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                width: 20,
                height: 16,
              }}
            >
              <Box
                sx={{
                  height: 2,
                  bgcolor: "currentColor",
                  borderRadius: 1,
                }}
              />
              <Box
                sx={{
                  height: 2,
                  bgcolor: "currentColor",
                  borderRadius: 1,
                }}
              />
              <Box
                sx={{
                  height: 2,
                  bgcolor: "currentColor",
                  borderRadius: 1,
                }}
              />
            </Box>
          </IconButton>
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiMenu-paper": {
              bgcolor: "#1E293B",
              border: "1px solid rgba(100, 116, 139, 0.2)",
              borderRadius: 2,
              mt: 1,
              minWidth: 200,
            },
          }}
        >
          <MenuItem
            onClick={handleMobileMenuClose}
            component={Link}
            href={fmtUrlWithCluster("/")}
            sx={{
              color: "text.primary",
              "&:hover": {
                bgcolor: "rgba(100, 116, 139, 0.1)",
              },
            }}
          >
            🏠 Home
          </MenuItem>
          <MenuItem
            onClick={handleMobileMenuClose}
            component={Link}
            href={fmtUrlWithCluster("/blocks")}
            sx={{
              color: "text.primary",
              "&:hover": {
                bgcolor: "rgba(100, 116, 139, 0.1)",
              },
            }}
          >
            🧱 Blocks
          </MenuItem>
          <MenuItem
            onClick={handleMobileMenuClose}
            component={Link}
            href={fmtUrlWithCluster("/transactions")}
            sx={{
              color: "text.primary",
              "&:hover": {
                bgcolor: "rgba(100, 116, 139, 0.1)",
              },
            }}
          >
            💸 Transactions
          </MenuItem>
          {/* <MenuItem
            onClick={handleMobileMenuClose}
            component={Link}
            href={fmtUrlWithCluster("/validators")}
            sx={{
              color: "text.primary",
              "&:hover": {
                bgcolor: "rgba(100, 116, 139, 0.1)",
              },
            }}
          >
            ✅ Validators
          </MenuItem> */}
          <MenuItem
            onClick={handleMobileMenuClose}
            component={Link}
            href={fmtUrlWithCluster("/accounts")}
            sx={{
              color: "text.primary",
              "&:hover": {
                bgcolor: "rgba(100, 116, 139, 0.1)",
              },
            }}
          >
            👥 Accounts
          </MenuItem>
          <Box
            sx={{
              px: 2,
              py: 1,
              borderTop: "1px solid rgba(100, 116, 139, 0.2)",
            }}
          >
            <NetworkSwitcher />
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

// Export with alias for backward compatibility
export { AppBarContainer as AppBar };
