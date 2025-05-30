package com.kt.aivle.bookproject.controller;

import com.kt.aivle.bookproject.dto.BookRequestDto;
import com.kt.aivle.bookproject.dto.BookResponseDto;
import com.kt.aivle.bookproject.service.BookService;
import com.kt.aivle.bookproject.controller.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BookResponseDto>>> getBooks(@RequestParam(required = false) String search) {
        return ResponseEntity.ok(ApiResponse.success(bookService.getBooks(search)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BookResponseDto>> createBook(@Valid @RequestBody BookRequestDto requestDto) {
        return ResponseEntity.ok(ApiResponse.success(bookService.createBook(requestDto)));
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<ApiResponse<BookResponseDto>> getBook(@PathVariable Long bookId) {
        return ResponseEntity.ok(ApiResponse.success(bookService.getBook(bookId)));
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<ApiResponse<Void>> deleteBook(@PathVariable Long bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<ApiResponse<BookResponseDto>> updateBook(@PathVariable Long bookId, @Valid @RequestBody BookRequestDto dto) {
        return ResponseEntity.ok(ApiResponse.success(bookService.updateBook(bookId, dto)));
    }

    @PutMapping("/{bookId}/cover-url")
    public ResponseEntity<ApiResponse<BookResponseDto>> updateCoverUrl(@PathVariable Long bookId, @RequestBody CoverUrlRequest request) {
        return ResponseEntity.ok(ApiResponse.success(bookService.updateCoverUrl(bookId, request.getCoverImageUrl())));
    }

    // 내부 클래스로 커버 이미지 요청 DTO 정의
    public static class CoverUrlRequest {
        @jakarta.validation.constraints.NotBlank
        private String coverImageUrl;

        public String getCoverImageUrl() {
            return coverImageUrl;
        }

        public void setCoverImageUrl(String coverImageUrl) {
            this.coverImageUrl = coverImageUrl;
        }
    }
}



