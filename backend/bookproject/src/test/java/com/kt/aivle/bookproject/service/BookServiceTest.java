package com.kt.aivle.bookproject.service;

import com.kt.aivle.bookproject.domain.Book;
import com.kt.aivle.bookproject.dto.BookResponseDto;
import com.kt.aivle.bookproject.exception.BookNotFoundException;
import com.kt.aivle.bookproject.repository.BookRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BookServiceTest {

    @InjectMocks
    BookServiceImpl bookService;

    @Mock
    private BookRepository bookRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void 책_단건_조회_성공() {
        // given
        Book book = Book.builder()
                .bookId(1L)
                .title("테스트 도서")
                .author("작가")
                .summary("요약")
                .content("내용")
                .coverUrl("https://example.com")
                .build();

        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        // when
        BookResponseDto result = bookService.getBook(1L);

        // then
        assertThat(result.getTitle()).isEqualTo("테스트 도서");
        verify(bookRepository).findById(1L);
    }

    @Test
    void 책_단건_조회_실패_예외_발생() {
        // given
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> bookService.getBook(99L))
                .isInstanceOf(BookNotFoundException.class)
                .hasMessageContaining("99");
    }
}

