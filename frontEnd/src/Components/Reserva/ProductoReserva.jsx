import { Paper, Box, Typography, Grid, TextField, Button, Link } from "@mui/material";
import { KeyboardReturn as KeyboardReturnIcon } from "@mui/icons-material";
import { display } from "@mui/system";


const ProductoReserva = ({ producto }) => {
  return (
    <Box  sx={{mt:"4vh"}}>
      
      <Grid
          container
          spacing={2}
          sx={{          
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
     
      <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection:"column",
             
            }}>
              <Typography variant="h6" sx={{  color: "#16213e", textAlign:"center"}}>
          Instrumento
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#737270" , textAlign:"center"}}>
          Detalles:
        </Typography>
         
        </Box>
        
        
          <Grid item xs={12} sm={5}
          
          >
            <TextField
              className="usuarioFormField"
              size="small"
              label="Nombre"
              fullWidth
              InputProps={{ readOnly: true }}
              value={producto.nombre}
            />
            <TextField
              className="usuarioFormField"
              size="small"
              label="Descripcion"
              fullWidth
              multiline
              maxRows={8}
              sx={{ marginTop: "3vh" }}
              InputProps={{ readOnly: true }}
              value={producto.descripcion}
            />
            <TextField
              className="usuarioFormField"
              size="small"
              label="Categoría"
              fullWidth
              sx={{ marginTop: "3vh" }}
              InputProps={{ readOnly: true }}
              value={producto.categoria.nombre}
            />
            <TextField
              className="usuarioFormField"
              size="small"
              label="Precio x dia"
              type="number"
              fullWidth
              sx={{ marginTop: "3vh" }}
              InputProps={{ readOnly: true }}
              value={producto.precio_x_dia}
            />
             <img
            src={producto.imagenes[0]}
            alt={producto.nombre}
            style={{ maxheight:"200px", maxWidth: "200px" }}
          />
          </Grid>
        </Grid>
      
    </Box>
  );
};

export default ProductoReserva;
