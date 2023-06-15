import React, { useContext, useRef, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
  Button,
  styled,
  MenuItem,
  Menu,
  Tooltip,
  IconButton,
  ListItemIcon,
  Divider,
  Stack,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import "../Style/Header.css";
import { Logout, Settings, Favorite } from "@mui/icons-material";
import ShareIcon from '@mui/icons-material/Share';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";
  const StyledLink = styled(Link)`
    text-decoration: none;
  `;
  const headerTextRef = useRef(null);

  const { state, dispatch } = useContext(GlobalContext);
  const isAdmin = state.auth.isAdmin;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    sessionStorage.clear();
    swal({
      title: "Has Cerrado la Sesión",
      text: "Nos vemos pronto",
      icon: "info",
      timer: 2500,
      buttons: false,
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    navigate("/");
  };

  const animarTexto = (text) => {
    const headerText = headerTextRef.current;
    headerText.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.textContent = text[i];
      span.style.animationDelay = `${i * 0.1}s`;
      headerText.appendChild(span);
    }
  };
  useEffect(() => {
    animarTexto("Música en tus manos!");
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url
        ? base64Url.replace(/-/g, "+").replace(/_/g, "/")
        : "";
      const payload = JSON.parse(window.atob(base64));
      const nombreUsuario = payload.nombre;
      const apellidoUsuario = payload.apellido;
      state.auth.token = token;
      state.auth.isClient = payload.rol === "usuario";
      state.auth.isAdmin = payload.rol === "admin";
      state.auth.id = payload.id;
      setNombre(nombreUsuario);
      setApellido(apellidoUsuario);
    } else {}
  }, []);

  const handleReload = () => {
    if ((window, location.pathname === "/")) {
      window.location.reload();
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuOptionClick = (route) => {
    setIsMenuOpen(false);
    navigate(route);
  };

  return (
    <Box>
      <Box className="boxHead">
        <AppBar>
          <Toolbar className="toolBar">
            <Box className="harmony">
              <Link to="/" onClick={handleReload}>
                <Avatar
                  src="/images/logohm.webp"
                  sx={{
                    width: "190px",
                    height: "auto",
                    borderRadius: "10%",
                    marginTop: "8px",
                  }}
                />
              </Link>
            </Box>
            <Box className="lema">
              <Typography
                ref={headerTextRef}
                className="header-text"
                sx={{
                  fontStyle: "oblique",
                  fontSize: "25px",
                  fontFamily: "Lucida Sans",
                  color: "white",
                  textDecoration: "none",
                  lineHeight: 1,
                  opacity: 0.7,
                  letterSpacing: "0.6em",
                  textAlign: "center",
                }}
              >
                Música en tus manos!
              </Typography>
            </Box>
            <Box className="botones">
              <Box>
                {state.auth.isLogged ? (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip title="Cuenta">
                          <IconButton
                            onClick={handleClick}
                            size="small"
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                          >
                            <Avatar
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                width: 50,
                                height: 50,
                              }}
                            >
                              <Typography fontSize={25} color="#16213e">
                                {nombre.charAt(0).toUpperCase()}
                              </Typography>
                              <Typography fontSize={25} color="#16213e">
                                {apellido.charAt(0).toUpperCase()}
                              </Typography>
                            </Avatar>
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        {isAdmin && (
                          <Box>
                            <Link to="misDatos">
                              <MenuItem
                                sx={{
                                  boxShadow: "0px 1px 1px 0px #c7c7c7ca",
                                  color: "#16213e",
                                  fontWeight: "bold",
                                }}
                              >
                                <ListItemIcon>
                                  <AccountCircleIcon
                                    fontSize="small"
                                    sx={{ color: "#16213e" }}
                                  />
                                </ListItemIcon>
                                {nombre} {apellido}
                              </MenuItem>
                            </Link>
                            <Link className="botonadmin" to="/admin">
                              <MenuItem>
                                <ListItemIcon>
                                  <Settings fontSize="small" />
                                </ListItemIcon>
                                Panel Admin
                              </MenuItem>
                            </Link>
                            {/* ShareIcon */}
                          </Box>
                        )}
                        {!isAdmin && (
                          <MenuItem
                            sx={{
                              boxShadow: "0px 1px 1px 0px #c7c7c7ca",
                              color: "#16213e",
                              fontWeight: "bold",
                            }}
                          >
                            <ListItemIcon>
                              <AccountCircleIcon
                                fontSize="small"
                                sx={{ color: "#16213e" }}
                              />
                            </ListItemIcon>
                            {nombre} {apellido}
                          </MenuItem>
                        )}
                        <Link className="botonadmin" to="/favoritos">
                          <MenuItem>
                            <ListItemIcon>
                              <Favorite fontSize="small" />
                            </ListItemIcon>
                            Favoritos
                          </MenuItem>
                        </Link>
                        <Link className="botonadmin" to="">
                          <MenuItem>
                            <ListItemIcon>
                              <ShareIcon fontSize="small" />
                            </ListItemIcon>
                            Compartir
                          </MenuItem>
                        </Link>
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Cerrar Sesión
                        </MenuItem>
                      </Menu>
                      {isAdmin && (
                        <Typography sx={{ fontSize: "small" }}>
                          Admin
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Link to="/register">
                      <Button className="boton">Crear Cuenta</Button>
                    </Link>
                    <Link to="/login">
                      <Button className="boton">Iniciar Sesión</Button>
                    </Link>
                  </Box>
                )}
              </Box>
            </Box>
            <MenuIcon
              alt="menuHamburguesa"
              className={`menu ${isMenuOpen ? "open" : ""}`}
              onClick={toggleMenu}
            />
            <Menu
              anchorEl={null}
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              className="hambur"
            >
              {!state.auth.isLogged && (
                <Box>
                  <MenuItem onClick={() => handleMenuOptionClick("/")}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    Inicio
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuOptionClick("/register")}>
                    <ListItemIcon>
                      <AppRegistrationIcon />
                    </ListItemIcon>
                    Crear Cuenta
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuOptionClick("/login")}>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    Iniciar sesión
                  </MenuItem>
                </Box>
              )}
              {state.auth.isLogged && isAdmin && (
                <Box>
                  <MenuItem
                    sx={{
                      boxShadow: "0px 1px 1px 0px #c7c7c7ca",
                      color: "#16213e",
                      fontWeight: "bold",
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon
                        fontSize="small"
                        sx={{ color: "#16213e" }}
                      />
                    </ListItemIcon>
                    {nombre} {apellido}
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuOptionClick("/admin")}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Panel Admin
                  </MenuItem>
                </Box>
              )}
              {state.auth.isLogged && (
                <>
                  <Link className="botonadmin" to="/favoritos">
                    <MenuItem>
                      <ListItemIcon>
                        <Favorite fontSize="small" />
                      </ListItemIcon>
                      Favoritos
                    </MenuItem>
                  </Link>

                  <Link className="botonadmin" to="">
                    <MenuItem>
                      <ListItemIcon>
                        <ShareIcon fontSize="small" />
                      </ListItemIcon>
                      Compartir
                    </MenuItem>
                  </Link>

                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Cerrar Sesión
                  </MenuItem>
                </>
              )}
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default Header;
