import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // 💡 백엔드 주소에 맞게 수정
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
  },
  withCredentials: true, // 필요 시 쿠키 인증 사용
});

// 요청 인터셉터 (선택)
instance.interceptors.request.use(
  (config) => {
    // UTF-8 인코딩 강제 설정
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    
    // JWT 토큰 자동 추가 예시
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (선택)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 공통 에러 처리
    if (!error.response) {
      alert('서버에 연결할 수 없습니다.');
    }
    return Promise.reject(error);
  }
);

export default instance;
