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
import { fetchBook, updateBook } from '../api/bookApi'; 

function BookEdit({ books, setBooks }) {
  const { id } = useParams();
  const nav = useNavigate();

  //const book = books.find((b) => b.bookId.toString() === id);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [author, setAuthor] = useState('');//저자
  const [createdAt, setCreatedAt] = useState('');//출판일


//기존도서 불러오기
  useEffect(() => {
    fetchBook(id)
      .then((res) => {
        const book = res.data;
        setTitle(book.title);
        setSummary(book.summary);
        setContent(book.content);
        setAuthor(book.author);
        setCreatedAt(book.created_at?.slice(0, 10) || '');
        setCoverImage(book.coverImage?.image_url || '');
      })
      .catch((err) => {
        console.error('도서 불러오기 실패:', err);
        alert('도서를 불러오는 중 오류가 발생했습니다.');
        nav('/');
      });
  }, [id, nav]);


  // useEffect(() => {
  //   if (book) {
  //     setTitle(book.title);
  //     setSummary(book.summary);
  //     setContent(book.content);
  //     setCoverImage(book.coverImage?.image_url || '');
  //     setCreatedAt(book.createdAt?.slice(0, 10) || '');
  //     setAuthor(book.author || '');
  //   }
  // }, [book]);

  // if (!book) return <Typography>도서를 찾을 수 없습니다.</Typography>;

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

  const handleSave = async () => {
    if (!title || !summary || !content || !author || !createdAt) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const updatedBook = {
        title,
        summary,
        content,
        author,
        created_at: createdAt,
        updatedAt: new Date().toISOString(),
        coverImage: {
          image_url: coverImage
        }
      };
      await updateBook(id, updatedBook);
      alert('수정이 완료되었습니다.');
      nav(`/books/${id}`);
    } catch (err) {
      console.error('도서 수정 실패:', err);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  // const handleSave = () => {
  //   const updatedBook = {
  //     ...book,
  //     title,
  //     summary,
  //     content,
  //     author,
  //     createdAt,
  //     updatedAt: new Date().toISOString(),// 업데이트
  //     coverImage: {
  //       image_url: coverImage
  //     }
  //   };

  //   const newBooks = books.map((b) =>
  //     b.bookId.toString() === id ? updatedBook : b
  //   );

  //   setBooks(newBooks);
  //   nav(`/books/${id}`);
  // };

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
      <Typography variant="h4"  sx={{
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
        label="출판일"
        type="date"
        value={createdAt}
        onChange={(e) => setCreatedAt(e.target.value)}
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
  </div>
  );
}

export default BookEdit;
