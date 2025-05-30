// pages/Home.jsx
import { Grid, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';

function Home({ books }) {
  const nav = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div
      style={{
        backgroundColor: '#f4f6f8',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          width: '100%',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
        variant="h4"
        align="center"
        sx={{
          fontFamily: 'TmoneyRound',
          fontWeight: 700
        }}
    >
      📚 등록된 도서 목록 📚
      </Typography>

        {books.length === 0 ? (
          <Typography color="textSecondary" sx={{ mb: 3 }}>
            등록된 도서가 없습니다.
          </Typography>
        ) : (
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {books.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.bookId}>
                  <BookCard book={book} />
                </Grid>
              ))}
            </Grid>
        )}

        <Button
          variant="contained"
          sx={{
            fontFamily: 'TmoneyRound',
            fontWeight: 400
          }}
          fullWidth={isMobile}
          onClick={() => nav('/books/new')}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}

export default Home;
