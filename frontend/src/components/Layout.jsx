import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  
  const nav = useNavigate();
  return(
  <>
    <AppBar position="static">
      <Toolbar>
        <MenuBookIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Book Manager</Typography>
        <Box>
            <Button color="inherit" onClick={() => nav('/')}>
              홈
            </Button>
            <Button color="inherit" onClick={() => nav('/books/new')}>
              도서 등록
            </Button>
          </Box>
      </Toolbar>
    </AppBar>
    <Container sx={{ mt: 4 }}>{children}</Container>
  </>

);
}
export default Layout;
