package com.kt.aivle.bookproject.service;

import com.kt.aivle.bookproject.domain.Book;
import com.kt.aivle.bookproject.dto.BookDto;
import com.kt.aivle.bookproject.exception.ResourceNotFoundException;
import com.kt.aivle.bookproject.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class BookServiceTest {

    @InjectMocks
    private BookServiceImpl bookService;

    @Mock
    private BookRepository bookRepository;

    private Book testBook;
    private BookDto.CreateRequest createRequest;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testBook = new Book();
        testBook.setId(1L);
        testBook.setTitle("테스트 도서");
        testBook.setAuthor("테스트 작가");
        testBook.setSummary("테스트 요약");
        testBook.setContent("테스트 내용");
        testBook.setCoverImageUrl("https://example.com/cover.jpg");
        testBook.setCreatedAt(LocalDateTime.now());
        testBook.setUpdatedAt(LocalDateTime.now());

        createRequest = new BookDto.CreateRequest(
                "새 도서", "새 내용", "새 작가", "새 요약");
        
        pageable = PageRequest.of(0, 10, Sort.by("createdAt").descending());
    }

    @Test
    @DisplayName("도서 목록 조회 - 검색어 없이 전체 조회")
    void getBooks_without_search() {
        // given
        List<Book> books = Arrays.asList(testBook);
        Page<Book> bookPage = new PageImpl<>(books, pageable, 1);
        
        when(bookRepository.findAll(pageable)).thenReturn(bookPage);

        // when
        Page<BookDto.ListResponse> result = bookService.getBooks(null, pageable);

        // then
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getTitle()).isEqualTo("테스트 도서");
        verify(bookRepository).findAll(pageable);
    }

    @Test
    @DisplayName("도서 목록 조회 - 검색어로 조회")
    void getBooks_with_search() {
        // given
        String search = "테스트";
        List<Book> books = Arrays.asList(testBook);
        Page<Book> bookPage = new PageImpl<>(books, pageable, 1);
        
        when(bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
                search, search, pageable)).thenReturn(bookPage);

        // when
        Page<BookDto.ListResponse> result = bookService.getBooks(search, pageable);

        // then
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getTitle()).isEqualTo("테스트 도서");
        verify(bookRepository).findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
                search, search, pageable);
    }

    @Test
    @DisplayName("도서 생성 성공")
    void createBook_success() {
        // given
        Book savedBook = createRequest.toEntity();
        savedBook.setId(1L);
        savedBook.setCreatedAt(LocalDateTime.now());
        savedBook.setUpdatedAt(LocalDateTime.now());
        
        when(bookRepository.save(any(Book.class))).thenReturn(savedBook);

        // when
        BookDto.DetailResponse result = bookService.createBook(createRequest);

        // then
        assertThat(result.getTitle()).isEqualTo("새 도서");
        assertThat(result.getAuthor()).isEqualTo("새 작가");
        assertThat(result.getId()).isEqualTo(1L);
        verify(bookRepository).save(any(Book.class));
    }

    @Test
    @DisplayName("도서 단건 조회 성공")
    void getBook_success() {
        // given
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));

        // when
        BookDto.DetailResponse result = bookService.getBook(1L);

        // then
        assertThat(result.getTitle()).isEqualTo("테스트 도서");
        assertThat(result.getAuthor()).isEqualTo("테스트 작가");
        assertThat(result.getId()).isEqualTo(1L);
        verify(bookRepository).findById(1L);
    }

    @Test
    @DisplayName("도서 단건 조회 실패 - 존재하지 않는 ID")
    void getBook_not_found() {
        // given
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> bookService.getBook(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("ID가 99인 도서를 찾을 수 없습니다");
        
        verify(bookRepository).findById(99L);
    }

    @Test
    @DisplayName("도서 수정 성공")
    void updateBook_success() {
        // given
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));
        when(bookRepository.save(any(Book.class))).thenReturn(testBook);

        // when
        BookDto.DetailResponse result = bookService.updateBook(1L, createRequest);

        // then
        assertThat(result.getTitle()).isEqualTo("새 도서");
        verify(bookRepository).findById(1L);
        verify(bookRepository).save(any(Book.class));
    }

    @Test
    @DisplayName("도서 수정 실패 - 존재하지 않는 ID")
    void updateBook_not_found() {
        // given
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> bookService.updateBook(99L, createRequest))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("ID가 99인 도서를 찾을 수 없습니다");
        
        verify(bookRepository).findById(99L);
        verify(bookRepository, never()).save(any(Book.class));
    }

    @Test
    @DisplayName("도서 표지 URL 업데이트 성공")
    void updateCoverUrl_success() {
        // given
        String newUrl = "https://example.com/new-cover.jpg";
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));
        when(bookRepository.save(any(Book.class))).thenReturn(testBook);

        // when
        BookDto.DetailResponse result = bookService.updateCoverUrl(1L, newUrl);

        // then
        assertThat(result.getCoverImageUrl()).isEqualTo(newUrl);
        verify(bookRepository).findById(1L);
        verify(bookRepository).save(any(Book.class));
    }

    @Test
    @DisplayName("도서 삭제 성공")
    void deleteBook_success() {
        // given
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));

        // when
        bookService.deleteBook(1L);

        // then
        verify(bookRepository).findById(1L);
        verify(bookRepository).delete(testBook);
    }

    @Test
    @DisplayName("도서 삭제 실패 - 존재하지 않는 ID")
    void deleteBook_not_found() {
        // given
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> bookService.deleteBook(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("ID가 99인 도서를 찾을 수 없습니다");
        
        verify(bookRepository).findById(99L);
        verify(bookRepository, never()).delete(any(Book.class));
    }
}

