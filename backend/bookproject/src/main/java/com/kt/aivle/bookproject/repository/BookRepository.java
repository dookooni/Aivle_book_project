package com.kt.aivle.bookproject.repository;

import com.kt.aivle.bookproject.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    
    // 제목과 작가 동시 검색 (대소문자 무시)
    Page<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
            String title, String author, Pageable pageable);
    
    // 제목으로만 검색 (대소문자 무시)
    Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    
    // 작가로만 검색 (대소문자 무시)
    Page<Book> findByAuthorContainingIgnoreCase(String author, Pageable pageable);
} 