import * as React from 'react';
import { Avatar, BottomNavigation, Link, Box, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ShareIcon from '@mui/icons-material/Share';
import '../Style/Footer.css'

const Footer = () => {

    return (
        <Box>
            <BottomNavigation className='botonNav'>
                <Box className='boxFoot1'>
                    <Box className='footer-left'>
                        <Box className='logo-foot'>
                            <Avatar src="/images/logosintitulo.webp" sx={{ width: '40px', height: '40px', marginLeft: "5px" }} />
                        </Box>
                        <Typography className='texto'>
                            © 2023 Harmony Rentals
                        </Typography>
                    </Box>
                    <Box className='social'>
                        <Link href='' target='blank'>
                            <ShareIcon src="/images/comparir-logo.webp" fontSize='large' className='icon' />
                        </Link>
                        <Link href='https://www.facebook.com' target='blank'>
                            <FacebookIcon src="images/facebook-logo.webp" fontSize='large' className='icon' />
                        </Link>
                        <Link href='https://www.whatsapp.com/' target='blank'>
                            <WhatsAppIcon src="/images/whatsapp-logo.webp" fontSize='large' className='icon' />
                        </Link>
                        <Link href='https://www.instagram.com' target='blank'>
                            <InstagramIcon src="/images/instagram-logo.webp" fontSize='large' className='icon' />
                        </Link>
                        <Link href='https://www.linkedin.com' target='blank'>
                            <LinkedInIcon src="/images/linkedin-logo.webp" fontSize='large' className='icon' />
                        </Link>
                    </Box>
                </Box>
            </BottomNavigation>
        </Box>
    )
}

export default Footer
