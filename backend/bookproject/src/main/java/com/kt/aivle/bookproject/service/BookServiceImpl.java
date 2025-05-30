package com.kt.aivle.bookproject.service;

import com.kt.aivle.bookproject.domain.Book;
import com.kt.aivle.bookproject.dto.BookRequestDto;
import com.kt.aivle.bookproject.dto.BookResponseDto;
import com.kt.aivle.bookproject.exception.BookNotFoundException;
import com.kt.aivle.bookproject.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true) // 기본적으로 읽기 전용 트랜잭션으로 설정
@RequiredArgsConstructor // 생성자 주입을 위한 Lombok 어노테이션
public class BookServiceImpl implements BookService {

    // BookRepository를 의존성 주입
    private final BookRepository bookRepository;

    /**
     * 검색어를 이용해 책 목록을 조회
     * 검색어가 없으면 전체 목록을 반환
     *
     * @param search 제목 또는 저자에 포함된 검색어
     * @return 도서 응답 DTO 리스트
     */
    @Override
    public List<BookResponseDto> getBooks(String search) {
        List<Book> books = (search == null || search.isBlank())
                ? bookRepository.findAll() // 검색어 없으면 전체 조회
                : bookRepository.findByTitleContainingOrAuthorContaining(search, search); // 검색어로 제목 또는 저자 필터링

        // Book 객체를 BookResponseDto로 변환
        return books.stream()
                .map(BookResponseDto::from)
                .collect(Collectors.toList());
    }

    /**
     * 새 도서를 생성 및저장
     *
     * @param dto 생성할 도서 정보를 담은 요청 DTO
     * @return 생성된 도서의 응답 DTO
     */
    @Override
    @Transactional
    public BookResponseDto createBook(BookRequestDto dto) {
        // 요청 DTO로부터 Book 객체 생성
        Book book = Book.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .author(dto.getAuthor())
                .summary(dto.getSummary())
                .build();

        // 저장 후 DTO로 변환하여 반환
        return BookResponseDto.from(bookRepository.save(book));
    }

    /**
     * 주어진 ID에 해당하는 도서를 조회
     *
     * @param id 도서 ID
     * @return 조회된 도서의 응답 DTO
     */
    @Override
    public BookResponseDto getBook(Long id) {
        // ID로 조회하고 없으면 예외 발생
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
        return BookResponseDto.from(book);
    }

    /**
     * 도서를 삭제
     *
     * @param id 삭제할 도서 ID
     */
    @Override
    @Transactional
    public void deleteBook(Long id) {
        // ID로 도서 삭제
        bookRepository.deleteById(id);
    }

    /**
     * 도서 정보를 수정
     *
     * @param id 수정할 도서의 ID
     * @param dto 수정할 정보가 담긴 요청 DTO
     * @return 수정된 도서의 응답 DTO
     */
    @Override
    @Transactional
    public BookResponseDto updateBook(Long id, BookRequestDto dto) {
        // 수정할 도서 조회
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));

        // 필드 업데이트
        book.setTitle(dto.getTitle());
        book.setContent(dto.getContent());
        book.setAuthor(dto.getAuthor());
        book.setSummary(dto.getSummary());

        // 저장 후 DTO로 반환
        return BookResponseDto.from(bookRepository.save(book));
    }

    /**
     * 도서의 표지 이미지 URL을 수정
     *
     * @param id 도서 ID
     * @param newUrl 새로 설정할 이미지 URL
     * @return 수정된 도서의 응답 DTO
     */
    @Override
    @Transactional
    public BookResponseDto updateCoverUrl(Long id, String newUrl) {
        // 도서 조회
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));

        // 표지 URL 업데이트
        book.setCoverUrl(newUrl);
        return BookResponseDto.from(bookRepository.save(book));
    }
}

