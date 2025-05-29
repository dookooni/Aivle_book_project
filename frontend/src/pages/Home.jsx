// pages/Home.jsx
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';

function Home({ books }) {
  const nav = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4">📚 등록된 도서 목록</Typography>
      <Button variant="contained" sx={{ my: 2 }} onClick={() => nav('/books/new')}>
        등록하기
      </Button>

      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.bookId}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
