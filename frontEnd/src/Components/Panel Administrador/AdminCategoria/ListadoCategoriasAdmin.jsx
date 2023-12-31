import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Pagination,
  List,
  ListItem,
  Typography,
  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import Loading from "../../Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ModificarCategoriaForm from "./ModificarCategoriaForm";
import "../../../Style/PanelAdmin.css"
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

const ListadoCategoriasAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categorias, setCategorias] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categoria/todas`, {
        headers: {
          Authorization:`Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        setCategorias(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setLoading(false);
      } else {
        console.log("Error fetching data:", response.status);
      }
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
        `${import.meta.env.VITE_BACKEND_URL}/categoria/eliminar/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        swal({
          title: "Eliminado",
          text: "Categoría eliminada correctamente",
          icon: "success",
          timer: 3000,
          buttons: false,
        });
        setCategorias((prevItems) =>
          prevItems.filter((categoria) => categoria.id !== id)
        );
      } else {
        console.log("Error al eliminar la categoría.");
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categorias.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (loading) {
    return <Loading containerHeight={"50vh"} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
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
          <List sx={{ width: "100%" }}>
            {currentItems.map((categoria, index) => (
              <Box key={categoria.id}>
                <ListItem>
                  <Grid container spacing={2} sx={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <Grid
                      item
                      xs={12}
                      sm={4.5}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={categoria.imagen}
                        alt="Imagen Categoria"
                        style={{
                          maxHeight: "100px",
                          maxWidth: "100%",
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1" align="center" fontWeight={"500"} >
                        {categoria.nombre}
                      </Typography>
                      <Typography variant="body2" align="center">
                        {categoria.descripcion}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <IconButton
                        aria-label="Edit"
                        onClick={() => handleEdit(categoria.id)}
                        color="primary"
                        sx={{'&:hover': {
                          backgroundColor: 'transparent',
                        }}}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => handleDelete(categoria.id)}
                        sx={{ color: "#CC0000", '&:hover': {
                          backgroundColor: 'transparent',
                        }}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
                {expandedItem === categoria.id && (
                  <Collapse in={true} timeout="auto" unmountOnExit>
                    <Box
                      sx={{ p: 2, display: "flex", justifyContent: "center" }}
                    >
                      <ModificarCategoriaForm categoriaId={categoria.id} />
                    </Box>
                  </Collapse>
                )}
                {index !== categorias.length - 1 && <Divider />}
                {/* Add Divider except for the last item */}
              </Box>
            ))}
          </List>
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
    </ThemeProvider>
  );
};

export default ListadoCategoriasAdmin;