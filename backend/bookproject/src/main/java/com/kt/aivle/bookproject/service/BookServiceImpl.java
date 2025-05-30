package com.kt.aivle.bookproject.service;

import com.kt.aivle.bookproject.domain.Book;
import com.kt.aivle.bookproject.dto.BookDto;
import com.kt.aivle.bookproject.exception.ResourceNotFoundException;
import com.kt.aivle.bookproject.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true) // 기본적으로 읽기 전용 트랜잭션으로 설정
@RequiredArgsConstructor // 생성자 주입을 위한 Lombok 어노테이션
public class BookServiceImpl implements BookService {

    // BookRepository를 의존성 주입
    private final BookRepository bookRepository;

    /**
     * 검색어를 이용해 책 목록을 조회 (페이지네이션 지원)
     * 검색어가 없으면 전체 목록을 반환
     *
     * @param search 제목 또는 저자에 포함된 검색어
     * @param pageable 페이지네이션 정보
     * @return 도서 응답 DTO 페이지
     */
    @Override
    public Page<BookDto.ListResponse> getBooks(String search, Pageable pageable) {
        Page<Book> books;
        
        if (search == null || search.trim().isEmpty()) {
            // 검색어가 없으면 전체 목록 조회
            books = bookRepository.findAll(pageable);
        } else {
            // 검색어가 있으면 제목 또는 작가로 검색
            books = bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
                    search.trim(), search.trim(), pageable);
        }
        
        return books.map(BookDto.ListResponse::fromEntity);
    }

    /**
     * 새로운 도서를 생성
     *
     * @param dto 도서 생성 요청 DTO
     * @return 생성된 도서 상세 응답 DTO
     */
    @Override
    @Transactional // 쓰기 작업이므로 트랜잭션 어노테이션 추가
    public BookDto.DetailResponse createBook(BookDto.CreateRequest dto) {
        Book book = dto.toEntity();
        Book savedBook = bookRepository.save(book);
        return BookDto.DetailResponse.fromEntity(savedBook);
    }

    /**
     * 특정 ID의 도서 상세 조회
     *
     * @param id 도서 ID
     * @return 도서 상세 응답 DTO
     */
    @Override
    public BookDto.DetailResponse getBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ID가 " + id + "인 도서를 찾을 수 없습니다."));
        return BookDto.DetailResponse.fromEntity(book);
    }

    /**
     * 특정 ID의 도서 업데이트
     *
     * @param id 도서 ID
     * @param dto 도서 업데이트 요청 DTO
     * @return 업데이트된 도서 상세 응답 DTO
     */
    @Override
    @Transactional // 쓰기 작업이므로 트랜잭션 어노테이션 추가
    public BookDto.DetailResponse updateBook(Long id, BookDto.CreateRequest dto) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ID가 " + id + "인 도서를 찾을 수 없습니다."));
        
        // 도서 정보 업데이트
        book.setTitle(dto.getTitle());
        book.setContent(dto.getContent());
        book.setAuthor(dto.getAuthor());
        book.setSummary(dto.getSummary());
        
        Book updatedBook = bookRepository.save(book);
        return BookDto.DetailResponse.fromEntity(updatedBook);
    }

    /**
     * 특정 ID의 도서 표지 이미지 URL 업데이트
     *
     * @param id 도서 ID
     * @param newUrl 새로운 표지 이미지 URL
     * @return 업데이트된 도서 상세 응답 DTO
     */
    @Override
    @Transactional // 쓰기 작업이므로 트랜잭션 어노테이션 추가
    public BookDto.DetailResponse updateCoverUrl(Long id, String newUrl) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ID가 " + id + "인 도서를 찾을 수 없습니다."));
        
        book.setCoverImageUrl(newUrl);
        Book updatedBook = bookRepository.save(book);
        return BookDto.DetailResponse.fromEntity(updatedBook);
    }

    /**
     * 특정 ID의 도서 삭제
     *
     * @param id 도서 ID
     */
    @Override
    @Transactional // 쓰기 작업이므로 트랜잭션 어노테이션 추가
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ID가 " + id + "인 도서를 찾을 수 없습니다."));
        
        bookRepository.delete(book);
    }
}

