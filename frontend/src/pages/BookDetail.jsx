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
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4">{book.title}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>저자</Typography>
      <Typography>{book.author}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>출판일</Typography>
      <Typography>{book.createdAt?.slice(0, 10)}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>수정일</Typography>
      <Typography>{book.updatedAt?.slice(0, 10)}</Typography>
      {/* 저자,출판일,수정일 추가   */}
      <img
        src={book.coverImage?.image_url || 'https://via.placeholder.com/150'}
        alt="커버 이미지"
        style={{ marginTop: 16, maxHeight: 300, borderRadius: 8 }}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>요약</Typography>
      <Typography>{book.summary}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>내용</Typography>
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
  );
}

export default BookDetail;
