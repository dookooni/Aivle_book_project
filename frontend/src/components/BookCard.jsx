// components/BookCard.jsx
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BookCard({ book }) {
  const nav = useNavigate();

  return (
<Card sx={{ display: 'flex', p: 2 }}>
  <CardMedia
    component="img"
    image={book.coverImage?.image_url || 'https://via.placeholder.com/150'}
    alt="도서 표지"
    sx={{
      width: 140,
      height: 200,
      objectFit: 'contain',
      borderRadius: 2,
      backgroundColor: '#f5f5f5',
      flexShrink: 0
    }}
  />

  <CardActionArea onClick={() => nav(`/books/${book.bookId}`)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pl: 2 }}>
    <CardContent sx={{ padding: 0 }}>
      <Typography variant="h6" sx={{ fontFamily: 'TmoneyRound', fontWeight: 700 }}>
        {book.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        저자: {book.author}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        출판일: {book.createdAt?.slice(0, 10)}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'TmoneyRound' }}>
        {book.summary}
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>


  );
}

export default BookCard;
