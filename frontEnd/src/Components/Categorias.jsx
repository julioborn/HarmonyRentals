import React, { useState } from "react";
import "../Style/Categoria.css";
import { Box, Link } from "@mui/material";
import ProductosXCategoria from "./ProductosXCategoria";
import Random10 from "./Random10";
import { useMediaQuery } from 'react-responsive'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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

const Categorias = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategoryDetalle, setSelectedCategoryDetalle] = useState("");
    const isMobile = useMediaQuery({ maxWidth: 600 });

    const handleCategoryClick = (categoryId, categoryDetalle) => {       
        setSelectedCategoryId(categoryId);
        setSelectedCategoryDetalle(categoryDetalle);
    };

    return (
        <>
            {isMobile ? (
                <div className="carousel-container">
                    <Carousel showArrows={true} showStatus={false} showThumbs={false} infiniteLoop={true}>
                        {categories.map((category, index) => (
                            <div key={index}>
                                <img src={category.image} alt={category.detalle} />
                                <button className="legend" onClick={() => handleCategoryClick(category.id, category.detalle)}>{category.title}</button>
                            </div>
                        ))}
                    </Carousel>
                </div>
            ) : (
                <Box className="categoria" >
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            className="catego"
                            sx={{ textDecoration: "none" }}
                            onClick={() => handleCategoryClick(category.id, category.detalle)}
                        >
                            <img src={category.image} alt={category.detalle} />
                            <h3>{category.title}</h3>
                        </Link>
                    ))}
                </Box>
            )}
            {!selectedCategoryId ? (
                <Random10 />
            ) : (
                <>
                    <ProductosXCategoria categoria_id={selectedCategoryId} selectedCategoryDetalle={selectedCategoryDetalle} />
                </>
            )}

        </>
    );
};

export default Categorias;

