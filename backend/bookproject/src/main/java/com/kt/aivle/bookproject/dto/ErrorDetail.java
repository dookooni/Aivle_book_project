package com.kt.aivle.bookproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorDetail {
    private String field;
    private Object value;
    private String reason;
} 