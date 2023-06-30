import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Pagination,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Collapse
} from "@mui/material";
import Loading from "../../Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme } from "@mui/material/styles";
import NewModificarProductoForm from "./NewModificarProductoForm";
import { useMediaQuery } from "@mui/material";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16213E", // Personalizar el color primary
    },
    secondary: {
      main: "#00ff00", // Personalizar el color secondary
    },
  },
});

const endpoint = `${import.meta.env.VITE_BACKEND_URL}/producto/todos`;

const ListadoProductosAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productos, setProductos] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const productsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      const data = response.data;
      setProductos(data);
      setTotalPages(Math.ceil(data.length / productsPerPage));
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/producto/eliminar/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        swal({
          title: "Eliminado",
          text: "Producto eliminado correctamente",
          icon: "success",
          timer: 3000,
          buttons: false
        })
        setProductos((prevProductos) =>
          prevProductos.filter((product) => product.id !== id)
        );
      } else {
        console.log("Error al eliminar el producto.");
      }
    } catch (error) {
      console.log("Error al enviar la solicitud de eliminación:", error);
    }
  };

  const handleEdit = (id) => {
    setExpandedItem((prevExpandedItem) =>
      prevExpandedItem === id ? null : id
    );
  };

  const handleAccordionCollapse = (id) => {
    setExpandedItem((prevExpandedItem) =>
      prevExpandedItem === id ? null : id
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (loading) {
    return <Loading containerHeight={"50vh"} />;
  }

  return (
    <>
      <Box
        className="box-modificar"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          mb: "5vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <List sx={{ width: "70vw" }}>
            {currentProducts.map((product, index) => (
              <Box key={product.id}>
                <ListItem>
                  <Grid container spacing={2} >
                    <Grid
                      className={`img-productos-admin ${
                        isMobile ? "mobile-image" : ""
                      }`}
                      item
                      xs={12}
                      sm={3} 
                      md={3}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={product.imagen}
                        alt="Product Image"
                        style={{ maxHeight: isMobile ? "90px" : "90px", width: "auto" }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={7} md={7} sx={{  display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "center" }}>
                      <ListItemText
                      sx={{pl:"10px",}}
                        primary={product.nombre}
                        secondary={product.descripcion}
                      />
                    </Grid>

                    <Grid className="botones-editeliminar" item xs={12} sm={2}  md={2}sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                      <IconButton
                        aria-label="Edit"
                        onClick={() => handleEdit(product.id)}
                        color="primary"
                        sx={{'&:hover': {
                          backgroundColor: 'transparent',
                        }}}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => handleDelete(product.id)}
                        sx={{ color: "#CC0000", '&:hover': {
                          backgroundColor: 'transparent',
                        } }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                    
                  </Grid>
                </ListItem>
                {expandedItem === product.id && (
                  <Collapse in={true} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2 }}>
                      <NewModificarProductoForm producto={product} />
                    </Box>
                  </Collapse>
                )}
                {index !== productos.length - 1 && <Divider />}
                {/* Add Divider except for the last item */}
              </Box>
            ))}
          </List>
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: "2vh" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
              className="pagination"
              color="primary"
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default ListadoProductosAdmin;
