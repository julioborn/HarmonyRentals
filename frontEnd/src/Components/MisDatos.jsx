
import UsuarioForm from "./Reserva/UsuarioForm";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {
    Button,
    Box,
    Typography
    
  
  } from "@mui/material";

const MisDatos = () => {
   
    return (
        <Box sx={{mt:"14vh",display:"flex", textAlign:"center", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
             <Typography variant="h6" sx={{ mt: "2vh", mb: "0", color: "#16213e" }}>
                Mis Datos
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#737270" }}
              >
                Modifica o Completa tus datos:
              </Typography>
            <UsuarioForm />
            <Box
              className="class-detalle"
              sx={{
                display: "flex",
                width: "85%",
                justifyContent: "right",
              
              
              }}
            >
              <Button className="boton-detalle">
                <Link
                  to="/"
                  style={{
                    fontSize: "large",
                    fontWeight: "bold",
                    borderRadius: "3px",
                    color: "#16213e",
                    height: "2em",
                    width: "5em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <KeyboardReturnIcon />
                </Link>
              </Button>
            </Box>
        </Box>
    );
};

export default MisDatos

 