// src/pages/BookDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Stack } from '@mui/material';

import { useEffect, useState } from 'react';
import { fetchBook, deleteBook } from '../api/bookApi';

function BookDetail({ books, setBooks }) {
  const { id } = useParams();
  const nav = useNavigate();

  //const book = books.find((b) => b.bookId.toString() === id);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
   useEffect(() => {
    fetchBook(id)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('도서 조회 실패:', err);
        alert('도서를 불러오는 데 실패했습니다.');
        nav('/');
      });
  }, [id, nav]);
  if (!book) {
    return <Typography>해당 도서를 찾을 수 없습니다.</Typography>;
  }

  // const handleDelete = () => {
  //   if (window.confirm('정말 삭제하시겠습니까?')) {
  //     const updated = books.filter((b) => b.bookId.toString() !== id);
  //     setBooks(updated);
  //     nav('/');
  //   }
  // };
    const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteBook(id);
        alert('도서가 삭제되었습니다.');
        nav('/');
      } catch (err) {
        console.error('삭제 실패:', err);
        alert('삭제 중 오류가 발생했습니다.');
      }
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
