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
import ModificarUsuarioForm from "./ModificarUsuarioForm"
import swal from "sweetalert";

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



const ListadoUsuariosAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usuarios, setUsuarios] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/usuario/todos");
      const data = await response.json();
      setUsuarios(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
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
        `http://localhost:8080/usuario/eliminar/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        swal({
          title: "Eliminado",
          text: "Usuario eliminado correctamente",
          icon: "success",
          timer: 3000,
          buttons: false
        })
        setUsuarios((prevItems) =>
          prevItems.filter((usuario) => usuario.id !== id)
        );
      } else {
        console.log("Error al eliminar el usuario.");
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
  const currentItems = usuarios.slice(
    indexOfFirstItem,
    indexOfLastItem
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
          mb: "5vh",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <List sx={{ width: "100%" }}>
            {currentItems.map((usuario, index) => (
              <Box
                key={usuario.id}>
                <ListItem >
                  <Grid container spacing={2} sx={{ margin: 0, padding: 0 }}>
                    <Grid item xs={2} >
                      <ListItemText
                        primary={"id " + usuario.id}
                      />
                    </Grid>
                    <Grid item xs={3} >
                      <ListItemText
                        primary={usuario.nombre + " " + usuario.apellido}
                        secondary={"id: " + usuario.id + " " + usuario.rol.nombre}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <ListItemText sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                        primary={usuario.email}
                      />
                    </Grid>
                    <Grid item xs={4}
                      sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}
                    >
                      <IconButton
                        aria-label="Edit"
                        onClick={() => handleEdit(usuario.id)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => handleDelete(usuario.id)}
                        sx={{color:"#CC0000"}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
                {expandedItem === usuario.id && (
                  <Collapse in={true} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <ModificarUsuarioForm usuarioId={usuario.id} />
                    </Box>
                  </Collapse>
                )}
                {index !== usuario.length - 1 && <Divider />}
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
    </>
  );
};

export default ListadoUsuariosAdmin;
