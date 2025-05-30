// pages/Home.jsx
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';

import { useState, useEffect } from 'react';
import { fetchBooks } from '../api/bookApi'; //axios 연결

function Home({ books }) {
  const nav = useNavigate();
  
  //연결
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchBooks()
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('도서 목록 불러오기 실패:', err);
        setLoading(false);
      });
  }, []);


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
