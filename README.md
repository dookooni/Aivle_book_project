# 📚 AI Book Manager

> **KT Aivle School 3반 미니프로젝트 4차**  
> **AI 기반 도서 관리 시스템** - OpenAI를 활용한 지능형 요약 및 표지 이미지 생성

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5--turbo-orange.svg)](https://openai.com/)
[![Java](https://img.shields.io/badge/Java-17-red.svg)](https://openjdk.java.net/)

## 📺 Demo 영상

### 🚀 AI 기능 시연 
![AI 기능 데모](./demo/ai-features.gif)
*AI 요약 생성 → AI 표지 생성 → 도서 저장 과정*

### 📚 도서 관리 기능
![CRUD 기능 데모](./demo/crud-demo.gif)
*도서 목록 → 상세보기 → 편집 → 삭제*

## 🛠️ 기술 스택

### Frontend
- **Framework**: React 18.x (Create React App)
- **UI Library**: Material-UI (@mui/material)
- **HTTP Client**: Axios
- **Package Manager**: Yarn
- 
### Backend
- **Framework**: Spring Boot 3.5.0
- **Language**: Java 17
- **Database**: H2 (개발용), JPA/Hibernate
- **Build Tool**: Gradle
- **API**: RESTful API, CORS 설정
### AI Integration

- **OpenAI API**: GPT-3.5-turbo, DALL-E-3
- **기능**: 텍스트 요약, 이미지 생성
  
## 🌟 주요 기능

### 📖 도서 관리
- **CRUD 작업**: 도서 생성, 조회, 수정, 삭제
- **페이징 지원**: 대량의 도서 데이터 효율적 처리
- **검색 및 필터링**: 빠른 도서 찾기

### 🤖 AI 통합 기능
- **AI 요약 생성**: OpenAI GPT-3.5-turbo를 활용한 자동 요약
- **AI 표지 생성**: DALL-E-3를 이용한 맞춤형 책 표지 이미지 생성
- **스마트 폴백**: API 실패 시 더미 데이터로 안정적 서비스 제공

### 🎨 사용자 경험
- **Material-UI**: 모던하고 직관적인 인터페이스
- **실시간 미리보기**: 생성된 표지 이미지 즉시 확인
- **반응형 디자인**: 다양한 디바이스 지원
  
## 프로젝트 구조
```
Aivle_book_project/
├── backend/bookproject/          # Spring Boot 애플리케이션
│   ├── src/main/java/
│   │   └── com/kt/aivle/bookproject/
│   │       ├── controller/       # REST API 컨트롤러
│   │       ├── service/          # 비즈니스 로직
│   │       ├── repository/       # 데이터 접근 계층
│   │       ├── dto/              # 데이터 전송 객체
│   │       └── entity/           # JPA 엔티티
│   └── src/main/resources/
├── frontend/                     # React 애플리케이션
│   ├── src/
│   │   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── pages/                # 페이지 컴포넌트
│   │   └── api/                  # API 통신 로직
│   └── public/
└── README.md
```

## 📋 API 명세서

### 도서 관리 API
| Method | Endpoint | Description | 
|--------|----------|-------------|
| `GET` | `/api/books` | 도서 목록 조회 (페이징) |
| `POST` | `/api/books` | 새 도서 생성 |
| `GET` | `/api/books/{id}` | 도서 상세 조회 |
| `PUT` | `/api/books/{id}` | 도서 정보 수정 |
| `PUT` | `/api/books/{id}/cover-url` | 표지 이미지 업데이트 |
| `DELETE` | `/api/books/{id}` | 도서 삭제 |

### 응답 형식
```json
{
  "status": "success",
  "message": "도서 조회 성공",
  "data": {
    "id": 1,
    "title": "샘플 도서",
    "author": "작가명",
    "summary": "AI 생성 요약...",
    "content": "도서 내용...",
    "coverImageUrl": "https://...",
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

</div>
