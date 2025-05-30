package com.kt.aivle.bookproject.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kt.aivle.bookproject.domain.Book;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class BookDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequest {
        
        @NotBlank(message = "제목은 필수입니다")
        @Size(max = 255, message = "제목은 최대 255자까지 입력 가능합니다")
        private String title;
        
        @NotBlank(message = "내용은 필수입니다")
        private String content;
        
        @Size(max = 255, message = "작가명은 최대 255자까지 입력 가능합니다")
        private String author;
        
        @Size(max = 1000, message = "요약은 최대 1000자까지 입력 가능합니다")
        private String summary;
        
        public Book toEntity() {
            Book book = new Book();
            book.setTitle(this.title);
            book.setContent(this.content);
            book.setAuthor(this.author);
            book.setSummary(this.summary);
            book.setCoverImageUrl(null); // 등록 시 null로 설정
            return book;
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DetailResponse {
        
        private Long id;
        private String title;
        private String content;
        private String author;
        private String summary;
        private String coverImageUrl;
        
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime createdAt;
        
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime updatedAt;
        
        public static DetailResponse fromEntity(Book book) {
            return DetailResponse.builder()
                    .id(book.getId())
                    .title(book.getTitle())
                    .content(book.getContent())
                    .author(book.getAuthor())
                    .summary(book.getSummary())
                    .coverImageUrl(book.getCoverImageUrl())
                    .createdAt(book.getCreatedAt())
                    .updatedAt(book.getUpdatedAt())
                    .build();
        }
    }

    // 목록 조회용 DTO (간단한 정보만 포함)
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ListResponse {
        
        private Long id;
        private String title;
        private String author;
        private String summary;
        private String coverImageUrl;
        
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime createdAt;
        
        public static ListResponse fromEntity(Book book) {
            return ListResponse.builder()
                    .id(book.getId())
                    .title(book.getTitle())
                    .author(book.getAuthor())
                    .summary(book.getSummary())
                    .coverImageUrl(book.getCoverImageUrl())
                    .createdAt(book.getCreatedAt())
                    .build();
        }
    }

    // 표지 이미지 URL 업데이트용 DTO
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CoverUrlRequest {
        
        @Size(max = 2083, message = "URL은 최대 2083자까지 입력 가능합니다")
        private String coverImageUrl;
    }
} 