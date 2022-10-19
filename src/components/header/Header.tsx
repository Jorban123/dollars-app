import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import styles from './header.module.css'
import { Link, useNavigate } from 'react-router-dom'
const pages = [
  {
    title: 'Конвертер',
    link: '/'
  },
  {
    title: 'Текущие курсы валют',
    link: '/kek',
  }
];

const Header: React.FC = () => {
  const navigate = useNavigate()
  function onClickButton({id}: any){
    console.log(id);
    navigate(id)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button className={styles.button}
                key={page.title}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => onClickButton({id: page.link})}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;

