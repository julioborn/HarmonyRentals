import React, { useContext } from 'react';
import { Box, Button, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GlobalContext } from '../Context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import '../Style/Login.css';
import swal from 'sweetalert';
import axios from 'axios';

const Login = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

const handleSubmit = async (values) => {
  const request = {
    email: values.email,
    password: values.password
  };
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, request, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      const data = response.data;
     // console.log(data);
      dispatch({ type: "LOGIN", payload: { email: values.email, token: JSON.stringify(data) } });
      sessionStorage.setItem("token", JSON.stringify(data));
      swal({
        title: "Sesión Iniciada Correctamente",
        text: "¡Bienvenido!",
        icon: "success",
        timer: 2500,
        buttons: false
      });
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 3000);
    } else {
      throw new Error('Error occurred while fetching data');
    }
  } catch (error) {
    console.error(error);
    swal({
      title: "Usuario y/o Contraseña incorrectos",
      text: "Proporciona tus datos correctamente",
      icon: "error",
      timer: 3000,
      buttons: false
    });
  }
};

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo inválido').required('Ingresá tu correo registrado'),
    password: Yup.string().required('Ingresá tu contraseña'),
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#16213E",
      }
    },
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className='formulario'>
        <ThemeProvider theme={theme}>
          <Box className='login'>
            <Typography id="iniciarSesion" variant='h4' color="primary">Iniciar Sesión</Typography>
            <Field
              name='email'
              as={TextField}
              size='small'
              type='email'
              label='Correo'
              placeholder='Email'
              className='input-login'
            />
            <ErrorMessage name='email' component='div' className='error' />

            <Field
              name='password'
              as={TextField}
              size='small'
              type='password'
              label='Contraseña *'
              placeholder='Contraseña'
              className='input-login'
              
            />
            <ErrorMessage name='password' component='div' className='error' />

            <Button type='submit' size='medium' variant='contained' className='ingresar'>
              Ingresar
            </Button>
          </Box>
        </ThemeProvider>
      </Form>
    </Formik>
  );
};

export default Login;
