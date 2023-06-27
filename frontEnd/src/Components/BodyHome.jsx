import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Link,
  TextField,
  Button,
  Autocomplete,
  Grid,Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../Style/Categoria.css";
import "../Style/Buscador.css";
import { useMediaQuery } from "react-responsive";
import { Carousel } from "react-responsive-carousel";
//import Random10 from "./Random10";
import ProductosXCategoria from "./ProductosXCategoria";
import ResultadosBusqueda from "./ResultadosBusqueda";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import CalendarHome from "./CalendarHome";
import PasosDeBusqueda from "./PasosDeBusqueda";
import axios from "axios";
import Loading from "./Loading";
import { CardProducto } from "./CardProducto";
//array de categorias
const categories = [
  {
    title: "Percusión",
    image: "./images/tamborb.webp",
    id: 1,
    detalle: "Baterías y Percusión",
  },
  {
    title: "Vientos",
    image: "./images/tromp.webp",
    id: 2,
    detalle: "Instrumentos de Viento",
  },
  {
    title: "Cuerdas",
    image: "./images/ukelele.webp",
    id: 3,
    detalle: "Instrumentos de Cuerdas",
  },
  {
    title: "Teclados",
    image: "./images/pianotecla.webp",
    id: 4,
    detalle: "Teclados Y Pianos",
  },
  {
    title: "Accesorios",
    image: "./images/pedalera2.webp",
    id: 5,
    detalle: "Pedales y Accesorios",
  },
];

//anulo icono de cerrar duplicado en el input y asigno color de borde al componente para que coincida con Calendar
const CustomTextField = React.forwardRef(({ InputProps, ...props }, ref) => (
  <TextField
    {...props}
    InputProps={{
      ...InputProps,
      //endAdornment: null,
      sx: {
        "&.Mui-focused fieldset": {
          borderColor: "black !important",
        },
      },
    }}
    ref={ref}
  />
));

// componente Random10 importado de urgencia
const Random10 = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const initialRender = useRef(true);

  const fetchRandomProducts = async () => {
  try {
    setIsLoading(true);
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/producto/random`);
    console.log("Realizando get del random al backend");
    if (response.status === 200) {
      console.log("Si ves esto es porque devolvio un 200");
      setProductos(response.data);
    } else {
      setError(`Error: ${response.status}`);
      console.log("Si ves esto es porque no pudo hacer el get del rendom");
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
    console.log("Si ves esto es porque no pudo hacer el get del rendom");
  }
};

useEffect(() => {
  if (initialRender.current) {
    initialRender.current = false;
  } else {
    fetchRandomProducts();
  }
}, []);

  return (
    
      <Box
        id="random10-container"
        sx={{
          height: 'auto',
          marginBottom: "7vh",
          backgroundColor: "#F0F0F0"
        }}
      >
        {isLoading ? (
          <Loading containerHeight={"40vh"} />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  width: '100vw',
                  color: "#16213E",
                  textAlign: "center",
                  fontSize: 23,
                  fontWeight: "bolder",
                  height: 'auto',
                  marginTop: 2,
                  marginBottom: 3,
                }}
                id="recomendados"
              >
                Instrumentos Recomendados
              </Typography>
            </Box>
            <Box >
              <Grid container spacing={2} >
                {productos.map((producto, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2.4}
                    key={producto.id}
                    id="random"
                  >
                    <CardProducto producto={producto} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Box>
  
  );
};


/////////////////////////
const BodyHome = () => {
  const [categoriaElegida, setCategoriaElegida] = useState(null);
  const [categoriaDetalle, setCategoriaDetalle] = useState("");
  const [inputBuscador, setInputBuscador] = useState("");
  const [buscadorDinamico, setbuscadorDinamico] = useState([]);
  const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultadoBusqueda, setResultadoBusqueda] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);
  const[resetPasos, setResetPasos]=useState(false)
  const [formReset, setFormReset] = useState(false);

  //función para manejar cambios en el date picker
  const handleDateRangeChange = (startDate, endDate) => {
    setFechaDesde(startDate);
    setFechaHasta(endDate);
  };
  //función para manejar el click en cada categoría
  const handleCategoriaClick = (categoryId, categoryDetalle) => {
    setCategoriaElegida(categoryId);
    setCategoriaDetalle(categoryDetalle);
    setResultadoBusqueda("");
    setIdProductoSeleccionado(null); // Set the ID to null when a category is clicked
  };

  //API request buscador de intrumento o de cadena de texto ingresada x el usuario, sin fechas
  const buscarInstrumento = async (value) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/producto/busca?query=${value}`
      );
      const data = response.data;
      // console.log("buscar instrumento:", data);

      return data || [];
    } catch (error) {
      console.error("Error performing search:", error);
      return [];
    }
  };
  //función para mostrar el valor ingresado por el usuario cuando abandona el input
  const buscadorInstrumento = async (event) => {
    const { value, type } = event.target;
    if (type !== "blur") {
      setInputBuscador(value);
      const databasebuscadorDinamico = await buscarInstrumento(value);
      setbuscadorDinamico(databasebuscadorDinamico);
    }
  };

  const buscadorInstrumentoBlur = (event) => {
    const { value } = event.target;
    setInputBuscador(value);
  };
  //Api request para consultar un producto y sus fechas disponibles
  const buscarInstrumentoXFechas = async (query, fecha_desde, fecha_hasta) => {
    const formattedFechaDesde = fecha_desde ? formatDate(fecha_desde) : "";
    const formattedFechaHasta = fecha_hasta ? formatDate(fecha_hasta) : "";
    // console.log(formattedFechaDesde, formattedFechaHasta);
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/alquiler/productosDisponiblesXfecha?query=${query}&fecha_desde=${formattedFechaDesde}&fecha_hasta=${formattedFechaHasta}`
    );
    const data = response.data;
    // console.log("busqueda productoFechas:", data);
    return data || [];
  };

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // funcion submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (inputBuscador.trim() === "") {
      swal({
        title: "",
        text: "Ingrese un instrumento o marca",
        timer: 3000,
        buttons: false,
      });
      return;
    }

    if (!fechaDesde || !fechaHasta) {
      //busqueda sin fechas
      console.log("busequeda sin fecha:" + inputBuscador);
      const busquedaSinFechas = await buscarInstrumento(inputBuscador);

      if (busquedaSinFechas.length === 0) {
        swal({
          title: "",
          text: "No se encontraron productos con ese nombre",
          timer: 3000,
          buttons: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      setResultadoBusqueda(busquedaSinFechas);
      setIdProductoSeleccionado(busquedaSinFechas[0].id);
      console.log(
        "idProductoSeleccionado recibe valor: " + busquedaSinFechas[0].id
      );

      return;
    }

    const resultadoBusqueda = await buscarInstrumentoXFechas(
      inputBuscador,
      fechaDesde,
      fechaHasta
    );
    setResultadoBusqueda(resultadoBusqueda);

    if (resultadoBusqueda.length === 0) {
      swal({
        title: "",
        text: "No se encontraron productos con ese nombre",
        timer: 3000,
        buttons: false,
      });
      setTimeout(() => {
        window.location.reload();
        
      }, 3000);
    }
    setIsSubmitted(true);
    setFormReset(true)
  };

  const renderOption = (option) => (
    <p
      component="a"
      onClick={() => {
        setInputBuscador(option.nombre);
        setIdProductoSeleccionado(option.id); // Pass the ID of the option
      }}
      underline="none"
    >
      {option.nombre}
    </p>
  );
  const getOptionLabel = (option) => option.nombre;
  
  useEffect(() => {
    if (formReset) {
      const timer = setTimeout(() => {
        setFormReset(false);
        setResetPasos(true)
      }, 1000); // Reset formReset after 1 second
      return () => clearTimeout(timer);
    }
  }, [formReset]);
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <form className="form" onSubmit={handleSearchSubmit}>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: "2vh",
          }}
        >
          <Grid
            item
            id="stepper"
            xs={12}
            sm={6}
            md={6}
            sx={{
              width: "100%", 
              mt: "2vh",
              mb: "0",
            }}
          >
            <PasosDeBusqueda
              inputBuscador={inputBuscador}
              fechaDesde={fechaDesde}
              fechaHasta={fechaHasta}
              isSubmitted={isSubmitted}
              resetPasos={resetPasos}
            />
          </Grid>
          <Grid
            container
            id="inputsTextoYFecha"
            item
            xs={12}
            sm={12}
            md={12}          
          >
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              id="inputTexto"
              
            >
              <Autocomplete                
                
                options={buscadorDinamico}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    name="inputBuscador"
                    type="search"
                    size="small"
                    className="input"
                    placeholder={
                      !inputBuscador ? "Instrumento " : inputBuscador
                    }
                   
                    value={formReset ? "" : inputBuscador}
                    onChange={buscadorInstrumento}
                    onBlur={buscadorInstrumentoBlur}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>{renderOption(option)}</li>
                )}
                disableClearable
                noOptionsText="Nombre o marca del instrumento"
              />
            </Grid>
            <Grid 
              id="dateGrid"
              item
              xs={12}
              sm={4}
              md={3}
              sx={{
                display: "flex",
                flexDirection: ["column", "row", "row"],
                alignItems: ["center", "center", "center"],
                justifyContent: ["center", "center", "center"],
                gap: ["10px", "10px", "10px"],
              }}
            >
              <CalendarHome
                id="searchDate"
                onDateRangeChange={handleDateRangeChange}
                productoId={formReset ? null : idProductoSeleccionado}
                
              />
              <Button className="btnBuscar" type="submit">
                <SearchIcon />
              </Button>
              

            </Grid>
          </Grid>
        </Grid>
      </form>

      {isMobile ? (
        <div className="carousel-container">
          <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
          >
            {categories.map((category, index) => (
              <div key={index}>
                <img src={category.image} alt={category.detalle} />
                <button
                  className="legend"
                  onClick={() =>
                    handleCategoriaClick(category.id, category.detalle)
                  }
                >
                  {category.title}
                </button>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <Box className="categoria">
          {categories.map((category, index) => (
            <Link
              key={index}
              className="catego"
              sx={{ textDecoration: "none" }}
              onClick={() =>
                handleCategoriaClick(category.id, category.detalle)
              }
            >
              <img src={category.image} alt={category.detalle} />
              <h3>{category.title}</h3>
            </Link>
          ))}
        </Box>
      )}
      {!categoriaElegida && !resultadoBusqueda ? (
        <Random10 />
      ) : resultadoBusqueda && resultadoBusqueda.length > 0 ? (
        <ResultadosBusqueda productos={resultadoBusqueda} />
      ) : categoriaElegida ? (
        <ProductosXCategoria
          categoria_id={categoriaElegida}
          categoriaDetalle={categoriaDetalle}
        />
      ) : null}
    </Box>
  );
};

export default BodyHome;
