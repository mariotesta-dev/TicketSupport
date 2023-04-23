package it.polito.wa2.server.warranties

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class WarrantyErrorHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler(WarrantyExceptions.WarrantyNotFoundException::class)
    fun handleProductNotFound(e: WarrantyExceptions.WarrantyNotFoundException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)
}
