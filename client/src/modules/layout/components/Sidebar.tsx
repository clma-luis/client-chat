import { Component, Dispatch, SetStateAction, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import Icons, { IconSize } from "../../../shared/utils/Icons";
import { Logo } from "../utils/logo";
import { NavItem } from "./nav-item";

export interface itemsType {
  href: string;
  icon: any;
  title: string;
}

const items: itemsType[] = [
  {
    href: "/",
    icon: <Icons name="HomeIcon" size={IconSize.lg} />,
    title: "Inicio",
  },

  {
    href: "/blog",
    icon: <Icons name="BookOpenIcon" size={IconSize.lg} />,
    title: "Blog",
  },
  {
    href: "/donaciones",
    icon: <Icons name="GiftIcon" size={IconSize.lg} />,
    title: "Donaciones",
  },
];

export interface DashboardSidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardSidebar = (props: DashboardSidebarProps) => {
  const { isSidebarOpen, setSidebarOpen } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isSidebarOpen) {
      setSidebarOpen?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 1 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 420,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={setSidebarOpen}
      open={isSidebarOpen}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
