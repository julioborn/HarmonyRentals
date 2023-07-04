import UsuarioForm from "./UsuarioForm";
import { GlobalContext } from "../../Context/GlobalContext";
import React, { useContext, useState, useEffect } from "react";
import { Grid, Paper, Box, Typography, TextField } from "@mui/material";
import ProductoReserva from "./ProductoReserva";
import Calendar from "../Calendar";
import { useParams } from "react-router-dom";
import CalculadorAlquiler from "./CalculadorAlquiler";
import Loading from "../Loading";
import "../../Style/NewRentarProducto.css";

const NewRentarProducto = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { id } = useParams();
  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/producto/${id}`;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(GlobalContext);
  const [reserved, setReserved] = useState([]);
  const [product, setProduct] = useState(null);
  const { fechaDesde, fechaHasta } = state || {};

  useEffect(() => {
    const { dates } = state;
    if (dates && dates.startDate && dates.endDate) {
      setStartDate(dates.startDate);
      setEndDate(dates.endDate);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch product.");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  useEffect(() => {
    const fetchReservedDates = async (productoId) => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/alquiler/producto/${productoId}/fechas`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error("Failed to fetch reserved dates");
      }
    };
    const fetchData = async () => {
      try {
        const data = await fetchReservedDates(product.id);
        setReserved(data);
      } catch (error) {
        console.error("Error fetching reserved dates:", error);
      }
    };
    if (product) {
      fetchData();
    }
  }, [product]);

  const handleDateRangeChange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  if (loading) {
    return <Loading />; // Render the loading component while loading is true
  }
  return (
    <Box sx={{ mt: "14vh", mb: "10vh" }}>
      <Grid
        container spacing={3}
        sx={{
          alignItems: "flex-start",
          paddingLeft:"5vw",
          paddingRight:"5vw"
        }}
      >
        {/* Datos del alquiler */}
        <Grid item xs={12}sm={9}>
           {/* Datos del producto */}
           {product && (
            <Box sx={{ mt: "3vh" }}>
             
             <Typography
                variant="body1"
                sx={{ color: "#737270", mb: "10px",pb:"10px", textAlign:"left" }}
              >
                Instrumento:
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
               
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    className="usuarioFormField"
                    size="small"
                    label="Nombre"
                    fullWidth
                    InputProps={{ readOnly: true }}
                    value={product.nombre}
                  />
                  <TextField
                    className="usuarioFormField"
                    size="small"
                    label="Descripcion"
                    fullWidth
                    multiline
                    maxRows={8}
                    sx={{ marginTop: "4vh" }}
                    InputProps={{ readOnly: true }}
                    value={product.descripcion}
                  />
                  <TextField
                    className="usuarioFormField"
                    size="small"
                    label="Precio x dia"
                    type="number"
                    fullWidth
                    sx={{ marginTop: "4vh" }}
                    InputProps={{ readOnly: true }}
                    value={product.precio_x_dia}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={product.imagenes[0]}
                    alt={product.nombre}
                    style={{
                      maxHeight: "260px",
                      maxWidth: "260px",
                      height: "auto",
                      width: "auto",
                    }}
                  />
                </Grid>
               
              </Grid>
            </Box>
          )}
        
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            
            <Grid item xs={6}>
            <Typography
                variant="body1"
                sx={{ color: "#737270", textAlign:"left" }}
              >
                Fechas:
              </Typography>
              <Calendar
                fixed={false}
                reservedDates={reserved}
                onDateRangeChange={handleDateRangeChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}
            sx={{display:"flex", justifyContent:"center", alignItems:""}}
            >
              <CalculadorAlquiler
                producto={product}
                fechaDesde={startDate}
                fechaHasta={endDate || fechaHasta}
              />
            </Grid>
          </Grid>
         
        </Grid>

        {/* Datos del usuario */}
        <Grid item xs={12}sm={3} sx={{ mt: "4vh", ml:"0px" }}>
        <Typography
                variant="body1"
                sx={{ color: "#737270", pl:"30px" }}
              >
                Mis Datos:
              </Typography>
          <UsuarioForm />
        </Grid>
        
      </Grid>
    </Box>
  );
};
export default NewRentarProducto;
