package com.kt.aivle.bookproject.dto;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ErrorDetailTest {

    @Test
    @DisplayName("ErrorDetail 생성 및 필드 확인 테스트")
    void createErrorDetail() {
        // given
        String field = "title";
        Object value = "";
        String reason = "제목은 필수입니다";

        // when
        ErrorDetail errorDetail = new ErrorDetail(field, value, reason);

        // then
        assertThat(errorDetail.getField()).isEqualTo(field);
        assertThat(errorDetail.getValue()).isEqualTo(value);
        assertThat(errorDetail.getReason()).isEqualTo(reason);
    }

    @Test
    @DisplayName("ErrorDetail - null 값 처리 테스트")
    void createErrorDetailWithNullValue() {
        // given
        String field = "author";
        Object value = null;
        String reason = "작가명은 필수입니다";

        // when
        ErrorDetail errorDetail = new ErrorDetail(field, value, reason);

        // then
        assertThat(errorDetail.getField()).isEqualTo(field);
        assertThat(errorDetail.getValue()).isNull();
        assertThat(errorDetail.getReason()).isEqualTo(reason);
    }

    @Test
    @DisplayName("ErrorDetail - 다양한 value 타입 테스트")
    void createErrorDetailWithDifferentValueTypes() {
        // String 타입
        ErrorDetail stringError = new ErrorDetail("title", "very long title", "제목이 너무 깁니다");
        assertThat(stringError.getValue()).isInstanceOf(String.class);
        assertThat(stringError.getValue()).isEqualTo("very long title");

        // Integer 타입
        ErrorDetail intError = new ErrorDetail("age", 150, "나이는 120을 초과할 수 없습니다");
        assertThat(intError.getValue()).isInstanceOf(Integer.class);
        assertThat(intError.getValue()).isEqualTo(150);

        // Boolean 타입
        ErrorDetail boolError = new ErrorDetail("isActive", false, "활성 상태는 true여야 합니다");
        assertThat(boolError.getValue()).isInstanceOf(Boolean.class);
        assertThat(boolError.getValue()).isEqualTo(false);
    }

    @Test
    @DisplayName("ErrorDetail - 빈 문자열 처리 테스트")
    void createErrorDetailWithEmptyString() {
        // given
        String field = "content";
        Object value = "";
        String reason = "내용은 비어있을 수 없습니다";

        // when
        ErrorDetail errorDetail = new ErrorDetail(field, value, reason);

        // then
        assertThat(errorDetail.getField()).isEqualTo(field);
        assertThat(errorDetail.getValue()).isEqualTo("");
        assertThat(errorDetail.getReason()).isEqualTo(reason);
    }

    @Test
    @DisplayName("ErrorDetail - 특수문자 및 긴 텍스트 처리 테스트")
    void createErrorDetailWithSpecialCharacters() {
        // given
        String field = "email";
        Object value = "invalid-email@";
        String reason = "올바른 이메일 형식이 아닙니다. 예: user@example.com";

        // when
        ErrorDetail errorDetail = new ErrorDetail(field, value, reason);

        // then
        assertThat(errorDetail.getField()).isEqualTo(field);
        assertThat(errorDetail.getValue()).isEqualTo(value);
        assertThat(errorDetail.getReason()).isEqualTo(reason);
        assertThat(errorDetail.getReason()).contains("@");
    }
} 