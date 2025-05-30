import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Stack
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { createBook } from '../api/bookApi';


function BookForm({ books, setBooks }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const [author, setAuthor] = useState(''); //저자 추가
  const [createdAt, setCreatedAt] = useState('');
  

  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // AI 이미지 생성 버튼 클릭 시
  const handleGenerateImage = async () => {
    if (!summary) {
      alert('요약을 먼저 입력해주세요.');
      return;
    }

    setLoading(true);

    // 👇 여기서 실제 백엔드로 요청을 보내면 됩니다
    // 지금은 요약 텍스트로 임시 이미지 생성
    setTimeout(() => {
      const dummyUrl = `https://via.placeholder.com/300x400.png?text=${encodeURIComponent(
        summary.slice(0, 10)
      )}`;
      setCoverImage(dummyUrl);
      setLoading(false);
    }, 1500);
  };

  // 저장하기 버튼 클릭 시 axios 연결결
    const handleSubmit = async () => {
      if (!title || !summary || !content || !author || !createdAt) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      try {
        const newBook = {
          title,
          summary,
          content,
          author,
          created_at: createdAt,
          updatedAt: new Date().toISOString(),
          coverImage: {
            image_url: coverImage || 'https://via.placeholder.com/150'
          }
        };

        const res = await createBook(newBook);
        alert('도서가 등록되었습니다!');
        nav('/');
      }catch (err) {
        console.error('도서 등록 실패:', err);
        alert('등록 중 오류가 발생했습니다.');
      }
      };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4">📖 도서 등록</Typography>

      <TextField
        fullWidth
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ my: 2 }}
      />
      
      <TextField
        fullWidth
        label="저자"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        sx={{ my: 2 }}
      />

      <TextField
        fullWidth
        label="출판일"
        type="date"
        value={createdAt}
        onChange={(e) => setCreatedAt(e.target.value)}
        InputLabelProps={{ shrink: true }}
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

      {/* AI 이미지 생성 + 저장 버튼 */}
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AutoAwesomeIcon />}
          onClick={handleGenerateImage}
          disabled={loading}
        >
          {loading ? '생성 중...' : 'AI 이미지 생성'}
        </Button>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          저장하기
        </Button>
      </Stack>

      {/* 이미지 미리보기 */}
      {coverImage && (
        <div style={{ marginTop: '1.5rem' }}>
          <Typography variant="subtitle1">생성된 표지 미리보기</Typography>
          <img
            src={coverImage}
            alt="표지 이미지"
            style={{
              marginTop: '0.5rem',
              borderRadius: '8px',
              maxHeight: '300px'
            }}
          />
        </div>
      )}
    </div>
  );
}

export default BookForm;
