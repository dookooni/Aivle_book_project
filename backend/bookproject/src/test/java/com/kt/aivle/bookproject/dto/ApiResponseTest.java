package com.kt.aivle.bookproject.dto;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ApiResponseTest {

    @Test
    @DisplayName("success() - 성공 응답 생성 테스트")
    void createSuccessResponse() {
        // given
        String message = "조회 성공";
        String data = "테스트 데이터";

        // when
        ApiResponse<String> response = ApiResponse.success(message, data);

        // then
        assertThat(response.getStatus()).isEqualTo("success");
        assertThat(response.getMessage()).isEqualTo(message);
        assertThat(response.getData()).isEqualTo(data);
        assertThat(response.getErrorCode()).isNull();
        assertThat(response.getErrors()).isNull();
    }

    @Test
    @DisplayName("success() - null 데이터로 성공 응답 생성 테스트")
    void createSuccessResponseWithNullData() {
        // given
        String message = "처리 완료";

        // when
        ApiResponse<Object> response = ApiResponse.success(message, null);

        // then
        assertThat(response.getStatus()).isEqualTo("success");
        assertThat(response.getMessage()).isEqualTo(message);
        assertThat(response.getData()).isNull();
        assertThat(response.getErrorCode()).isNull();
        assertThat(response.getErrors()).isNull();
    }

    @Test
    @DisplayName("error() - 일반 오류 응답 생성 테스트")
    void createErrorResponse() {
        // given
        String message = "서버 오류가 발생했습니다";
        String errorCode = "INTERNAL_SERVER_ERROR";

        // when
        ApiResponse<Object> response = ApiResponse.error(message, errorCode);

        // then
        assertThat(response.getStatus()).isEqualTo("error");
        assertThat(response.getMessage()).isEqualTo(message);
        assertThat(response.getData()).isNull();
        assertThat(response.getErrorCode()).isEqualTo(errorCode);
        assertThat(response.getErrors()).isNull();
    }

    @Test
    @DisplayName("error() - 유효성 검증 오류 응답 생성 테스트")
    void createValidationErrorResponse() {
        // given
        String message = "입력 값이 유효하지 않습니다";
        String errorCode = "VALIDATION_ERROR";
        List<ErrorDetail> errors = Arrays.asList(
                new ErrorDetail("title", "", "제목은 필수입니다"),
                new ErrorDetail("author", "very long name that exceeds maximum length", "작가명은 최대 255자까지 입력 가능합니다")
        );

        // when
        ApiResponse<Object> response = ApiResponse.error(message, errorCode, errors);

        // then
        assertThat(response.getStatus()).isEqualTo("error");
        assertThat(response.getMessage()).isEqualTo(message);
        assertThat(response.getData()).isNull();
        assertThat(response.getErrorCode()).isEqualTo(errorCode);
        assertThat(response.getErrors()).isNotNull();
        assertThat(response.getErrors()).hasSize(2);
        
        // 첫 번째 오류 상세 확인
        ErrorDetail firstError = response.getErrors().get(0);
        assertThat(firstError.getField()).isEqualTo("title");
        assertThat(firstError.getValue()).isEqualTo("");
        assertThat(firstError.getReason()).isEqualTo("제목은 필수입니다");
        
        // 두 번째 오류 상세 확인
        ErrorDetail secondError = response.getErrors().get(1);
        assertThat(secondError.getField()).isEqualTo("author");
        assertThat(secondError.getValue()).isEqualTo("very long name that exceeds maximum length");
        assertThat(secondError.getReason()).isEqualTo("작가명은 최대 255자까지 입력 가능합니다");
    }

    @Test
    @DisplayName("error() - 빈 오류 리스트로 유효성 검증 오류 응답 생성 테스트")
    void createValidationErrorResponseWithEmptyErrors() {
        // given
        String message = "입력 값이 유효하지 않습니다";
        String errorCode = "VALIDATION_ERROR";
        List<ErrorDetail> errors = Arrays.asList();

        // when
        ApiResponse<Object> response = ApiResponse.error(message, errorCode, errors);

        // then
        assertThat(response.getStatus()).isEqualTo("error");
        assertThat(response.getMessage()).isEqualTo(message);
        assertThat(response.getData()).isNull();
        assertThat(response.getErrorCode()).isEqualTo(errorCode);
        assertThat(response.getErrors()).isNotNull();
        assertThat(response.getErrors()).isEmpty();
    }

    @Test
    @DisplayName("제네릭 타입 테스트 - 다양한 데이터 타입")
    void genericTypeTest() {
        // Integer 타입 테스트
        ApiResponse<Integer> intResponse = ApiResponse.success("숫자 응답", 42);
        assertThat(intResponse.getData()).isEqualTo(42);
        assertThat(intResponse.getData()).isInstanceOf(Integer.class);

        // List 타입 테스트
        List<String> stringList = Arrays.asList("item1", "item2", "item3");
        ApiResponse<List<String>> listResponse = ApiResponse.success("리스트 응답", stringList);
        assertThat(listResponse.getData()).isEqualTo(stringList);
        assertThat(listResponse.getData()).hasSize(3);

        // 커스텀 객체 타입 테스트
        BookDto.CreateRequest request = new BookDto.CreateRequest("제목", "내용", "작가", "요약");
        ApiResponse<BookDto.CreateRequest> objectResponse = ApiResponse.success("객체 응답", request);
        assertThat(objectResponse.getData()).isEqualTo(request);
        assertThat(objectResponse.getData().getTitle()).isEqualTo("제목");
    }
} 