//BookService 인터페이스 부분
package com.kt.aivle.bookproject.service;

import com.kt.aivle.bookproject.dto.BookDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookService {
    //검색어 기준으로 도서목록 조회 (페이지네이션 지원)
    Page<BookDto.ListResponse> getBooks(String search, Pageable pageable);
    //새로운 도서 생성
    BookDto.DetailResponse createBook(BookDto.CreateRequest dto);
    //특정 ID 도서 상세 조회
    BookDto.DetailResponse getBook(Long id);
    //특정 ID 도서 삭제
    void deleteBook(Long id);
    //특정 ID 도서 업데이트
    BookDto.DetailResponse updateBook(Long id, BookDto.UpdateRequest dto);
    //특정 ID 도서 표지 이미지 URL 업데이트
    BookDto.DetailResponse updateCoverUrl(Long id, String newUrl);
}
