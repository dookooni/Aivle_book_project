package com.kt.aivle.bookproject.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 공통 API 응답 포맷
 */
@Getter
@AllArgsConstructor
public class ApiResponse<T> {
    private final boolean success;
    private final String message;
    private final T data;

    /**
     * 성공 응답 생성
     */
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "요청에 성공했습니다.", data);
    }

    /**
     * 사용자 지정 메시지 포함 성공 응답
     */
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    /**
     * 실패 응답 생성
     */
    public static <T> ApiResponse<T> fail(String message) {
        return new ApiResponse<>(false, message, null);
    }
}
