// src/components/layout/Layout.jsx
import { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import HttpIcon from "@mui/icons-material/Http";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AivleLogo from '../../assets/aivle_logo.png';

const drawerWidth = 240;

// 좌측 메뉴
const menuItems = [
  { text: "홈", icon: <HomeIcon />, path: "/" },
  { text: "책 목록", icon: <MenuBookIcon />, path: "/books" },
  { text: "책 등록", icon: <AddCircleOutlineIcon />, path: "/books/new" },
  { text: "API_TEST", icon: <HttpIcon />, path: "/api_test" },
  { text: "내 책 목록", icon: <BookmarksIcon />, path: "/my/books" },
];

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /* ---------------- Drawer ---------------- */
  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
          BMS 메뉴
        </Typography>
      </Toolbar>

      <Divider />

      <Box sx={{ flex: 1, p: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                mx: 0.5,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                },
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  /* ---------------- Layout 전체 ---------------- */
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column", width: "100%" }}>
      <CssBaseline />

      {/* ---------------- AppBar ---------------- */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background:
            "linear-gradient(90deg, #1e3c72 0%, #2a5298 40%, #4e73df 100%)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
        }}
      >
        <Toolbar>
          {/* 모바일 메뉴 버튼 */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* 제목 */}
          <img src={AivleLogo} alt="AIVLE Logo" style={{ width: 100, height: 'auto', marginRight: 16 }}/>
          <Typography
            variant="h6"
            noWrap
            sx={{ fontWeight: 700, letterSpacing: 0.5 }}
          >
            BMS - Books Management System
          </Typography>

          {/* 오른쪽 여백 */}
          <Box sx={{ flexGrow: 1 }} />

          {/* 로그인 / 회원가입 */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => navigate("/login")}
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              로그인
            </Button>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<PersonAddIcon />}
              onClick={() => navigate("/signup")}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": { boxShadow: "0 0 8px rgba(0,0,0,0.25)" },
              }}
            >
              회원가입
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ---------------- Drawer + Main 영역 ---------------- */}
      <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
        {/* Drawer Navigation */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* 모바일 Drawer */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* 데스크탑 Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                borderRight: "1px solid #e0e0e0",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* ---------------- 메인 컨텐츠 (가운데 정렬) ---------------- */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: 8,
            py: { xs: 2, md: 3 },
            px: { xs: 2, md: 3 },
            bgcolor: "#f5f7fb00",
            display: "block",
            overflow: "auto",
            width: "100%",
          }}
        >
          {/* 중앙 고정 폭 컨테이너 */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
