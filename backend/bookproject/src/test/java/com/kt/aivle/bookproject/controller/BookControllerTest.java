package com.kt.aivle.Bookproject.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kt.aivle.Bookproject.domain.Book;
import com.kt.aivle.Bookproject.dto.BookDto;
import com.kt.aivle.Bookproject.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private BookRepository bookRepository;

    private Long savedBookId;

    @BeforeEach
    void setup() {
        bookRepository.deleteAll();
        Book book = Book.builder()
                .title("테스트 책")
                .author("저자")
                .content("내용")
                .summary("요약")
                .coverImageUrl("http://cover.com")
                .build();
        savedBookId = bookRepository.save(book).getId();
        System.out.println("[SETUP] 저장된 ID: " + savedBookId);
        System.out.println("[SETUP] 존재 여부: " + bookRepository.findById(savedBookId).isPresent());
    }

    @Test
    void getBook_success() throws Exception {
        mockMvc.perform(get("/api/books/" + savedBookId))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data.title").value("테스트 책"));
    }

    @Test
    void createBook_success() throws Exception {
        BookDto.CreateRequest request = BookDto.CreateRequest.builder()
                .title("새 책")
                .content("본문")
                .author("작가")
                .summary("줄거리")
                .build();

        mockMvc.perform(post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data.title").value("새 책"));
    }

    @Test
    void createBook_validationFail() throws Exception {
        BookDto.CreateRequest request = BookDto.CreateRequest.builder()
                .title("")
                .content("")
                .build();

        mockMvc.perform(post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.errorCode").value("VALIDATION_ERROR"));
    }

    @Test
    void deleteBook_success() throws Exception {
        mockMvc.perform(delete("/api/books/" + savedBookId))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"));
    }

    @Test
    void updateBook_success() throws Exception {
        BookDto.DetailResponse request = BookDto.DetailResponse.builder()
                .id(savedBookId)
                .title("수정된 책")
                .content("새 내용")
                .author("새 저자")
                .summary("새 요약")
                .coverImageUrl("http://newcover.com")
                .build();

        mockMvc.perform(put("/api/books/" + savedBookId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data.title").value("수정된 책"));
    }

    @Test
    void updateCoverUrl_success() throws Exception {
        String json = "{\"coverImageUrl\": \"http://updated-cover.com\"}";

        mockMvc.perform(put("/api/books/" + savedBookId + "/cover-url")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data.coverImageUrl").value("http://updated-cover.com"));
    }
}

