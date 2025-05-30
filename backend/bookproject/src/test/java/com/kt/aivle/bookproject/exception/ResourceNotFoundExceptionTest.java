package com.kt.aivle.bookproject.exception;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ResourceNotFoundExceptionTest {

    @Test
    @DisplayName("ResourceNotFoundException 생성 및 메시지 확인 테스트")
    void createResourceNotFoundException() {
        // given
        String message = "ID가 1인 도서를 찾을 수 없습니다";

        // when
        ResourceNotFoundException exception = new ResourceNotFoundException(message);

        // then
        assertThat(exception.getMessage()).isEqualTo(message);
        assertThat(exception).isInstanceOf(RuntimeException.class);
    }

    @Test
    @DisplayName("ResourceNotFoundException 던지기 테스트")
    void throwResourceNotFoundException() {
        // given
        String message = "요청된 리소스를 찾을 수 없습니다";

        // when & then
        assertThatThrownBy(() -> {
            throw new ResourceNotFoundException(message);
        })
        .isInstanceOf(ResourceNotFoundException.class)
        .hasMessage(message);
    }

    @Test
    @DisplayName("ResourceNotFoundException - null 메시지 처리 테스트")
    void createResourceNotFoundExceptionWithNullMessage() {
        // when
        ResourceNotFoundException exception = new ResourceNotFoundException(null);

        // then
        assertThat(exception.getMessage()).isNull();
    }

    @Test
    @DisplayName("ResourceNotFoundException - 빈 메시지 처리 테스트")
    void createResourceNotFoundExceptionWithEmptyMessage() {
        // given
        String message = "";

        // when
        ResourceNotFoundException exception = new ResourceNotFoundException(message);

        // then
        assertThat(exception.getMessage()).isEqualTo("");
        assertThat(exception.getMessage()).isEmpty();
    }

    @Test
    @DisplayName("ResourceNotFoundException - 다양한 메시지 패턴 테스트")
    void createResourceNotFoundExceptionWithVariousMessages() {
        // 도서 관련 메시지
        ResourceNotFoundException bookException = new ResourceNotFoundException("도서 ID 123을 찾을 수 없습니다");
        assertThat(bookException.getMessage()).contains("도서");
        assertThat(bookException.getMessage()).contains("123");

        // 일반적인 메시지
        ResourceNotFoundException generalException = new ResourceNotFoundException("Resource not found");
        assertThat(generalException.getMessage()).isEqualTo("Resource not found");

        // 긴 메시지
        String longMessage = "매우 긴 오류 메시지입니다. 이 메시지는 상세한 정보를 포함하고 있으며, " +
                "사용자에게 무엇이 잘못되었는지 정확히 알려주기 위한 목적으로 작성되었습니다.";
        ResourceNotFoundException longException = new ResourceNotFoundException(longMessage);
        assertThat(longException.getMessage()).isEqualTo(longMessage);
        assertThat(longException.getMessage().length()).isGreaterThan(50);
    }

    @Test
    @DisplayName("ResourceNotFoundException - RuntimeException 상속 확인")
    void verifyInheritance() {
        // given
        ResourceNotFoundException exception = new ResourceNotFoundException("테스트 메시지");

        // then
        assertThat(exception).isInstanceOf(RuntimeException.class);
        assertThat(exception).isInstanceOf(Exception.class);
        assertThat(exception).isInstanceOf(Throwable.class);
        
        // Unchecked Exception인지 확인 (컴파일 시점에 예외 처리 강제하지 않음)
        assertThat(RuntimeException.class.isAssignableFrom(ResourceNotFoundException.class)).isTrue();
    }
} 