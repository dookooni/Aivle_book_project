package com.kt.aivle.bookproject.dto;

import com.kt.aivle.bookproject.domain.Book;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class BookDtoTest {

    @Test
    @DisplayName("CreateRequest - AllArgsConstructor 생성자 테스트")
    void createRequestAllArgsConstructor() {
        // given
        String title = "자바 프로그래밍";
        String content = "자바 기초부터 고급까지";
        String author = "김자바";
        String summary = "자바를 배우는 책";

        // when
        BookDto.CreateRequest request = new BookDto.CreateRequest(title, content, author, summary);

        // then
        assertThat(request.getTitle()).isEqualTo(title);
        assertThat(request.getContent()).isEqualTo(content);
        assertThat(request.getAuthor()).isEqualTo(author);
        assertThat(request.getSummary()).isEqualTo(summary);
    }

    @Test
    @DisplayName("CreateRequest - NoArgsConstructor 생성자 테스트")
    void createRequestNoArgsConstructor() {
        // when
        BookDto.CreateRequest request = new BookDto.CreateRequest();

        // then
        assertThat(request).isNotNull();
        assertThat(request.getTitle()).isNull();
        assertThat(request.getContent()).isNull();
        assertThat(request.getAuthor()).isNull();
        assertThat(request.getSummary()).isNull();
    }

    @Test
    @DisplayName("CreateRequest - toEntity() 변환 테스트")
    void createRequestToEntity() {
        // given
        BookDto.CreateRequest request = new BookDto.CreateRequest(
                "자바 프로그래밍",
                "자바 기초부터 고급까지",
                "김자바",
                "자바를 배우는 책"
        );

        // when
        Book book = request.toEntity();

        // then
        assertThat(book.getTitle()).isEqualTo("자바 프로그래밍");
        assertThat(book.getContent()).isEqualTo("자바 기초부터 고급까지");
        assertThat(book.getAuthor()).isEqualTo("김자바");
        assertThat(book.getSummary()).isEqualTo("자바를 배우는 책");
        assertThat(book.getCoverImageUrl()).isNull(); // 등록 시 null로 설정
        assertThat(book.getId()).isNull();
        assertThat(book.getCreatedAt()).isNull();
        assertThat(book.getUpdatedAt()).isNull();
    }

    @Test
    @DisplayName("CreateRequest - toEntity() null 필드 처리 테스트")
    void createRequestToEntityWithNullFields() {
        // given
        BookDto.CreateRequest request = new BookDto.CreateRequest(
                "제목만 있는 책",
                "내용",
                null, // author가 null
                null  // summary가 null
        );

        // when
        Book book = request.toEntity();

        // then
        assertThat(book.getTitle()).isEqualTo("제목만 있는 책");
        assertThat(book.getContent()).isEqualTo("내용");
        assertThat(book.getAuthor()).isNull();
        assertThat(book.getSummary()).isNull();
        assertThat(book.getCoverImageUrl()).isNull();
    }

    @Test
    @DisplayName("DetailResponse - fromEntity() 변환 테스트")
    void detailResponseFromEntity() {
        // given
        Book book = new Book();
        book.setId(1L);
        book.setTitle("자바 프로그래밍");
        book.setContent("자바 기초부터 고급까지");
        book.setAuthor("김자바");
        book.setSummary("자바를 배우는 책");
        book.setCoverImageUrl("http://example.com/cover.jpg");
        
        LocalDateTime now = LocalDateTime.now();
        // Note: 실제로는 JPA가 자동으로 설정하지만, 테스트를 위해 수동 설정
        // book.setCreatedAt(now);
        // book.setUpdatedAt(now);

        // when
        BookDto.DetailResponse response = BookDto.DetailResponse.fromEntity(book);

        // then
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getTitle()).isEqualTo("자바 프로그래밍");
        assertThat(response.getContent()).isEqualTo("자바 기초부터 고급까지");
        assertThat(response.getAuthor()).isEqualTo("김자바");
        assertThat(response.getSummary()).isEqualTo("자바를 배우는 책");
        assertThat(response.getCoverImageUrl()).isEqualTo("http://example.com/cover.jpg");
        // assertThat(response.getCreatedAt()).isEqualTo(now);
        // assertThat(response.getUpdatedAt()).isEqualTo(now);
    }

    @Test
    @DisplayName("DetailResponse - Builder 패턴 테스트")
    void detailResponseBuilder() {
        // given
        LocalDateTime now = LocalDateTime.now();

        // when
        BookDto.DetailResponse response = BookDto.DetailResponse.builder()
                .id(1L)
                .title("자바 프로그래밍")
                .content("자바 기초부터 고급까지")
                .author("김자바")
                .summary("자바를 배우는 책")
                .coverImageUrl("http://example.com/cover.jpg")
                .createdAt(now)
                .updatedAt(now)
                .build();

        // then
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getTitle()).isEqualTo("자바 프로그래밍");
        assertThat(response.getContent()).isEqualTo("자바 기초부터 고급까지");
        assertThat(response.getAuthor()).isEqualTo("김자바");
        assertThat(response.getSummary()).isEqualTo("자바를 배우는 책");
        assertThat(response.getCoverImageUrl()).isEqualTo("http://example.com/cover.jpg");
        assertThat(response.getCreatedAt()).isEqualTo(now);
        assertThat(response.getUpdatedAt()).isEqualTo(now);
    }
} 