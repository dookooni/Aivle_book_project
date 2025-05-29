// pages/BookEdit.jsx
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
  Stack
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useState, useEffect } from 'react';

function BookEdit({ books, setBooks }) {
  const { id } = useParams();
  const nav = useNavigate();

  const book = books.find((b) => b.bookId.toString() === id);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setSummary(book.summary);
      setContent(book.content);
      setCoverImage(book.coverImage?.image_url || '');
    }
  }, [book]);

  if (!book) return <Typography>도서를 찾을 수 없습니다.</Typography>;

  const handleGenerateImage = () => {
    if (!summary) {
      alert('요약을 먼저 입력해주세요.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const dummyUrl = `https://via.placeholder.com/300x400.png?text=${encodeURIComponent(
        summary.slice(0, 10)
      )}`;
      setCoverImage(dummyUrl);
      setLoading(false);
    }, 1500);
  };

  const handleSave = () => {
    const updatedBook = {
      ...book,
      title,
      summary,
      content,
      coverImage: {
        image_url: coverImage
      }
    };

    const newBooks = books.map((b) =>
      b.bookId.toString() === id ? updatedBook : b
    );

    setBooks(newBooks);
    nav(`/books/${id}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4">✏️ 도서 수정</Typography>

      <TextField
        fullWidth
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ my: 2 }}
      />
      <TextField
        fullWidth
        label="요약"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        sx={{ my: 2 }}
      />
      <TextField
        fullWidth
        multiline
        minRows={5}
        label="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ my: 2 }}
      />

      <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 2 }}>
        <Button
          variant="outlined"
          startIcon={<AutoAwesomeIcon />}
          onClick={handleGenerateImage}
          disabled={loading}
        >
          AI 이미지 생성
        </Button>
        {loading && <CircularProgress size={24} />}
        <Button variant="contained" onClick={handleSave} disabled={loading}>
          저장하기
        </Button>
      </Stack>

      {coverImage && (
        <div style={{ marginTop: '1rem' }}>
          <Typography variant="subtitle1">표지 미리보기</Typography>
          <img
            src={coverImage}
            alt="표지 이미지"
            style={{ marginTop: '0.5rem', borderRadius: '8px', maxHeight: '300px' }}
          />
        </div>
      )}
    </div>
  );
}

export default BookEdit;
