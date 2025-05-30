import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Stack
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function BookForm({ books, setBooks }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
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

  // 저장하기 버튼 클릭 시
  const handleSubmit = () => {
    const newBook = {
      bookId: Date.now(), // 임시 고유 ID
      title,
      summary,
      content,
      coverImage: {
        image_url: coverImage || 'https://via.placeholder.com/150'
      }
    };

    setBooks([newBook, ...books]); // 리스트에 추가
    nav('/'); // 메인 페이지로 이동
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
      <Typography variant="h4" align="center" sx={{
            fontFamily: 'TmoneyRound',
            fontWeight: 700
          }}>
        📖 도서 등록 📖
      </Typography>

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

      {/* AI 이미지 생성 + 저장 버튼 */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="center">

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
  </div>
  );
}

export default BookForm;
