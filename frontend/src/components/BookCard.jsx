// components/BookCard.jsx
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function BookCard({ book }) {
  const nav = useNavigate();

  return (
<Card>
  <CardActionArea onClick={() => nav(`/books/${book.bookId}`)}>
    <CardMedia
      component="img"
      height="200"
      image={book.coverImage?.image_url || 'https://via.placeholder.com/150'}
      alt="도서 표지"
    />
    <CardContent>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontFamily: 'TmoneyRound',
          fontWeight: 700
        }}
      >
        {book.title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <PersonIcon fontSize="small" /> 저자: {book.author}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <CalendarMonthIcon fontSize="small" /> 출판일: {book.createdAt?.slice(0, 10)}
      </Typography>

      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          fontFamily: 'TmoneyRound',
          fontWeight: 400
        }}
      >
        {book.summary}
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>

  );
}

export default BookCard;
