import * as React from 'react';
import { Avatar, Link, Box, Typography, Popover, List, ListItem } from '@mui/material';
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

    const appImageUrl = 'https://buckets3-harmonyrentals-front.s3.us-east-2.amazonaws.com/images/logosintitulo.png';
    const appUrl = 'http://buckets3-harmonyrentals-front.s3-website.us-east-2.amazonaws.com/';

    const handleShareLink = (shareUrl) => {
        const text = '¡Echa un vistazo a esta increible aplicación!';
        const body = `${text} ${appUrl}`;
        const modifiedShareUrl = `${shareUrl}&text=${encodeURIComponent(body)}`;

        window.open(modifiedShareUrl, '_blank');
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
                            <Avatar src='/images/footerlogo.png' sx={{ width: '30px', height: '30px', mr: "10px" }} />
                        </Box>
                        <Typography className='texto'>
                            2023 Harmony Rentals ©
                        </Typography>
                    </Box>
                    <Box className='social'>
                        <Link href='https://www.facebook.com' target='blank'>
                            <FacebookIcon src="images/facebook-logo.webp" fontSize='medium' className='icon' />
                        </Link>
                        <Link href='https://www.whatsapp.com/' target='blank'>
                            <WhatsAppIcon src="/images/whatsapp-logo.webp" fontSize='medium' className='icon' />
                        </Link>
                        <Link href='https://www.instagram.com' target='blank'>
                            <InstagramIcon src="/images/instagram-logo.webp" fontSize='medium' className='icon' />
                        </Link>
                        <Link href='https://www.linkedin.com' target='blank'>
                            <LinkedInIcon src="/images/linkedin-logo.webp" fontSize='medium' className='icon' />
                        </Link>
                        <Link
                            onClick={handleClick} target='blank' sx={{ cursor: 'pointer' }}
                        >
                            <ShareIcon src="/images/comparir-logo.webp" fontSize='medium'  className='icon' />
                        </Link>
                    </Box>
                </Box>
            </Box>

            <Popover
                sx={{ mt: -8, ml: -1.5 }}
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
                        <ListItem sx={{ "&:hover": { backgroundColor: "transparent" } }} button onClick={() => handleShareLink(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(appUrl)}&mini=true&title=My%20App&summary=Check%20out%20this%20amazing%20application!&source=${encodeURIComponent(appImageUrl)}`)}>
                            <LinkedInIcon src={appImageUrl} fontSize='large' sx={{ color: '#16213e', }} />
                        </ListItem>

                        <ListItem sx={{ "&:hover": { backgroundColor: "transparent" } }} button onClick={() => handleShareLink(`https://api.whatsapp.com/send?text=${encodeURIComponent(appUrl)}&mini=true&title=My%20App&summary=Check%20out%20this%20amazing%20application!&source=${encodeURIComponent(appImageUrl)}`)}>
                            <WhatsAppIcon src={appImageUrl} fontSize='large' sx={{ color: '#16213e' }} />
                        </ListItem>

                        <ListItem sx={{ "&:hover": { backgroundColor: "transparent" } }} button onClick={() => handleShareLink(`https://twitter.com/share?url=${encodeURIComponent(appUrl)}&mini=true&title=My%20App&summary=Check%20out%20this%20amazing%20application!&source=${encodeURIComponent(appImageUrl)}`)}>
                            <TwitterIcon src={appImageUrl} fontSize='large' sx={{ color: '#16213e' }} />
                        </ListItem>
                        <ListItem sx={{ "&:hover": { backgroundColor: "transparent" } }} button onClick={() => handleShareLink(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}&mini=true&title=My%20App&summary=Check%20out%20this%20amazing%20application!&source=${encodeURIComponent(appImageUrl)}`)}>
                            <FacebookIcon src={appImageUrl} fontSize='large' sx={{ color: '#16213e' }} />
                        </ListItem>
                        <ListItem sx={{ "&:hover": { backgroundColor: "transparent" } }} button onClick={handleShareEmail}>
                            <LocalPostOfficeIcon src={appImageUrl} fontSize='large' sx={{ color: '#16213e' }} />
                        </ListItem>
                    </List>
                </Box>
            </Popover>

        </Box>
    )
}

export default Footer;
