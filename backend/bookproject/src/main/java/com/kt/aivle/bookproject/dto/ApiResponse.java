package com.kt.aivle.bookproject.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private String status;
    private String message;
    private T data;
    private String errorCode;
    private List<ErrorDetail> errors;

    private ApiResponse(String status, String message, T data, String errorCode, List<ErrorDetail> errors) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.errorCode = errorCode;
        this.errors = errors;
    }

    // 성공 응답 생성
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>("success", message, data, null, null);
    }

    // 일반 오류 응답 생성
    public static <T> ApiResponse<T> error(String message, String errorCode) {
        return new ApiResponse<>("error", message, null, errorCode, null);
    }

    // 유효성 검증 오류 응답 생성
    public static <T> ApiResponse<T> error(String message, String errorCode, List<ErrorDetail> errors) {
        return new ApiResponse<>("error", message, null, errorCode, errors);
    }
} 