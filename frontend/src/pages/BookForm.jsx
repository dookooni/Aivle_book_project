import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Stack,
  Paper
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { createBook, updateBookCover } from '../api/bookApi';

import OpenAI from 'openai';

function BookForm({ books, setBooks }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const [author, setAuthor] = useState(''); //저자 추가
  const [createdAt, setCreatedAt] = useState('');
  

  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const nav = useNavigate();

  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  // AI 이미지 생성 버튼 클릭 시
  const handleGenerateSummary = async () => {
    if (!content) {
      alert('내용을 먼저 입력해주세요.');
      return;
    }

    setLoading(true);
    try{
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4.1",
          input: `Please summarize the following text in 1-2 sentences:\n\n${content}`,
        }),
    });

      const data = await response.json();
      console.log("API 응답 :", data);

      const aiSummary = data.output?.[0]?.content?.[0]?.text?.trim() || "요약 생성 실패";
      setSummary(aiSummary);
    } catch (error) {
      console.error('Summary generation error:', error);
      alert('요약 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }

    // 👇 여기서 실제 백엔드로 요청을 보내면 됩니다
    // 지금은 요약 텍스트로 임시 이미지 생성
    // setTimeout(() => {
    //   const dummyUrl = `https://via.placeholder.com/300x400.png?text=${encodeURIComponent(
    //     summary.slice(0, 10)
    //   )}`;
    //   setCoverImage(dummyUrl);
    //   setLoading(false);
    // }, 1500);
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

  // 저장하기 버튼 클릭 시
  const handleSubmit = async () => {
    // 필수 필드 검증
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
        summary: summary || 'No summary available.'
      };

      console.log('전송할 도서 데이터:', bookData);
      const response = await createBook(bookData);
      console.log('도서 생성 응답:', response.data);

      if (response.data.status === 'success') {
        const bookId = response.data.data.id;
        
        // 표지 이미지가 있다면 업데이트
        if (coverImage && bookId) {
          try {
            console.log('표지 이미지 업데이트 시도:', coverImage);
            const coverResponse = await updateBookCover(bookId, coverImage);
            console.log('표지 이미지 업데이트 응답:', coverResponse.data);
            
            if (coverResponse.data.status === 'success') {
              console.log('표지 이미지 업데이트 성공!');
            }
          } catch (coverError) {
            console.error('표지 이미지 업데이트 실패:', coverError);
            // 표지 이미지 업데이트 실패는 전체 등록을 실패로 처리하지 않음
          }
        }

        // 목록 새로고침을 위해 홈으로 이동
        alert('도서가 성공적으로 등록되었습니다!');
        nav('/');
      } else {
        throw new Error('도서 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('도서 등록 실패:', error);
      alert('도서 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
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
        multiline
        minRows={5}
        label="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ my: 2 }}
      />

      <Button
        variant = "outlined"
        color = "secondary"
        startIcon = {<AutoAwesomeIcon/>}
        onClick = {handleGenerateSummary}
        disabled = {loading}
        sx = {{ my : 2}}
      >
        {loading ? "요약 생성 중..." : "AI로 요약 생성"}
      </Button>

      <Paper elevation={3} sx={{ p: 2, my: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="subtitle1" color="textSecondary">
          AI 요약
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {summary || "요약이 생성되면 여기에 표시됩니다."}
        </Typography>
      </Paper>

      {/* AI 이미지 생성 + 저장 버튼 */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="center">

        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AutoAwesomeIcon />}
          onClick={handleGenerateImage}
          disabled={loading}
        >
          {loading ? '생성 중...' : 'AI 표지 생성'}
        </Button>

        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? '저장 중...' : '저장하기'}
        </Button>
      </Stack>

      {/* 이미지 미리보기 */}
      {coverImage && (
        <div style={{ marginTop: '1.5rem' }}>
          <Typography variant="subtitle1">표지 미리보기</Typography>
          <img
            src={coverImage}
            alt="도서 표지"
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
