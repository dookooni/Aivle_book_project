import { Card, CardMedia, CardContent, Typography, Box, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function BookCard({ book }) {
  const nav = useNavigate();

  return (
    <Card sx={{ display: 'flex', p: 1, borderRadius: 2 }}>
      <CardActionArea
        onClick={() => nav(`/books/${book.id}`)}
        sx={{ display: 'flex', width: '100%' }}
      >
        <CardMedia
          component="img"
          image={book.coverImageUrl || 'https://via.placeholder.com/150'}
          alt="도서 표지"
          sx={{
            width: 140,
            height: 200,
            objectFit: 'cover',
            borderRadius: 2,
            backgroundColor: '#f5f5f5',
            flexShrink: 0
          }}
        />

        <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 2, flex: 1 }}>
          <Typography variant="h6" sx={{ fontFamily: 'TmoneyRound', fontWeight: 700 }}>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <PersonIcon fontSize="small" sx={{ mr: 0.5 }} /> 저자: {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5 }} /> 출판일: {book.createdAt?.slice(0, 10)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontFamily: 'TmoneyRound', mt: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {book.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default BookCard;
