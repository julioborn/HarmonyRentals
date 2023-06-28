import React, { useContext, useState } from 'react';
import { Box, Button, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { GlobalContext } from '../Context/GlobalContext';
import '../Style/Register.css';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const Register = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const initialValues = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .trim()
      .required('Nombre es requerido')
      .test(
        'no-leading-space',
        'El nombre no puede tener espacios en blanco al comienzo',
        (value) => !value.startsWith(' ')
      ),
    apellido: Yup.string()
      .trim()
      .required('Apellido es requerido')
      .test(
        'no-leading-space',
        'El apellido no puede tener espacios en blanco al comienzo',
        (value) => !value.startsWith(' ')
      ),
    email: Yup.string()
      .trim()
      .email('Email inválido')
      .required('Email es requerido')
      .test(
        'no-leading-space',
        'El email no puede tener espacios en blanco al comienzo',
        (value) => !value.startsWith(' ')
      ),
    password: Yup.string()
      .trim()
      .required('Contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .test(
        'no-leading-space',
        'La contraseña no puede tener espacios en blanco al comienzo',
        (value) => !value.startsWith(' ')
      ),
  });

  const handleSubmit = async (values) => {
    if (validationSchema) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/registrar`, values, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          swal({
            title: 'Usuario Registrado Correctamente',
            text: '¡Inicia Sesión para Ingresar!',
            icon: 'success',
            timer: 2500,
            buttons: false
          });
          // Haz algo con los datos de la respuesta si es necesario
          navigate('/login');
        } else {
          // Registro fallido
          const error = response.data;
          dispatch({
            type: 'REGISTER_ERROR',
            payload: error
          });
        }
      } catch (error) {
        dispatch({
          type: 'REGISTER_ERROR',
          payload: 'Por favor, completa todos los campos correctamente.'
        });
      }
    } else {
      dispatch({
        type: 'REGISTER_ERROR',
        payload: 'Por favor, completa todos los campos correctamente.'
      });
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#16213E',
      },
    },
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className="form-register">
        <ThemeProvider theme={theme}>
          <Box className="register">
            <Typography variant="h4" color="primary">
              Registro
            </Typography>
            {state.error && <Typography color="error">{state.error}</Typography>}
            <div>
              <Field
                size="small"
                name="nombre"
                label="Nombre"
                as={TextField}
                className="input"
              />
              <ErrorMessage name="nombre" component="div" className="error-message" />
            </div>
            <div>
              <Field
                size="small"
                name="apellido"
                label="Apellido"
                as={TextField}
                className="input"
              />
              <ErrorMessage name="apellido" component="div" className="error-message" />
            </div>
            <div>
              <Field
                size="small"
                name="email"
                type="email"
                label="Correo electrónico"
                as={TextField}
                className="input"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div>
              <Field
                size="small"
                name="password"
                type="password"
                label="Contraseña"
                as={TextField}
                className="input"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <Button type="submit" variant="contained" color="primary" size="medium" className="registrarse">
              Registrarse
            </Button>
          </Box>
        </ThemeProvider>
      </Form>
    </Formik>
  );
};

export default Register;
