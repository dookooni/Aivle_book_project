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

import OpenAI from 'openai';

function BookForm({ books, setBooks }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const [author, setAuthor] = useState(''); //저자 추가
  const [createdAt, setCreatedAt] = useState('');
  

  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const client = new OpenAI({ 
    apiKey : process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser : true,
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
          input: `다음 글을 1~2문장으로 요약해줘:\n\n${content}`,
        }),
    });

      const data = await response.json();
      console.log("API 응답 :", data);

      const aiSummary = data.output?.[0]?.content?.[0]?.text?.trim() || "요약 생성 실패";
      setSummary(aiSummary);
    } catch (error) {
      console.error('요약 생성 중 오류:', error);
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
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `다음 요약을 바탕으로 실제 책의 앞표지 디자인 이미지를 만들어줘.
                - 이미지에는 책 자체의 모습(입체, 두께, 펼쳐진 형태 등)이 절대 포함되면 안 됨
                - 배경이 없음
                - 책 제목은 중앙 또는 상단에 간결한 글꼴로 배치
                - 배경에는 하나의 미니멀한 일러스트 또는 상징적 도형이 포함되어야 함
                - 전체는 실제 서점용 표지처럼 보이는 '디자인 시안' 형태로 평면 출력돼야 함
                - 입체적인 책, 펼친 책, 책 사진, 책 모형 이미지는 모두 제외
                 요약: ${summary}`,
        n: 1,
        size: "1024x1024", // 또는 "512x512"
      }),
    });

    const data = await response.json();
    console.log("이미지 생성 응답:", data);

    const imageUrl = data.data?.[0]?.url;
    if (imageUrl) {
      setCoverImage(imageUrl);
    } else {
      alert("이미지 생성 실패!");
    }
  } catch (error) {
    console.error("이미지 생성 중 오류:", error);
    alert("이미지 생성 중 오류가 발생했습니다.");
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

  // 저장하기 버튼 클릭 시
  const handleSubmit = () => {
    const newBook = {
      bookId: Date.now(), // 임시 고유 ID
      title,
      summary,
      content,
      author,
      createdAt,
      updatedAt: new Date().toISOString(),
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
        {loading ? "요약 생성 중 ... " : "AI로 요약 생성"}
      </Button>

      {/* <TextField
        fullWidth
        label="요약"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        sx={{ my: 2 }}
      /> */}

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
