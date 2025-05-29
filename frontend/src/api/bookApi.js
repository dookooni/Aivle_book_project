import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // 필요 시 .env로 분리
});

// 목록
export const fetchBooks = () => api.get('/books');

// 단건 조회
export const fetchBook = id => api.get(`/books/${id}`);

// 생성
export const createBook = data => api.post('/books', data);

// 수정
export const updateBook = (id, data) => api.patch(`/books/${id}`, data);

// 도서 삭제
export const deleteBook = (id) => api.delete(`/books/${id}`);


// (선택) AI 표지 미리보기
export const generateCover = (id, prompt) =>
  api.post(`/books/${id}/cover/generate`, { prompt_text: prompt });

export default api;
