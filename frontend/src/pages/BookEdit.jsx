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
import { getBook, updateBook, updateBookCover } from '../api/bookApi';

function BookEdit() {
  const { id } = useParams();
  const nav = useNavigate();

  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await getBook(id);
      if (response.data.status === 'success') {
        const bookData = response.data.data;
        setBook(bookData);
        setTitle(bookData.title || '');
        setSummary(bookData.summary || '');
        setContent(bookData.content || '');
        setAuthor(bookData.author || '');
        setCoverImage(bookData.coverImageUrl || '');
      }
    } catch (error) {
      console.error('도서 조회 실패:', error);
      alert('도서를 불러오는데 실패했습니다.');
    } finally {
      setPageLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!summary) {
      alert('요약을 먼저 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      console.log('=== AI 이미지 생성 시작 ===');
      console.log('API Key 존재 여부:', !!process.env.REACT_APP_OPENAI_API_KEY);
      console.log('API Key 앞 10자리:', process.env.REACT_APP_OPENAI_API_KEY?.substring(0, 10));
      console.log('요약 내용:', summary);

      // OpenAI API 키가 있는 경우에만 실제 API 호출
      if (process.env.REACT_APP_OPENAI_API_KEY) {
        console.log('OpenAI API 호출 시작...');
        
        const requestBody = {
          model: "dall-e-3",
          prompt: `Create a clean and simple book cover illustration based on this summary. Style should be minimalistic and elegant: ${summary}`,
          n: 1,
          size: "1024x1024",
        };
        
        console.log('요청 데이터:', requestBody);

        const response = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        console.log('응답 상태:', response.status);
        console.log('응답 헤더:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API 오류 응답:', errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("이미지 생성 응답:", data);

        const imageUrl = data.data?.[0]?.url;
        if (imageUrl) {
          console.log('생성된 이미지 URL:', imageUrl);
          setCoverImage(imageUrl);
          alert("AI 이미지가 성공적으로 생성되었습니다!");
        } else {
          console.log("API 응답에서 이미지 URL을 찾을 수 없음:", data);
          throw new Error("API 응답에 이미지 URL이 없습니다");
        }
      } else {
        console.log("OpenAI API 키가 설정되지 않음. 더미 이미지를 생성합니다.");
        throw new Error("API 키 없음");
      }
    } catch (error) {
      console.error("=== 이미지 생성 오류 ===");
      console.error("오류 메시지:", error.message);
      console.error("전체 오류:", error);
      
      // 실패시 더미 이미지 생성
      console.log("더미 이미지를 생성합니다...");
      
      // 요약 텍스트 기반으로 색상과 텍스트 생성
      const colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F', 'BB8FCE'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const shortSummary = summary.length > 20 ? summary.substring(0, 20) + '...' : summary;
      
      const dummyUrl = `https://via.placeholder.com/400x600/${randomColor}/FFFFFF?text=${encodeURIComponent(shortSummary)}`;
      console.log('생성된 더미 URL:', dummyUrl);
      setCoverImage(dummyUrl);
      
      const errorMsg = error.message.includes('API 키') 
        ? "OpenAI API 키를 확인해주세요. 현재는 테스트용 더미 표지를 생성했습니다."
        : `AI 이미지 생성 실패: ${error.message}\n테스트용 더미 표지를 생성했습니다.`;
      
      alert(errorMsg);
    } finally {
      setLoading(false);
      console.log('=== AI 이미지 생성 완료 ===');
    }
  };

  const handleSave = async () => {
    if (!title || !content || !author) {
      alert('제목, 내용, 저자는 필수 입력 사항입니다.');
      return;
    }

    setLoading(true);
    try {
      const bookData = {
        title,
        content,
        author,
        summary: summary || 'No summary',
        coverImageUrl: coverImage || null
      };

      console.log('업데이트할 도서 데이터:', bookData);
      const response = await updateBook(id, bookData);
      console.log('도서 업데이트 응답:', response.data);

      if (response.data.status === 'success') {
        alert('도서가 성공적으로 수정되었습니다!');
        nav(`/books/${id}`);
      } else {
        throw new Error('도서 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('도서 수정 실패:', error);
      alert('도서 수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!book) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>도서를 찾을 수 없습니다.</Typography>
      </div>
    );
  }

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
        <Typography variant="h4" sx={{
          fontFamily: 'TmoneyRound',
          fontWeight: 700,
          mt: 2  
        }}>✏️ 도서 수정</Typography>

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
            onClick={() => {
              console.log('AI 표지 생성 버튼 클릭됨');
              handleGenerateImage();
            }}
            disabled={loading}
          >
            {loading ? '생성 중...' : 'AI 표지 생성'}
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={loading}>
            {loading ? '저장 중...' : '변경사항 저장'}
          </Button>
        </Stack>

        {coverImage && (
          <div style={{ marginTop: '1rem' }}>
            <Typography variant="subtitle1">표지 미리보기</Typography>
            <img
              src={coverImage}
              alt="도서 표지"
              style={{ marginTop: '0.5rem', borderRadius: '8px', maxHeight: '300px' }}
              onLoad={() => console.log('이미지 로딩 성공:', coverImage)}
              onError={(e) => {
                console.error('이미지 로딩 실패:', coverImage, e);
                // 간단한 대체 이미지 사용
                e.target.src = 'https://picsum.photos/400/600?random=' + Date.now();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BookEdit;
