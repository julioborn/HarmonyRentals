import Home from "../Routes/Home";
import Layout from "../Components/Layout/Layout";
import PanelAdmin from "../Components/Panel Administrador/PanelAdmin";
import ProductoDetalle from "../Components/ProductoDetalle";
import ListadoProductos from "../Components/ListadoProductos";
import Login from "../Routes/Login";
import Register from "../Routes/Register";


export const Rutas = [
    {
        id: 1,
        path: '/',
        Component: Home,
    },
    {
        id: 2,
        path: '/register',
        Component: Register,

    },
    {
        id: 3,
        path: '/login',
        Component: Login,

    },
    {
        id: 4,
        path: "/admin",
        Component: PanelAdmin
    },
    {
        id: 5,
        path: '/producto/:id',
        Component: ProductoDetalle,

    },
    {
        id: 6,
        path: '/listadoProductos',
        Component: ListadoProductos,
    },
];

export { Layout };