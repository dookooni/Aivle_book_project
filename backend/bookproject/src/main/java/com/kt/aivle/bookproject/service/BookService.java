//BookService 인터페이스 부분
package com.kt.aivle.bookproject.service;

import com.kt.aivle.bookproject.dto.BookRequestDto;
import com.kt.aivle.bookproject.dto.BookResponseDto;

import java.util.List;

public interface BookService {
    //검색어 기준으로 도서목록 조회
    List<BookResponseDto> getBooks(String search);
    //새로운 도서 생성
    BookResponseDto createBook(BookRequestDto dto);
    //특정 ID 도서 조회
    BookResponseDto getBook(Long id);
    //특정 ID 도서 삭제
    void deleteBook(Long id);
    //특정 ID 도서 표지 이미지 URL 업데이트
    BookResponseDto updateBook(Long id, BookRequestDto dto);
    BookResponseDto updateCoverUrl(Long id, String newUrl);
}
