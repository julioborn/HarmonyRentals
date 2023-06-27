import * as React from 'react';
import { Avatar, Link, Box, Typography, Popover, List, ListItem, ListItemText } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import '../Style/Footer.css';

const Footer = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'social.share.popover' : undefined;

    const appImageUrl = '/images/logohm.webp'; // Reemplaza '/images/app-image.png' con la ruta de la imagen de tu aplicación
    const appUrl = 'http://buckets3-harmonyrentals-front.s3-website.us-east-2.amazonaws.com/'; // Reemplaza 'https://www.example.com' con la URL de tu aplicación

    const handleShareLink = (shareUrl) => {
        window.open(shareUrl, '_blank');
        handleClose();
    };

    const handleShareEmail = () => {
        const subject = '¡Echa un vistazo a esta increíble aplicación!';
        const body = `¡Hola! Me gustaría compartir contigo esta increíble aplicación que encontré: ${appUrl}`;
        const shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(shareUrl);
        handleClose();
    };

    return (
        <Box>
            <Box className='botonNav'>
                <Box className='boxFoot1'>
                    <Box className='footer-left'>
                        <Box className='logo-foot'>
                            <Avatar src="/images/logosintitulo.webp" sx={{ width: '45px', height: '45px', marginLeft: '5px' }} />
                        </Box>
                        <Typography className='texto'>
                            © 2023 Harmony Rentals
                        </Typography>
                    </Box>
                    <Box className='social'>
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
                        <Link onClick={handleClick} target='blank' sx={{cursor:'pointer'}}>
                            <ShareIcon src="/images/comparir-logo.webp" fontSize='large' className='icon' />
                        </Link>
                    </Box>
                </Box>
            </Box>

            <Popover
                sx={{ mt: -8, ml: -4.5 }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 10, horizontal: 'right' }}
            >
                <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#e6e6e6', }}>
                        <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                        <Typography variant='h6' sx={{ color: '#16213E', textAlign: 'center', padding: '5px' }}>Compartir Aplicación en Redes</Typography>
                    </Box>
                    <List sx={{ display: 'flex', flexDirection: 'row' }}>
                        <ListItem sx={{ "&:hover": { backgroundColor: "transparent" } }} button onClick={() => handleShareLink(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(appUrl)}`)}>
                            <LinkedInIcon fontSize='large' sx={{ color: '#16213e', }} />
                        </ListItem>

                        <ListItem sx={{ "&:hover": { backgroundColor: "transparent" } }} button onClick={() => handleShareLink(`https://api.whatsapp.com/send?text=${encodeURIComponent(appUrl)}`)}>
                            <WhatsAppIcon fontSize='large' sx={{ color: '#16213e' }} />
                        </ListItem>

                        <ListItem sx={{ "&:hover": { backgroundColor: "transparent" } }} button onClick={() => handleShareLink(`https://twitter.com/share?url=${encodeURIComponent(appUrl)}`)}>
                            <TwitterIcon fontSize='large' sx={{ color: '#16213e' }} />
                        </ListItem>
                        <ListItem sx={{ "&:hover": { backgroundColor: "transparent" } }} button onClick={() => handleShareLink(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`)}>
                            <FacebookIcon fontSize='large' sx={{ color: '#16213e' }} />
                        </ListItem>
                        <ListItem sx={{ "&:hover": { backgroundColor: "transparent" } }} button onClick={handleShareEmail}>
                            <LocalPostOfficeIcon fontSize='large' sx={{ color: '#16213e' }} />
                        </ListItem>
                    </List>
                </Box>
            </Popover>

        </Box>
    )
}

export default Footer;
