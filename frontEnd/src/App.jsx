import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Rutas, Layout } from "./Navigation/Routes";
import Login from "./Routes/Login";
import GlobalContextProvider from "./Context/GlobalContext";
import "./App.css"

const App = () => {
    return (
            <GlobalContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>
                            {
                                Rutas.map(({ id, path, Component }) => (
                                    <Route key={id} path={path} element={<Component />} />
                                ))
                            }
                        </Route>
                    </Routes>
                </BrowserRouter>
            </GlobalContextProvider>
    );
};

export default App;
