import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Layout = ({ children }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Book Manager</Typography>
      </Toolbar>
    </AppBar>
    <Container sx={{ mt: 4 }}>{children}</Container>
  </>
);
export default Layout;
