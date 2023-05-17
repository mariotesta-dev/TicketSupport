package it.polito.wa2.server.auth

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class AuthErrorHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(AuthExceptions.InvalidLoginRequestException::class)
    fun handleCustomerNotFound(e: AuthExceptions.InvalidLoginRequestException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, e.message!!)

    @ExceptionHandler(AuthExceptions.InvalidLogoutRequestException::class)
    fun handleCustomerNotFound(e: AuthExceptions.InvalidLogoutRequestException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, e.message!!)
}