package it.polito.wa2.server.warranties

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class WarrantyErrorHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler(WarrantyExceptions.WarrantyNotFoundException::class)
    fun handleWarrantyNotFound(e: WarrantyExceptions.WarrantyNotFoundException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)

    @ExceptionHandler(WarrantyExceptions.WarrantyInvalid::class)
    fun handleInvalidWarranty(e: WarrantyExceptions.WarrantyInvalid) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_ACCEPTABLE, e.message!!)
}
