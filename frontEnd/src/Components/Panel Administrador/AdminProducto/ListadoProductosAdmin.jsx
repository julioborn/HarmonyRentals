import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Pagination,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Collapse,
  Tabs,
  Tab,
} from "@mui/material";
import Loading from "../../Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewModificarProductoForm from "./NewModificarProductoForm";
import AgregarProductoForm from "./AgregarProductoForm";

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

const endpoint = "http://localhost:8080/producto/todos";

const ListadoProductosAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productos, setProductos] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const productsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
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
      const response = await fetch(
        `http://localhost:8080/producto/eliminar/${id}`,
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
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          mb:"5vh",
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
          <List sx={{ width: "100%" }}>
            {currentProducts.map((product, index) => (
              <Box key={product.id}>
                <ListItem>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={product.imagen}
                        alt="Product Image"
                        style={{ maxHeight: "100px", width:"auto" }}
                      />
                    </Grid>
                    <Grid item xs={8}
                    sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                      <ListItemText
                        primary={product.nombre}
                        secondary={product.descripcion}
                      />
                    </Grid>
                    <Grid item xs={2}
                    sx={{display:"flex", alignItems:"center", justifyContent:"space-evenly"}}
                    >
                    
                        <IconButton
                          aria-label="Edit"
                          onClick={() => handleEdit(product.id)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          onClick={() => handleDelete(product.id)}
                          sx={{color:"#CC0000"}}
                        >
                          <DeleteIcon />
                        </IconButton>
                      
                    </Grid>
                  </Grid>
                </ListItem>
                {expandedItem === product.id && (
                  <Collapse in={true} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2 }}>
                      <NewModificarProductoForm productoId={product.id} />
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
          <Box sx={{ display: "flex", justifyContent: "center" , mt:"2vh"}}>
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
