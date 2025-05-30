package com.kt.aivle.bookproject.controller;

import com.kt.aivle.bookproject.dto.ApiResponse;
import com.kt.aivle.bookproject.dto.BookDto;
import com.kt.aivle.bookproject.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    /**
     * 도서 목록 조회 (검색 및 페이지네이션 지원)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<BookDto.ListResponse>>> getBooks(
            @RequestParam(required = false) String search,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        
        Page<BookDto.ListResponse> books = bookService.getBooks(search, pageable);
        return ResponseEntity.ok(ApiResponse.success("도서 목록 조회 성공", books));
    }

    /**
     * 새로운 도서 생성
     */
    @PostMapping
    public ResponseEntity<ApiResponse<BookDto.DetailResponse>> createBook(
            @Valid @RequestBody BookDto.CreateRequest requestDto) {
        
        BookDto.DetailResponse book = bookService.createBook(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("도서 생성 성공", book));
    }

    /**
     * 특정 도서 상세 조회
     */
    @GetMapping("/{bookId}")
    public ResponseEntity<ApiResponse<BookDto.DetailResponse>> getBook(@PathVariable Long bookId) {
        BookDto.DetailResponse book = bookService.getBook(bookId);
        return ResponseEntity.ok(ApiResponse.success("도서 조회 성공", book));
    }

    /**
     * 특정 도서 정보 업데이트
     */
    @PutMapping("/{bookId}")
    public ResponseEntity<ApiResponse<BookDto.DetailResponse>> updateBook(
            @PathVariable Long bookId, 
            @Valid @RequestBody BookDto.CreateRequest dto) {
        
        BookDto.DetailResponse book = bookService.updateBook(bookId, dto);
        return ResponseEntity.ok(ApiResponse.success("도서 수정 성공", book));
    }

    /**
     * 특정 도서 표지 이미지 URL 업데이트
     */
    @PatchMapping("/{bookId}/cover")
    public ResponseEntity<ApiResponse<BookDto.DetailResponse>> updateCoverUrl(
            @PathVariable Long bookId, 
            @Valid @RequestBody BookDto.CoverUrlRequest request) {
        
        BookDto.DetailResponse book = bookService.updateCoverUrl(bookId, request.getCoverImageUrl());
        return ResponseEntity.ok(ApiResponse.success("도서 표지 업데이트 성공", book));
    }

    /**
     * 특정 도서 삭제
     */
    @DeleteMapping("/{bookId}")
    public ResponseEntity<ApiResponse<Void>> deleteBook(@PathVariable Long bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok(ApiResponse.success("도서 삭제 성공", null));
    }
}



