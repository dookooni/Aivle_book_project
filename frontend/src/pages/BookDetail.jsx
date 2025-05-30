// src/pages/BookDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Stack } from '@mui/material';

function BookDetail({ books, setBooks }) {
  const { id } = useParams();
  const nav = useNavigate();

  const book = books.find((b) => b.bookId.toString() === id);

  if (!book) {
    return <Typography>해당 도서를 찾을 수 없습니다.</Typography>;
  }

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updated = books.filter((b) => b.bookId.toString() !== id);
      setBooks(updated);
      nav('/');
    }
  };

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
        maxWidth: '600px',
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
      <Typography variant="h4"gutterBottom
          sx={{
            fontFamily: 'TmoneyRound',
            fontWeight: 700
          }}>{book.title}</Typography>
      <img
        src={book.coverImage?.image_url || 'https://via.placeholder.com/150'}
        alt="커버 이미지"
        style={{ marginTop: 16, maxHeight: 300, borderRadius: 8 }}
      />
      <Typography variant="h6" sx={{
            fontFamily: 'TmoneyRound',
            fontWeight: 400,
            mt: 3 
          }}>요약</Typography>
      <Typography>{book.summary}</Typography>
      <Typography variant="h6" sx={{
            fontFamily: 'TmoneyRound',
            fontWeight: 400,
            mt: 3
          }}>내용</Typography>
      <Typography>{book.content}</Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={() => nav('/')}>
          🏠 메인으로
        </Button>
        <Button variant="contained" onClick={() => nav(`/books/${book.bookId}/edit`)}>
          ✏️ 수정하기
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          🗑️ 삭제하기
        </Button>
      </Stack>
    </div>
  </div>
  );
}

export default BookDetail;
