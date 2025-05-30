package com.kt.aivle.bookproject.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class BookTest {

    @Test
    @DisplayName("Book 엔티티 생성 및 필드 설정 테스트")
    void createBook() {
        // given
        String title = "자바 프로그래밍";
        String content = "자바 기초부터 고급까지";
        String author = "김자바";
        String summary = "자바를 배우는 책";
        String coverImageUrl = "http://example.com/cover.jpg";

        // when
        Book book = new Book();
        book.setTitle(title);
        book.setContent(content);
        book.setAuthor(author);
        book.setSummary(summary);
        book.setCoverImageUrl(coverImageUrl);

        // then
        assertThat(book.getTitle()).isEqualTo(title);
        assertThat(book.getContent()).isEqualTo(content);
        assertThat(book.getAuthor()).isEqualTo(author);
        assertThat(book.getSummary()).isEqualTo(summary);
        assertThat(book.getCoverImageUrl()).isEqualTo(coverImageUrl);
        assertThat(book.getId()).isNull(); // ID는 아직 설정되지 않음
        assertThat(book.getCreatedAt()).isNull(); // 생성 시간은 JPA에서 자동 설정
        assertThat(book.getUpdatedAt()).isNull(); // 수정 시간은 JPA에서 자동 설정
    }

    @Test
    @DisplayName("Book 엔티티 기본 생성자 테스트")
    void createBookWithNoArgsConstructor() {
        // when
        Book book = new Book();

        // then
        assertThat(book).isNotNull();
        assertThat(book.getId()).isNull();
        assertThat(book.getTitle()).isNull();
        assertThat(book.getContent()).isNull();
        assertThat(book.getAuthor()).isNull();
        assertThat(book.getSummary()).isNull();
        assertThat(book.getCoverImageUrl()).isNull();
    }
} 