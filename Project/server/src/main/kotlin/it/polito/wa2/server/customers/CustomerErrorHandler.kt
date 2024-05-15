package it.polito.wa2.server.customers

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class CustomerErrorHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(CustomerExceptions.CustomerNotFoundException::class)
    fun handleCustomerNotFound(e: CustomerExceptions.CustomerNotFoundException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)

    @ExceptionHandler(CustomerExceptions.CustomerAlreadyExistsException::class)
    fun handleCustomerAlreadyExists(e: CustomerExceptions.CustomerAlreadyExistsException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.message!!)
}