import React, { useContext, useRef, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Box, Toolbar, Typography, Button, styled, MenuItem, Menu, Tooltip, IconButton, ListItemIcon } from "@mui/material";
import { Logout, Settings, Favorite } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ShareIcon from '@mui/icons-material/Share';
import "../Style/Header.css";


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

  // MANEJAR INICIO Y CIERRE DE SESIÓN
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

    navigate("/");
  };

  // ANIMACIÓN TEXTO DE LEMA/FRASE/SLOGAN
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


  // MANEJAR NOMBRE Y APELLIDO (Iniciales) 
  const [anchorEl, setAnchorEl] = useState(null);
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
      const usuario = payload.usuario
      state.auth.usuario = usuario
      state.auth.nombre = nombreUsuario;
      state.auth.apellido = apellidoUsuario
      state.auth.token = token;
      state.auth.isClient = payload.rol === "usuario";
      state.auth.isAdmin = payload.rol === "admin";
      state.auth.id = payload.id;
      //console.log(state);
      setNombre(nombreUsuario);
      setApellido(apellidoUsuario);
    }
  }, []);


  // MENÚ HABURGUESA (Rsponsive)
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

  // UPDATE AVATAR INIT WHEN state.auth.isLogged CHANGES
  useEffect(() => {
    // Handle updating the avatar init component here
    // This code will be executed whenever state.auth.isLogged changes
    // You can modify the logic according to your requirements
    // For example:
    if (state.auth.isLogged) {
      // User is logged in
      // Update the avatar init component or perform any other actions
    } else {
      // User is not logged in
      // Update the avatar init component or perform any other actions
    }
  }, [state.auth.isLogged]);

  return (
    <Box>
      {/*============================== LOGO Y LEMA ============================ */}
      <Box>
        <AppBar>
          <Toolbar className="toolBar">
            <Box>
              <Link to="/" onClick={handleReload}>
                <img src="/images/HARMONY_RENTALS_4.png" alt="Logo" id="logoHeader" />
              </Link>
            </Box>
            <Box className="lema">
              <Typography variant="p" ref={headerTextRef} className="header-text">
                Música en tus manos!
              </Typography>
            </Box>
            {/* </Toolbar>// UPDATE AVATAR INIT WHEN state.auth.isLogged CHANGES*/}
            {/* =================== LOGEADO (Admin y NoAdmin) =========================== */}
            <Box className="avatar-init">
              {state.auth.isLogged ? (
                <Box>
                  <Tooltip title="Cuenta"  >
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      id="cuenta"
                    >
                      <Avatar id='iniciales'>
                        <Typography fontSize={25} color="#16213e">
                          {nombre.charAt(0).toUpperCase()}
                        </Typography>
                        <Typography fontSize={25} color="#16213e">
                          {apellido.charAt(0).toUpperCase()}
                        </Typography>
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    id="account-menu"
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

                    {/* =============================== ADMIN =================================== */}
                    {isAdmin && (
                      <Box>
                        <Link to="misDatos" style={{ textDecoration: 'none' }}>
                          <MenuItem id='mis-datos' >
                            <ListItemIcon>
                              <AccountCircleIcon fontSize="small" sx={{ color: "#16213e" }} />
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
                      </Box>
                    )}

                    {/* ============================= NO ADMIN ================================= */}
                    {!isAdmin && (
                      <Link to="misDatos" style={{ textDecoration: 'none' }}>
                        <MenuItem id='mis-datos' >
                          <ListItemIcon>
                            <AccountCircleIcon fontSize="small" sx={{ color: "#16213e" }} />
                          </ListItemIcon>
                          {nombre} {apellido}
                        </MenuItem>
                      </Link>
                    )}

                    {/* ============================= GENERAL ================================= */}
                    <Link className="botonadmin" to="/favoritos">
                      <MenuItem>
                        <ListItemIcon>
                          <Favorite fontSize="small" />
                        </ListItemIcon>
                        Favoritos
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Cerrar Sesión
                    </MenuItem>
                  </Menu>

                  {/*-------------------- TEXTO ADMIN (Bajo las Iniciales) ------------- */}
                  {isAdmin && (
                    <Typography sx={{ fontSize: "small" }}>
                      Admin
                    </Typography>
                  )}

                </Box>
              ) : (

                // ================================== NO LOGEADO =========================================== 
                // ============================= BTN LOGIN - REGISTER ==========================
                <Box id="butonsBox">
                  <Link to="/register">
                    <Button className="boton" >Crear Cuenta</Button>
                  </Link>
                  <Link to="/login">
                    <Button className="boton">Iniciar Sesión</Button>
                  </Link>
                </Box>
              )}

            </Box>

            {/* ========================= MENU HAMBURGUESA ====================================== */}
            <MenuIcon onClick={toggleMenu} className={`menu ${isMenuOpen ? "open" : ""}`} />
            <Menu style={{ filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))" }}
              anchorEl={null}
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              className="burger-menu"
            >
              {/* ================================== NO LOGEADO ===========================================  */}
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
              {/* =================== LOGEADO (Admin y NoAdmin) =========================== */}
              {state.auth.isLogged && isAdmin && (
                <Box>
                  <Link to="misDatos" style={{ textDecoration: 'none' }}>
                    <MenuItem id='mis-datos' >
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" sx={{ color: "#16213e" }} />
                      </ListItemIcon>
                      {nombre} {apellido}
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={() => handleMenuOptionClick("/admin")}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Panel Admin
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuOptionClick("/favoritos")}>
                    <ListItemIcon>
                      <Favorite fontSize="small" />
                    </ListItemIcon>
                    Favoritos
                  </MenuItem>
                </Box>
              )}
              {state.auth.isLogged && (
                <Box>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Cerrar Sesión
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default Header;
