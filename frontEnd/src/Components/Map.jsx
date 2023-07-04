import React from 'react'
import { Box } from '@mui/system'
import "../Style/Map.css"

const TraceMapa = (props) => {
  return (
    <Box className="map-box">
      <iframe id='iframe-map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.638227064689!2d-58.45904052519858!3d-34.56271415533217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5d393b25a95%3A0x357b92f75e12db5c!2sAv.%20Cabildo%202040%2C%20C1426BJO%20CABA!5e0!3m2!1ses!2sar!4v1687617408827!5m2!1ses!2sar" allowFullScreen></iframe>
    </Box>
  )
}

export default TraceMapa

